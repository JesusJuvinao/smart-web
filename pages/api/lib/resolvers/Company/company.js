'use strict'
import CompanySchema from '../../../models/Companies/CompanySchema'
import UserSchema from '../../../models/users/userLogin'
import TemplateInvitation from '../../templates/index'
import TemplateAlert from '../../templates/Alert'
import { ApolloError } from 'apollo-server-errors'
// import bcrypt from 'bcryptjs'
import bcryptjs from 'bcryptjs'
import { createOneBucket, generateCode, generateToken, transporter } from '../../../utils'
import { removeBucketMinio } from '../admin/rolesadmin'
import { TemplateLeaveComp } from '../../templates/TemplateConfirm'

export const getCompanies = async (_root, _, ctx) => {
    try {
        const id = ctx.User.id
        // const user = await UserSchema.findById({ _id: id })
        // const data = await CompanySchema.find({ _id: { $in: user.idUser } })
        const data = await CompanySchema.aggregate([
            {
                $march: { _id: id }
            },
            {
                $lookup: {
                    from: 'User',
                    foreignField: 'idTeamComp',
                    localField: '_id',
                    as: 'alias_tablaB'
                }
            }
        ])
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const deleteCompany = async (_, { id, companyName }, ctx) => {
    const idUser = ctx.User.id
    try {
        await CompanySchema.deleteOne({ _id: id, idUser })
        await removeBucketMinio(id)
        await UserSchema.update({ _id: idUser }, { $pull: { idComp: { $in: [id] } } })
        await UserSchema.update({ _id: idUser }, { $pull: { idTeamComp: { $in: [id] } } })
        return {
            success: true,
            message: `${ companyName } Successfully removed`
        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }// Delete One
}
export const newCompany = async (_, { input }, ctx) => {
    const userId = ctx.User.id
    const idUser = await UserSchema.findById({ _id: userId })
    if (!idUser) { throw new ApolloError('Your request could not be processed.', 500) }
    try {
        const company = new CompanySchema({ ...input, idUser })
        const idCom = company._id
        await company.save(company)
        const data = await UserSchema.findOneAndUpdate(
            { _id: idUser },
            { $push: { idComp: idCom } }
        )
        if (company) {
            const BucketName = idCom.toString()
            await createOneBucket(BucketName)
        }
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const ActiveCompany = async (_, { idComp }) => {
    try {
        const existingCompany = await CompanySchema.findOne({ _id: idComp })
        if (!existingCompany) {
            return { success: false, message: 'The company no exist' }
        }
        await CompanySchema.findOneAndUpdate(
            { _id: idComp },
            {
                $set: {
                    cState: existingCompany.cState !== true
                }
            }
        )
        return { success: true, message: `the company changed to ${ existingCompany.cState === true ? 'inactive' : 'Active' } status` }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getAllCompanyById = async (_, args, ctx) => {
    const { search } = args
    // let whereSearch = {}
    // if (search) {
    //   whereSearch = {
    //     companyName: search.map(x => x)
    //   }
    // }
    try {
        const idUser = ctx.User.id
        const data = await CompanySchema.find({ idUser, companyName: { $regex: search, $options: 'i' } }).populate({
            path: 'LineItemsTeam',
            select: 'idUser',
            model: 'User'
        }).exec()
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getAllCompanyUser = async (_, __, ctx) => {
    try {
        const idUser = ctx.User.id
        const data = await CompanySchema.find({ idUser }).populate({
            path: 'LineItemsTeam',
            select: 'idUser',
            model: 'User'
        }).exec()
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const getOneCompanyById = async (_, { idC }) => {
    try {
        const data = await CompanySchema.findById({ _id: idC })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const ConfirmTeamCompany = async (_, { idComp, uEmail, uPassword, uNewPassword }) => {
    const existEmail = await UserSchema.findOne({ uEmail })
    const res = await UserSchema.find({ idTeamComp: idComp })
    if (!res) return { success: false, message: 'Email is not registered' }
    if (!existEmail) return { success: false, message: 'Email is not registered' }
    try {
        const newPass = await bcryptjs.hashSync(uNewPassword, 10)
        if (existEmail.uToken === uPassword) {
            const id = existEmail._id
            // Update password and clear token
            const data = await UserSchema.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        uToken: '',
                        uPassword: newPass
                    }
                }
            )
            if (data) {
                await CompanySchema.findOneAndUpdate(
                    { 'lineItemsTeam.uEmail': uEmail, },
                    {
                        $set: { 'lineItemsTeam.$.status': true }
                    })
                return { success: true, message: 'successfully' }
            }
        } else {
            return { success: false, message: 'The link has already been used' }
        }
    } catch (error) {
        return error
    }
}
export const RegisterOneTeam = async (_, { idC, uEmail, companyName, lineItemTeamComp, uEmailMaster }, ctx) => {
    try {
        if (!ctx.User.id) { throw new ApolloError('Error, Your session has expired, please log in again.', 500) }
        const id = ctx.User.id
        const { setDataTeam } = lineItemTeamComp || []
        let uToken
        const existEmailTeam = await CompanySchema.find({ 'lineItemsTeam.uEmail': uEmail })
        const existEmail = await UserSchema.findOne({ uEmail })
        const data = await CompanySchema.find({ _id: idC, idUser: id })
        if (!data.length) {
            return {
                success: false,
                message: 'The company dont exist'
            }
        }
        // sed notification
        if (!existEmail) {
            const pass = await generateCode()
            const salt = await bcryptjs.genSaltSync(10)
            // Create new user
            uToken = await generateCode()
            const userRegister = new UserSchema({
                userName: uEmail,
                uEmail,
                uToken,
                idTeamComp: idC,
                uPassword: await bcryptjs.hash(`${ pass }`, salt)
            })
            const dataToken = {
                _id: userRegister._id,
                idComp: idC,
                code: uToken,
                uEmail,
                userName: uEmail
            }
            userRegister.save(userRegister)
            const mailer = transporter()
            const token = await generateToken(dataToken, '1d')
            mailer.sendMail({
                from: 'company invitation <no-reply@smartaccountingonline.com/>',
                to: uEmail,
                text: 'Hello world?',
                subject: 'Invitation.',
                html: TemplateAlert({
                    code: token,
                    company: companyName,
                    username: uEmail
                })
            })
            mailer.sendMail({
                from: 'company invitation <no-reply@smartaccountingonline.com/>',
                to: uEmailMaster,
                text: 'Hello world?',
                subject: 'Alert.',
                html: TemplateInvitation({
                    code: token,
                    company: companyName,
                    username: uEmail
                })
            })
            for (let i = 0; i < setDataTeam.length; i++) {
                const { description, authorization, idUser, status, Username, dateAdded } = setDataTeam[i]
                await CompanySchema.findOneAndUpdate(
                    { _id: idC },
                    {
                        $addToSet: {
                            lineItemsTeam: {
                                $each: [{ description, authorization, idUser, uEmail, status, Username, dateAdded }]
                            }
                        }
                    }
                ).then(res => {
                    if (res) { return { success: true } }
                }).catch(err => {
                    return err
                })
            }
            return { success: true, message: `We've sent an invitation email to ${ uEmail } to add your new team member to the following company: ${ companyName }` }
        } else if (existEmail && !existEmailTeam) {
            for (let i = 0; i < setDataTeam.length; i++) {
                const { description, authorization, idUser, status, Username, dateAdded } = setDataTeam[i]
                await CompanySchema.findOneAndUpdate(
                    { _id: idC },
                    {
                        $addToSet: {
                            lineItemsTeam: {
                                $each: [{ description, authorization, idUser, uEmail, status, Username, dateAdded }]
                            }
                        }
                    }
                ).then(res => {
                    if (res) { return { success: true } }
                }).catch(err => {
                    return err
                })
            }
            const dataToken = {
                idComp: idC,
                code: uToken,
                uEmail,
                userName: uEmail
            }
            const mailer = transporter()
            const token = await generateToken(dataToken, '1d')
            mailer.sendMail({
                from: 'company invitation <no-reply@smartaccountingonline.com/>',
                to: uEmail,
                text: 'Hello world?',
                subject: 'Invitation.',
                html: TemplateAlert({
                    code: token,
                    company: companyName,
                    username: uEmail
                })
            })
            mailer.sendMail({
                from: 'company invitation <no-reply@smartaccountingonline.com/>',
                to: uEmailMaster,
                text: 'Hello world?',
                subject: 'Alert.',
                html: TemplateInvitation({
                    code: token,
                    company: companyName,
                    username: uEmail
                })
            })
            return { success: true, message: `We've sent an invitation email to ${ uEmail } to add your new team member to the following company: ${ companyName }` }
        } else {
            return { success: true, message: ` The email ${ uEmail } is already registered in the company ${ companyName }` }
        }
    // sed notification
    } catch (error) {
        return error
    }
}

export const getAllTeamCompany = async (_, args, ctx) => {
    const { search } = args
    try {
        const Array = await UserSchema.findOne({ _id: ctx.User.id })
        const data = await CompanySchema.find({ '_id': { $in: Array.idTeamComp }, companyName: { $regex: search, $options: 'i' } });
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const LeaveCompany = async (_, args, ctx) => {
    try {
        const { idTeamComp } = args
        const mailer = transporter()
        const idUser = ctx.User.id
        const User = await UserSchema.findOne({ _id: idUser })
        const confirmExistsAccess = await CompanySchema.findOne({ '_id': { $in: User.idTeamComp } });
        const confirmExistCompany = await CompanySchema.findOne({ _id: idTeamComp });
        if (!confirmExistsAccess || !confirmExistCompany) {
            return { success: false, message: 'You do not have access to the company or the company does not exist' }
        }
        const UserMasterCompany = await UserSchema.findOne({ _id: confirmExistsAccess.idUser })
        const MyTeamComp = await UserSchema.update({ _id: idUser }, { $pull: { idTeamComp: { $in: [idTeamComp] } } })
        if (MyTeamComp && UserMasterCompany) {
            mailer.sendMail({
                from: 'confirm Remove <no-reply@smartaccountingonline.com/>',
                to: UserMasterCompany.uEmail,
                subject: `The user ${ User.uEmail } ' Leave company ${ confirmExistCompany.companyName }.'`,
                html: TemplateLeaveComp({
                    company: confirmExistCompany.companyName,
                    username: UserMasterCompany.uEmail
                })
            })
            mailer.sendMail({
                from: 'confirm Remove <no-reply@smartaccountingonline.com/>',
                to: User.uEmail,
                subject: 'Leave company.',
                html: TemplateLeaveComp({
                    company: confirmExistCompany.companyName,
                    username: User.uEmail
                })
            })
            return { success: true, message: `The company  ${ confirmExistCompany.companyName } has been eliminated at yours team companies.` }

        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export default {
    TYPES: {},
    QUERIES: {
        getCompanies,
        getAllCompanyById,
        getAllCompanyUser,
        getAllTeamCompany,
        getOneCompanyById
    },
    MUTATIONS: {
        deleteCompany,
        LeaveCompany,
        newCompany,
        ActiveCompany,
        ConfirmTeamCompany,
        RegisterOneTeam
    }
}
