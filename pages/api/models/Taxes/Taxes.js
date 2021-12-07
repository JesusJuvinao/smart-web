import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const TaxModel = new mongoose.Schema({
    idComp: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Companies'
    },
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    TaxName: {
        type: String,
        required: true
    },
    started: {
        type: Date,
        default: Date.now(),
        required: true
    },
    vatDate: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: true,
        trim: true
    },
    TaxBalance: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.taxes || mongoose.model('taxes', TaxModel)
