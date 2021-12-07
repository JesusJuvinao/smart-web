import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const FileUploadSchema = new mongoose.Schema({
    idFiles: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
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
    IdBills: {
        type: Schema.Types.ObjectId,
        ref: 'billschema'
    },
    IdSales: {
        type: Schema.Types.ObjectId,
        ref: 'sales'
    },
    uploaded: {
        type: Date,
        required: true,
        default: Date.now()
    },
    BillLink: {
        type: String,
        required: false
    },
    encoding: {
        type: String,
        required: false
    },
    filename: {
        type: String,
        required: false
    },
    Notes: {
        type: String,
        required: false
    },
    SalesLink: {
        type: String,
        required: false
    },
    // Minio Path
    aPath: {
        type: String,
        required: false
    },
    mimetype: {
        type: String,
        required: false
    },
    aSize: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
})

module.exports =
    mongoose.models.FileUploadSchema || mongoose.model('FileUploadSchema', FileUploadSchema)
