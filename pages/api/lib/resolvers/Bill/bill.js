'use strict'
import { ApolloError } from 'apollo-server-errors'
import BillSchema from '../../../models/Bills/BillSchema'
import UserSchema from '../../../models/users/userLogin'
import FileUploadSchema from '../../../models/FileUpload/FileUpload'
import CompanySchema from '../../../models/Companies/CompanySchema'
import SupplierSchema from '../../../models/Suppliers/SupplierSchema'
import { setFiles } from '../Upload/upload'
import Product from '../../../models/Products/ProductsSchema'
import { generateToken, transporter } from '@/pages/api/utils'
import { TemplateSendCodeAccess } from '../../templates/TemplateConfirm'

export const createBillMutation = async (_, { input, inputLineItems, setTagsInput, setFilesInput }, ctx) => {
    // const idComp = ctx.idComp
    const { setData } = inputLineItems || {}
    const { setTags } = setTagsInput || {}
    // Files Data
    const { filesData, idFiles } = setFilesInput || {}
    const id = ctx.User.id
    try {
        const user = await UserSchema.findById({ _id: id })
        const data = await CompanySchema.find({ _id: { $in: user.idUser } })
        if (!data) { return { success: false, message: 'You do not have access to the company' } }
        const bill = new BillSchema({ ...input, idUser: id, currencyBill: input.currencyBill })
        await bill.save(bill)
        for (let i = 0; i < setData.length; i++) {
            const { lineItemsQuantity, lineItemsDescription, lineItemsRate, lineItemsTotalVAT, lineItemsIdVAT, lineItemsIdClass, lineItemsIdPro, lineItemsIdAccount, lineItemsSubTotal } = setData[i]
            await BillSchema.findOneAndUpdate(
                { _id: bill._id },
                {
                    $addToSet: {
                        lineItems: {
                            $each: [{ lineItemsQuantity, lineItemsDescription, lineItemsRate, lineItemsTotalVAT, lineItemsIdVAT, lineItemsIdClass, lineItemsIdPro, lineItemsIdAccount, lineItemsSubTotal, iva: [{ iPercentage: data.setDataIva[0].iPercentage }] }]
                        }
                    }
                }
            ).then(res => {
                if (res) { return { success: true } }
            }).catch(err => {
                return err
            })
        }
        for (let i = 0; i < setTags.length; i++) {
            await BillSchema.findOneAndUpdate(
                { _id: bill._id },
                {
                    $push: {
                        tags: {
                            $each: [{ TName: data.TName }]
                        }
                    }
                }
            )
        }
        setFiles(false, { bId: bill._id, input: filesData, idUser: id, idComp: input.idComp, bInvoiceRef: input.bInvoiceRef, idFiles })
        return bill
    } catch (error) {
        throw new ApolloError(error)
    }
}
export const DeleteOneBill = async (_, { id }, ctx) => {
    const idUser = ctx.User.id
    try {
        await BillSchema.deleteOne({ _id: id, idUser })
        return true
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }// Delete One
}
export const stacks = async () => {
    const data = await BillSchema.find()
    return data
}
export const updateBill = async (_, { input, inputLineItems, setTagsInput, setFilesInput }, ctx) => {
    const idUser = ctx.User.id
    const { _id, idComp, idSupplier, bInvoiceDate, bDueDate, billSubTotal, billTotal, billNo, bDescription, VatType, currencyBill } = input
    const { setData } = inputLineItems || {}
    const { setTags } = setTagsInput || {}
    const { filesData } = setFilesInput || {}
    try {
        const data = await BillSchema.findOneAndUpdate(_id, { idUser, idComp, VatType, idSupplier, bInvoiceDate, bDueDate, currencyBill, billSubTotal, billTotal, billNo, bDescription })
        // Edit Files
        setFiles(false, { bId: _id, input: filesData, idUser, idComp: input.idComp, bInvoiceRef: input.bInvoiceRef })
        // Edit Dynamic SubDocument
        for (let i = 0; i < setData.length; i++) {
            const mongoose = require('mongoose')
            const valid = mongoose.Types.ObjectId.isValid(data._id)
            if (valid === true) {
                const { lineItemsQuantity, lineItemsDescription, lineItemsRate, lineItemsTotalVAT, lineItemsIdVAT, lineItemsIdClass, lineItemsIdPro, lineItemsIdAccount, lineItemsSubTotal } = setData[i]
                await BillSchema.findOneAndUpdate({ _id, 'lineItems._id': data._id },
                    {
                        $set: { 'lineItems.$.lineItemsDescription': lineItemsDescription, 'lineItems.$.lineItemsQuantity': lineItemsQuantity, 'lineItems.$.lineItemsTotalVAT': lineItemsTotalVAT, 'lineItems.$.lineItemsIdVAT': lineItemsIdVAT, 'lineItems.$.lineItemsRate': lineItemsRate, 'lineItems.$.lineItemsIdClass': lineItemsIdClass, 'lineItems.$.lineItemsIdPro': lineItemsIdPro, 'lineItems.$.lineItemsIdAccount': lineItemsIdAccount, 'lineItems.$.lineItemsSubTotal': lineItemsSubTotal, 'lineItems.$.iva': [{ iPercentage: data.setDataIva[0].iPercentage }] }
                    })
            } else {
                const { lineItemsQuantity, lineItemsDescription, lineItemsRate, lineItemsTotalVAT, lineItemsIdVAT, lineItemsIdClass, lineItemsIdPro, lineItemsIdAccount, lineItemsSubTotal } = setData[i]
                await BillSchema.findOneAndUpdate(
                    { _id },
                    {
                        $addToSet: {
                            lineItems: {
                                $each: [{ lineItemsQuantity, lineItemsDescription, lineItemsRate, lineItemsTotalVAT, lineItemsIdVAT, lineItemsIdClass, lineItemsIdPro, lineItemsIdAccount, lineItemsSubTotal, iva: [{ iPercentage: data.setDataIva[0].iPercentage }] }]
                            }
                        }
                    }
                )
            }
        }
        // TAGS
        for (let i = 0; i < setTags.length; i++) {
            const mongoose = require('mongoose')
            const valid = mongoose.Types.ObjectId.isValid(data._id)
            if (valid === true) {
                await BillSchema.findOneAndUpdate({ _id, 'tags._id': data._id },
                    {
                        $set: { 'tags.$.TName': data.TName }
                    })
            } else {
                await BillSchema.findOneAndUpdate(
                    { _id },
                    {
                        $addToSet: {
                            tags: {
                                $each: [{ TName: data.TName }]
                            }
                        }
                    }
                )
            }
        }
        // // Edit Dynamic Tags
        // for (let i = 0; i < setTags?.length; i++) {
        //   await BillSchema.findOneAndUpdate(
        //     { _id: _id },
        //     {
        //       $set: {
        //         tags: { _id: data._id, TName: data.TName }
        //       }
        //     }
        //   )
        // }
        return data
    } catch (error) {
        throw new ApolloError(error)
    }
}

