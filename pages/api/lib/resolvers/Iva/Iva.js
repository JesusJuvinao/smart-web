'use strict'
import { ApolloError } from 'apollo-server-errors'
// import { isCompositeType } from 'graphql'
import IvaSchema from '../../../models/IVA/IVA'
// import UserSchema from '../../../models/users/userLogin'
// import CompanySchema from '../../../models/Companies/CompanySchema'

export const registerIva = async (_, { input }, ctx) => {
    const idUser = ctx.User.id
    try {
    // const data = await IvaSchema.create({ ...input, idComp: input.idComp, idUser: idUser })
        const Iva = new IvaSchema({ ...input, idComp: input.idComp, idUser })
        await Iva.save(Iva)
        await IvaSchema.findOneAndUpdate(
            { _id: Iva._id },
            {
                $set: { idRefIva: Iva._id }
            }
        )
        return Iva
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const DeleteOneIva = async (_, { id }, ctx) => {
    const idUser = ctx.User.id
    try {
        await IvaSchema.deleteOne({ _id: id, idUser })
        return true
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getOneVat = async (_, { id }) => {
    try {
        const data = await IvaSchema.findOne({ _id: id })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getAllIva = async (_, { idComp }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = await IvaSchema.find({ idUser, idComp })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const EditIva = async (_, { input }, ctx) => {
    const idUser = ctx.User.id
    const { _id, idComp, IName, iPercentage } = input
    try {
        const data = await IvaSchema.findOneAndUpdate({ _id }, { idUser, idComp, IName, iPercentage })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export default {
    TYPES: {
    },
    QUERIES: {
        getAllIva,
        getOneVat
    },
    MUTATIONS: {
        registerIva,
        DeleteOneIva,
        EditIva
    }
}
