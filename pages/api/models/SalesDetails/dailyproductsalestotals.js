/* eslint-disable camelcase */
const mongoose = require('mongoose')

const { Schema } = mongoose

const dailyproductsalestotalsSchema = new mongoose.Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Products'
        },
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
        salesDate: {
            type: Date,
            default: Date.now()
        },
        internalKey: {
            type: Date,
            default: Date.now()
        },
        legalEntity: {
            type: String,
            required: true
        },
        total_card_sales: {
            type: Number,
            required: true
        },
        numTxnsProd: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.models.dailyproductsalestotals || mongoose.model('dailyproductsalestotals', dailyproductsalestotalsSchema)
