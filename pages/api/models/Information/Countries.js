import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const CountrySchema = new Schema({
    cName: {
        type: String,
        required: true,
        trim: true
    },
    cCalCod: {
        type: Number,
        required: true,
        trim: true
    },
    did: {
        type: String,
        required: true,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.models.countryschema || mongoose.model('countryschema', CountrySchema)
