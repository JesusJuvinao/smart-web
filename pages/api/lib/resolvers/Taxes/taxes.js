'use strict'
import { ApolloError } from 'apollo-server-errors'
import Taxes from '../../../models/Taxes/Taxes'

export const newTaxesForCompany = async (_, { input }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = new Taxes({ ...input, idComp: input.idComp, idUser })
        return data
    } catch (error) {
        throw new ApolloError(error)
    }
}
export const DeleteOneTaxes = async (_, { id }, ctx) => {
    const idUser = ctx.User.id
    try {
        await Taxes.deleteOne({ _id: id, idUser })
        return true
    } catch (error) {
        throw new ApolloError(error)
    }
}

export const getAllTax = async (_, { idComp }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = await Taxes.find({ idUser, idComp })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const editOneTaxes = async (_, { input }, ctx) => {
    const idUser = ctx.User.id
    const { _id, idComp, pName, pServiceCode, pCategory, idRef, pClass, pDescription, pSalesPrice, pIncVAT, pIncomeAccount, pPurchasedOthers, pType, pSellToOthers, pVATCode, pPhoto } = input
    try {
        const data = await Taxes.findOneAndUpdate(_id, { idUser, idComp, pName, pServiceCode, pCategory, idRef, pClass, pDescription, pSalesPrice, pIncVAT, pIncomeAccount, pPurchasedOthers, pType, pSellToOthers, pVATCode, pPhoto })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export default {
    TYPES: {
    },
    QUERIES: {
        getAllTax
    },
    MUTATIONS: {
        newTaxesForCompany,
        DeleteOneTaxes,
        editOneTaxes
    }
}
