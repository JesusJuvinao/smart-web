import mongoose from 'mongoose'
const { Schema } = mongoose

mongoose.Promise = global.Promise

const UsermodulesModel = new mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    modules: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'modules'
    },
    mState: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.usermodules || mongoose.model('usermodules', UsermodulesModel)