export const getOneBillById = async (_, { id }) => {
    try {
        const data = await BillSchema.findOne({ _id: id })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const deleteOneLineItem = async (_, { id, idLine }) => {
    try {
        await BillSchema.update({
            _id: id
        }, {
            $pull: {
                lineItems: {
                    _id: idLine
                }
            }
        })
        return true
    } catch (error) {
        return false
    }
}
export const deleteOneTagLineItem = async (_, { id, idLine }) => {
    try {
        await BillSchema.update({
            _id: id
        }, {
            $pull: {
                tags: {
                    _id: idLine
                }
            }
        })
        return true
    } catch (error) {
        return false
    }
}
export const getLineItem = async () => {
    try {
        const data = await BillSchema.find({ 'lineItems.idPro': '6192f6e9c2776c3c6433066e' })
        return data
    } catch (error) {
        return error
    }
}

export const getIva = async (_, args, context) => {
    try {
        if (!context.User.id) throw new ApolloError('Error, Your session has expired, please log in again.', 500)
        const idUser = context.User.id
        const data = await BillSchema.find({ _id: idUser })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const getOneSupplier = async (_, parent) => {
    try {
        const data = await SupplierSchema.find({ _id: parent._id })
        return data
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}
export const getAllBill = async (_, { idComp }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = await BillSchema.find({ idUser, idComp })

            .populate('idSupplier')
            .populate('IdBills')
            .populate({
                path: 'lineItems',
                select: 'idPro',
                model: 'Products'
                // populate: {
                //   path: 'idPro'
                // }
            }).exec()
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const statistics = async (_, { idComp }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = await BillSchema.find({ idUser, idComp })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getAllFiles = async (_, parent) => {
    try {
        const data = await FileUploadSchema.find({ _id: parent._id }).populate('IdBills')
        return data
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}
export const getProducts = async (_, parent) => {
    try {
        const data = await Product.find({ _id: parent._id })
        return data
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}

export const setAccessBills = async (_, { idBill, typeAccess, idComp, uEmailEmployee },) => {
    try {
        const User = await UserSchema.findOne({ uEmail: uEmailEmployee })
        const Company = await CompanySchema.findById({ _id: idComp })
        const dataBill = await BillSchema.findById({ _id: idBill })
        const dataUser = {
            id: User._id,
            idBill,
            UserName: User.userName,
            uEmail: User.uEmail,
            typeAccess,
            idComp: '',
        }
        const token = await generateToken(dataUser)
        if (!dataBill) {
            return { success: false, message: 'The bill  does not exist.' }
        } else {
            await BillSchema.findOneAndUpdate(
                { _id: idBill },
                { $push: { accessTokenEmployee: token } }
            )
            const mailer = transporter()
            mailer.sendMail({
                from: 'company invitation <no-reply@smartaccountingonline.com/>',
                to: User.uEmail,
                text: 'Hello world?',
                subject: `Invitation bills ref. ${ dataBill.billNo }`,
                html: TemplateSendCodeAccess({
                    code: token,
                    company: `${ Company.companyName }`,
                    username: User.uEmail
                })
            })
            return { success: true, message: `You have sent an invitation link to  ${ User.uEmail } to make changes to the bill with reference ${ dataBill.billNo }` }
        }
    } catch (error) {
        return error
        // throw new ApolloError('Your request could not be processed.', 500)

    }
}

export default {
    TYPES: {
        Bill: {
            filesBills: getAllFiles,
            supplier: getOneSupplier,
            products: getProducts
        }
    },
    QUERIES: {
        statistics,
        getAllBill,
        getOneBillById
    },
    MUTATIONS: {
        createBillMutation,
        setAccessBills,
        DeleteOneBill,
        deleteOneLineItem,
        deleteOneTagLineItem,
        updateBill
    }
}
