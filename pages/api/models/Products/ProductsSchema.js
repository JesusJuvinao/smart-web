import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const ProductsSchema = new mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    idComp: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Companies'
    },
    pName: {
        type: String,
        required: true,
        trim: true
    },
    pServiceCode: {
        type: String,
        required: true,
        trim: true
    },
    pCategory: {
        type: String,
        required: false,
        trim: true
    },
    pClass: {
        type: String,
        required: false,
        trim: true
    },
    pDescription: {
        type: String,
        required: true,
        trim: true
    },
    pSellToOthers: {
        type: Boolean,
        required: true,
        trim: true
    },
    pIncVAT: {
        type: Boolean,
        required: true,
        trim: true
    },
    pSalesPrice: {
        type: Number,
        required: true,
        trim: true
    },
    pVATCode: {
        type: String,
        required: true,
        trim: true
    },
    pPurchasedOthers: {
        type: Boolean,
        required: true,
        trim: true
    },
    pIncomeAccount: {
        type: String,
        required: true,
        trim: true
    },
    pType: {
        type: String,
        required: true,
        trim: true
    },
    pPhoto: {
        type: String,
        required: true,
        trim: true
    },
    idRef: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.Products || mongoose.model('Products', ProductsSchema)
