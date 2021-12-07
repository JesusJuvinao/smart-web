'use strict'
import { ApolloError } from 'apollo-server-errors'
// import { isCompositeType } from 'graphql'
import ReportsModel from '../../../models/Reports/Reports'
// import UserSchema from '../../../models/users/userLogin'
// import CompanySchema from '../../../models/Companies/CompanySchema'

export const newReports = async (_, { input }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = await ReportsModel.create({ ...input, id: idUser })
        return data
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}

export const getReports = async (_, { idComp }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = await ReportsModel.find({ idUser, idComp })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getReports
    },
    MUTATIONS: {
        newReports
    }
}
