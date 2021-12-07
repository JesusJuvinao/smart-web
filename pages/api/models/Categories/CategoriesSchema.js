import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const CategoriesSchema = new mongoose.Schema({
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
    cName: {
        type: String,
        required: true,
        trim: true
    },
    cDescription: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.Categories || mongoose.model('Categories', CategoriesSchema)
