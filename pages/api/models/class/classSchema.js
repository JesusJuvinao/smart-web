import mongoose from 'mongoose'

const { Schema } = mongoose
mongoose.Promise = global.Promise

const ClassSchema = new mongoose.Schema({
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
    className: {
        type: String,
        required: true,
        trim: true
    },
    idClass: {
        type: String,
        required: false,
        trim: true
    },
    SubClass: {
        type: String,
        required: true,
        trim: true
    },
    classActive: {
        type: Boolean,
        required: false,
        default: true
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.Class || mongoose.model('Class', ClassSchema)
