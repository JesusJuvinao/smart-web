import bcrypt from 'bcryptjs'
import UserSchema from '../../../models/users/userLogin'
// import User from '../../../models/user'
// import CompanySchema from '../../../models/Companies/CompanySchema'
import Roles from '../../../models/admin/admin'

import RecoverAccountTemplate from '../../templates/Recover'
import BillSchema from '../../../models/Bills/BillSchema'
import { generateCode, generateToken, transporter } from '../../../utils'
import { nanoid } from 'nanoid'
import CompanySchema from '../../../models/Companies/CompanySchema'
import { client } from '../../../presignedUrl'
import { TemplateConfirm } from '../../templates/TemplateConfirm'
const { ApolloError } = require('apollo-server-errors')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const REFRESH_TOKEN_COOKIE_OPTIONS = {
    // Get part after // and before : (in case port number in URL)
    domain: process.env.BASE_URL.split('//')[1].split(':')[0],
    httpOnly: true,
    path: '/',
    sameSite: true,
    secure: !!process.env.BASE_URL.includes('https')
}
// Mutation
export const verifyRegistration = async (_, { uEmail, userName }) => {
    const existEmail = await UserSchema.findOne({ uEmail })
    if (existEmail) {
        return {
            success: false,
            message: `The uEmail '${ uEmail }' is already registered.`
        }
    }
    // we check if the user exists
    const UserName = await UserSchema.findOne({ userName })
    if (UserName) {
        return {
            success: false,
            message: `The user '${ userName }' is already registered.`
        }
    }
}
export const newRegisterUser = async (_, { uEmail, userName, uPassword }) => {
    const existEmail = await UserSchema.findOne({ uEmail })
    if (existEmail) {
        return {
            success: false,
            message: `The uEmail '${ uEmail }' is already registered.`
        }
    }
    // we check if the user exists
    const UserName = await UserSchema.findOne({ userName })
    if (UserName) {
        return {
            success: false,
            message: `The user '${ userName }' is already registered.`
        }
    }
    try {
    // we check if the Email exists
    // check for an existing admin user
        const userMaster = await UserSchema.findOne({ uEmail: 'swilson@gmail.com' })
        // get roles _id
        const roles = await Roles.find({
            name: { $in: ['admin', 'moderator', 'user'] }
        })
        const refreshToken = nanoid()
        const refreshTokenExpiry = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000)
        const refreshTokenSalt = await bcryptjs.genSalt(10)
        const refreshTokenHash = await bcryptjs.hash(refreshToken, refreshTokenSalt)
        if (!userMaster) {
            // create a new admin user
            await UserSchema.create({
                userName: 'Stuart',
                uEmail: 'swilson2006@gmail.com',
                uPassword: await bcryptjs.hash('Admin123', 10),
                roles: roles.map(role => role._id),
                refreshTokens: [{ hash: refreshTokenHash, expiry: refreshTokenExpiry }]
            })
        }

        //  we check the uPassword
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(uPassword, passwordSalt)
        if (!existEmail) {
            const newUserRegister = await UserSchema.create({
                userName,
                uEmail,
                userConfirmEmail: 0,
                uPassword: passwordHash,
                refreshTokens: [{ hash: refreshTokenHash, expiry: refreshTokenExpiry }]
            })
            const dataUser = {
                id: newUserRegister.id,
                firstName: newUserRegister.firstName,
                lastName: newUserRegister.lastName,
                userName: newUserRegister.userName,
                uEmail: newUserRegister.uEmail,
                uAddress: newUserRegister.uAddress,
                uBirthday: newUserRegister.uBirthday,
                roles: newUserRegister.roles,
                companiesOwn: newUserRegister.idComp,
                companiesMemberOf: newUserRegister.idTeamComp,
                refreshToken
            }
            const token = await generateToken(dataUser)
            return {
                success: true,
                token,
                refreshToken,
                userId: newUserRegister._id,
                message: 'Session created.',
                roles: newUserRegister.roles
            }
        }
    } catch (error) {
        throw new ApolloError(error)
    }
}

export const getUser = async (_, args, context) => {
    try {
        if (context.User.id) {
            const idUser = context.User.id
            const user = await UserSchema.findById({ _id: idUser })
            return user
        }
    } catch (e) {
        throw new ApolloError('error')
    }
}

export const lastCompanyMutation = async (_, { lastCompany }, ctx) => {
    const id = ctx.User.id && ctx.User.id
    await UserSchema.findOneAndUpdate(
        { _id: id || null },
        { lastCompany },
        { new: true })
    return { success: true, message: '' }
}
export const sendEmailConfirmation = async (_, { uEmail, userName }, ctx) => {
    const mailer = transporter()
    const dataToken = {
        idUser: ctx.User.id,
        uEmail,
        userName
    }
    const token = await generateToken(dataToken, '1d')
    mailer.sendMail({
        from: 'company invitation <no-reply@smartaccountingonline.com/>',
        to: uEmail,
        text: '',
        subject: 'Confirm - Email.',
        html: TemplateConfirm({
            code: token,
            username: userName
        })
    })
    return { success: true, message: 'Email sent check your inbox' }
}

