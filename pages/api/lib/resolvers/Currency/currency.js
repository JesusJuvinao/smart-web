'use strict'
import { ApolloError } from 'apollo-server-errors'
import CurrencySchema from '../../../models/Currency/CurrencySchema'

export const newCurrency = async (_, { input }, ctx) => {
    const idUser = ctx.User.id
    if (!idUser) throw new ApolloError('Your request could not be processed.', 500)
    try {
        const data = await CurrencySchema.create({ ...input })
        return data
    } catch (error) {
        throw new ApolloError(error)
    }
}

export const getCurrencies = async () => {
    try {
        const data = await CurrencySchema.find({})
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export default {
    TYPES: {},
    QUERIES: {
        getCurrencies
    },
    MUTATIONS: {
        newCurrency
    }
}
