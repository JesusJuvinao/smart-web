import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const SubmodulesModel = new mongoose.Schema({
    mId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'modules'
    },
    smName: {
        type: String,
        required: true,
        trim: true
    },
    smPath: {
        type: String,
        required: true,
        trim: true
    },
    smState: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.submodules || mongoose.model('submodules', SubmodulesModel)