export const confirmEmail = async (_, { idUser }, ctx) => {
    const dataUser = await UserSchema.findById({ _id: idUser })
    try {
        if (dataUser.userConfirmEmail === 1) return { success: false, message: 'The account is already verified' }
        if (!idUser || ctx.User.id !== idUser) return { success: false, message: 'You do not have access to this account' }
        const data = await UserSchema.findOneAndUpdate({ _id: idUser || null }, { userConfirmEmail: 1 }, { new: true })
        if (data) return { success: true, message: 'Your account has been activated successfully' }
    } catch (error) {
        return { success: false, message: 'The account could not be activated' }
    }
}

export const CreateRecoverAccount = async (_, input) => {
    const { uEmail } = input.input
    const existEmail = await UserSchema.findOne({ uEmail })
    if (!existEmail) return { success: false, message: 'User does not exist' }
    // Create the recovery token or code
    const uToken = await generateCode()
    // Insert the token to the user
    const id = existEmail._id
    await UserSchema.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                uToken
            }
        }
    )

    const mailer = transporter()
    if (existEmail) {
        mailer.sendMail({
            from: 'Account recovery <no-reply@smartaccountingonline.com/>',
            to: uEmail,
            text: 'Hello world?', // plain text body
            subject: 'Code recuperation.',
            html: RecoverAccountTemplate({
                code: uToken,
                username: existEmail.firstName
            })
        })
        if (existEmail) {
            return { success: true, message: 'We have sent a recovery email to your email' }
        }
    }
}

export const validateToken = async (_, { uEmail, uToken }) => {
    // Search User
    const uData = await UserSchema.findOne({ uEmail })
    if (!uData) return { success: false, message: 'Email is not registered' }
    if (uData.uToken === uToken) {
        return { success: true, message: 'Verified code' }
    } else {
        return { success: false, message: 'Find not code' }
    }
}
export const ResetPassword = async (_, { input }) => {
    const { uEmail, uPassword, uToken } = input
    // Search User
    const uData = await UserSchema.findOne({ uEmail })
    if (!uData) return { success: false, message: 'Email is not registered' }

    const newPass = await bcryptjs.hashSync(uPassword, 10)
    if (uData.uToken === uToken) {
        const id = uData._id
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
            return { success: true, message: 'Your account has been successfully recovered' }
        }
    }
}

export const getListBuckets = async (_, input, ctx) => {
    const idUser = ctx.User.id
    const user = await UserSchema.findById({ _id: idUser })
    const roles = await Roles.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            client.listBuckets(function (e) {
                if (e) return e
            })
        }
    }
}
export const UpdateUser = async (_, input, ctx) => {
    const {
        currentPassword,
        newPassword,
        step,
        lastName,
        uAddress,
        uBirthday
    } = input.input
    const id = ctx.User.id
    try {
        if (step === 0) {
            const user = await UserSchema.findById({ _id: id })
            const compare = await bcrypt.compare(
                currentPassword,
                user.uPassword
            )
            if (!compare) {
                return {
                    success: false,
                    message: 'La contraseña actual no es correcta'
                }
            }
            const compareNew = await bcrypt.compare(newPassword, user.uPassword)
            if (compareNew) {
                return {
                    success: false,
                    message:
            'La nueva contraseña no puede ser igual a la actual.'
                }
            }
            const salt = await bcrypt.genSaltSync(10)
            const newPassHash = await bcrypt.hash(newPassword, salt)
            // update password
            await UserSchema.findOneAndUpdate(id, { uPassword: newPassHash })
            return { success: true, message: 'Success.' }
            // findByIdAndUpdate
        } else if (step === 2) {
            await UserSchema.findOneAndUpdate(id, { lastName })
            return { success: true, message: `lastName to ${ lastName } success` }
        } else if (step === 3) {
            await UserSchema.findOneAndUpdate(id, { uAddress })
            return { success: true, message: 'Address successfully updated' }
        } else if (step === 4) {
            await UserSchema.findOneAndUpdate(id, { uBirthday })
            return { success: true, message: 'uPhone successfully updated' }
        }
    } catch (e) {
        throw new ApolloError(e)
    }
}

