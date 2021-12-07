'use strict'
import { ApolloError } from 'apollo-server-errors'
// import { isCompositeType } from 'graphql'
import SalesInvoiceSchema from '../../../models/SalesDetails/DailySalesSchema '
// import UserSchema from '../../../models/users/userLogin'
// import CompanySchema from '../../../models/Companies/CompanySchema'

export const DailySalesSchema = async () => {
    try {
        const data = await SalesInvoiceSchema.find({})
        return data
    } catch (error) {
        throw new ApolloError(error)
    }
}
export const newDetailSales = async () => {
    try {
    // const data = await SalesInvoiceSchema.find({})
    // return data
    } catch (error) {
        throw new ApolloError(error)
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        DailySalesSchema
    },
    MUTATIONS: {
    },
    SUBSCRIPTION: {
        newDetailSales
    }
}
