import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const IvaSchema = new mongoose.Schema({
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
    iPercentage: {
        type: Number,
        required: true,
        trim: true
    },
    IName: {
        type: String,
        required: true,
        trim: true
    },
    idRefIva: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.IvaSchema || mongoose.model('IvaSchema', IvaSchema)
