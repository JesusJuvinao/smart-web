'use strict'
import { ApolloError } from 'apollo-server-errors'
// import { isCompositeType } from 'graphql'
import AccountSchema from '../../../models/Account/Account'
// import UserSchema from '../../../models/users/userLogin'
// import CompanySchema from '../../../models/Companies/CompanySchema'

export const registerAccount = async (_, { input }, ctx) => {
    const idUser = ctx.User.id
    try {
        const account = new AccountSchema({ ...input, idComp: input.idComp, idUser })
        await account.save(account)
        await AccountSchema.findOneAndUpdate(
            { _id: account._id },
            {
                $set: { idAccount: account._id }
            }
        )
        return account
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const getAllAccount = async (_, { idComp }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = await AccountSchema.find({ idUser, idComp })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const DeleteOneAccounts = async (_, { id }, ctx) => {
    const idUser = ctx.User.id
    try {
        await AccountSchema.deleteOne({ _id: id, idUser })
        return true
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const EditAccounts = async (_, { input }, ctx) => {
    const idUser = ctx.User.id
    const { _id, idComp, aName, aBalance, aDescription, aType } = input

    try {
        const data = await AccountSchema.findOneAndUpdate({ _id }, { idUser, idComp, aName, aBalance, aDescription, aType })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getAllAccount
    },
    MUTATIONS: {
        registerAccount,
        EditAccounts,
        DeleteOneAccounts
    }
}
