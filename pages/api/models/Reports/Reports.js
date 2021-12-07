import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const ReportsModel = new mongoose.Schema({
    idComp: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Companies'
    },
    idPro: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    },
    dayDate: {
        type: Date,
        default: Date.now()
    },
    totalSalesDay: {
        type: Number,
        required: true,
        trim: true
    },
    totalCost: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.marginreports || mongoose.model('marginreports', ReportsModel)
