'use strict'
import { ApolloError } from 'apollo-server-errors'
import CommentsSchema from '../../../models/Comments/Commets'

export const postAComments = async (_, { input }, ctx) => {
    const idUser = ctx.User.id
    if (!idUser) throw new ApolloError('Your request could not be processed.', 500)
    try {
        const data = await CommentsSchema.create({ ...input })
        return data
    } catch (error) {
        throw new ApolloError(error)
    }
}

export const getAllComments = async () => {
    try {
        const data = await CommentsSchema.find({})
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export default {
    TYPES: {},
    QUERIES: {
        getAllComments
    },
    MUTATIONS: {
        postAComments
    }
}
