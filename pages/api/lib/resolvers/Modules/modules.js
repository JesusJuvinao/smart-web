/* eslint-disable no-shadow */
'use strict'
import { ApolloError } from 'apollo-server-errors'
import ModulesSchema from '../../../models/Modules'
import SubModulesSchema from '../../../models/Modules/subModules'
import UserSchema from '../../../models/users/userLogin'
import Roles from '../../../models/admin/admin'

export const registerModule = async (_, { input, inputLineItemsMod }, ctx) => {
    const { mPath, mName, mPriority, mIcon } = input || {}
    const { setDataModule } = inputLineItemsMod || {}
    const { smName, smPath, smState } = setDataModule
    const idUser = ctx.User.id
    try {
    // Can only register the administrator
        const user = await UserSchema.findById({ _id: idUser })
        const roles = await Roles.find({ _id: { $in: user.roles } })
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                const data = await ModulesSchema.create({ mPath, mName, mPriority, mIcon })
                for (let i = 0; i < setDataModule.length; i++) {
                    await ModulesSchema.findOneAndUpdate(
                        { _id: data._id },
                        {
                            $addToSet: {
                                SubModules: {
                                    $each: [{ smName, smPath, smState }]
                                }
                            }
                        }
                    ).then(res => {
                        if (res) { return { success: true } }
                    }).catch(err => {
                        return err
                    })
                }
                return data
            }
        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const getAllModules = async () => {
    try {
        const data = await ModulesSchema.find({})
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const DeleteOneModules = async (_, { id }) => {
    try {
        await ModulesSchema.deleteOne({ _id: id })
        return true
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const EditModules = async (_, { input }, ctx) => {
    const idUser = ctx.User.id
    const { _id } = input

    try {
        const data = await ModulesSchema.findOneAndUpdate({ _id }, { idUser })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getSubModules = async (_, parent) => {
    try {
        const data = await SubModulesSchema.find({ _id: parent._id })
        return data
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}
export const getModules = async (_, parent) => {
    try {
        const data = await ModulesSchema.find({ _id: parent._id })
        return data
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}
export default {
    TYPES: {},
    QUERIES: {
        getAllModules
    },
    MUTATIONS: {
        EditModules,
        DeleteOneModules,
        registerModule
    }
}
