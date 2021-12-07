import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const AccountSchema = new mongoose.Schema({
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
    aName: {
        type: String,
        required: true,
        trim: true
    },
    aBalance: {
        type: Number,
        required: true,
        trim: true
    },
    aDescription: {
        type: String,
        required: false,
        trim: true
    },
    idAccount: {
        type: String,
        required: false
    },
    aType: {
        type: String,
        required: true,
        enum: ['ASSETS', 'LIABILITY', 'INCOME', 'EXPENSE'],
        default: 'ASSETS'
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.Account || mongoose.model('Account', AccountSchema)
