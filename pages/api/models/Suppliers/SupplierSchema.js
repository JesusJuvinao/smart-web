import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const SupplierSchema = new mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    sCurrency: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Currencys'
    },
    idComp: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Companies'
    },
    sName: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.Suppliers || mongoose.model('Suppliers', SupplierSchema)