export const loginUser = async (_, { uEmail, uPassword }) => {
    try {
    //  Find the user
        const user = await UserSchema.findOne({ uEmail })
        if (!user) {
            return { success: false, message: 'Incorrect username or password' }
        }
        // Compare password
        const compare = await bcryptjs.compareSync(uPassword, user.uPassword)
        if (!compare) {
            return {
                success: false,
                message: 'Incorrect username or password Forgot your password?.'
            }
        }
        const dataUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            uEmail: user.uEmail,
            uPhone: user.uPhone,
            uAddress: user.uAddress,
            uBirthday: user.uBirthday,
            roles: user.roles,
            companiesOwn: user.idComp,
            companiesMemberOf: user.idTeamComp
        }
        const token = await generateToken(dataUser)
        const refreshToken = nanoid()
        const refreshTokenExpiry = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000)
        const salt = await bcrypt.genSalt(10)
        const refreshTokenHash = await bcrypt.hash(refreshToken, salt)
        await UserSchema.findOneAndUpdate(
            { _id: user.id },
            {
                $set: {
                    refreshTokens: [{
                        hash: refreshTokenHash,
                        expiry: refreshTokenExpiry
                    }]
                }
            }
        )
        // setCookies.push({
        //   name: 'refreshToken',
        //   value: refreshToken,
        //   options: {
        //     ...REFRESH_TOKEN_COOKIE_OPTIONS,
        //     expires: refreshTokenExpiry
        //   }
        // })
        return {
            user: dataUser,
            roles: user.roles,
            companiesOwn: user.idComp,
            companiesMemberOf: user.idTeamComp,
            success: true,
            message: 'Session created.',
            token,
            userId: user.id,
            refreshToken
        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const getAllBills = async (_, parent) => {
    try {
        const data = await BillSchema.find({ id: parent._id })
        return data
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}
export const registerUser = async (_parent, { email, name, password }, { setCookies }) => {
    const foundUser = await UserSchema.findOne({ email })
    if (foundUser) throw new Error('Email already registered')
    const passwordSalt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, passwordSalt)
    const refreshToken = nanoid()
    const refreshTokenExpiry = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000)
    const refreshTokenSalt = await bcrypt.genSalt(10)
    const refreshTokenHash = await bcrypt.hash(refreshToken, refreshTokenSalt)

    setCookies.push({
        name: 'refreshToken',
        value: refreshToken,
        options: {
            ...REFRESH_TOKEN_COOKIE_OPTIONS,
            expires: refreshTokenExpiry
        }
    })

    const newUser = await UserSchema.create({
        email,
        name,
        passwordHash,
        refreshTokens: [{ hash: refreshTokenHash, expiry: refreshTokenExpiry }]
    })

    const payload = {
        user: {
            id: newUser._id
        }
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_EXPIRY)
    })

    return { userId: newUser._id, token }
}

export const refresh = async () => {
}
export const refreshUserToken = async (parent, { userId, refreshToken }) => {
    // const { refreshToken } = req.cookies
    if (!refreshToken) throw new Error('No refresh token provided')
    const foundUser = await UserSchema.findById({ _id: userId })
    if (!foundUser) throw new Error('Invalid user')
    // REFRESH TOKEN VALIDATION
    let isRefreshTokenValid = false
    foundUser.refreshTokens = foundUser.refreshTokens.filter(
        storedToken => {
            const isMatch = bcrypt.compareSync(refreshToken, storedToken.hash)
            const isValid = storedToken.expiry > Date.now()
            if (isMatch && isValid) {
                isRefreshTokenValid = true
            }
            return !isMatch && isValid
        }
    )

    if (!isRefreshTokenValid) throw new Error('Invalid refresh token')
    // ISSUING OF NEW REFRESH TOKEN
    const newRefreshToken = nanoid()
    const newRefreshTokenExpiry = new Date(
        Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000
    )
    const salt = await bcrypt.genSalt(10)
    const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, salt)

    foundUser.refreshTokens.push({
        hash: newRefreshTokenHash,
        expiry: newRefreshTokenExpiry
    })
    await foundUser.save()
    // ISSUING OF NEW ACCESS TOKEN
    const payload = {
        id: foundUser._id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        userName: foundUser.userName,
        uEmail: foundUser.uEmail,
        uAddress: foundUser.uAddress,
        uBirthday: foundUser.uBirthday,
        roles: foundUser.roles,
        companiesOwn: foundUser.idComp,
        newRefreshToken,
        companiesMemberOf: foundUser.idTeamComp
    }
    const dataToken = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_EXPIRY)
    })

    return { userId: foundUser.id, dataToken, newRefreshToken }
}

export const getOneAllCompany = async (_, parent) => {
    try {
        const data = await CompanySchema.find({ _id: parent._id })
        return data
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}

export default {
    TYPES: {
        User: {
            bill: getAllBills,
            company: getOneAllCompany
        }
    },
    QUERIES: {
        getUser,
        getListBuckets,
        validateToken,
        verifyRegistration
    },
    MUTATIONS: {
        refreshUserToken,
        confirmEmail,
        newRegisterUser,
        registerUser,
        loginUser,
        ResetPassword,
        lastCompanyMutation,
        sendEmailConfirmation,
        UpdateUser,
        CreateRecoverAccount
    }
}
