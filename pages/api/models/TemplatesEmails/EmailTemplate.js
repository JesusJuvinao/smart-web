import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const templatesHtmlModel = new mongoose.Schema({
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
    TempEmailName: {
        type: String,
        required: true
    },
    TemStatus: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.templatesHtml || mongoose.model('templatesHtml', templatesHtmlModel)
