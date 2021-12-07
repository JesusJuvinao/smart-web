const mongoose = require('mongoose')

const Tabla2 = new mongoose.Schema(
    {
        legalEntity: {
            type: String,
            required: true
        },
        numTransactions: {
            type: Number,
            required: true
        },
        resultsCFM: {
            type: Number,
            required: true
        },
        diffTxns: {
            type: Number,
            required: true
        },
        transactionDate: {
            type: Date,
            required: true,
            unique: true,
            index: true
        },
        totalCardSales: {
            type: Number,
            required: true
        },
        dailySalesByProduct: {
            type: [],
            required: true
        },
        detailedTransactions: {
            type: [],
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.models.dailysalesdetail || mongoose.model('dailysalesdetail', Tabla2)
