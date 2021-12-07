import { ApolloError } from 'apollo-server-errors'
import BillSchema from '../../../models/Bills/BillSchema'
import ProductsSchema from '../../../models/Products/ProductsSchema'

export const getAllBillsDemo = async (_, { idComp }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = await BillSchema.find({ idUser, idComp })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export const getProductsOne = async (_, parent) => {
    try {
        const data = await ProductsSchema.find({ _id: parent._id })
        return data
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}

export default {
    TYPES: {
        LineItems: {
            idPro: getProductsOne
        }
    },
    QUERIES: {
        getAllBillsDemo
    },
    MUTATIONS: {}
}
