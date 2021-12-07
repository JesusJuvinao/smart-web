import mongoose from 'mongoose'
const { Schema } = mongoose
mongoose.Promise = global.Promise
const CurrencySchema = new Schema({
    cName: {
        type: String,
        required: true,
        trim: true
    },
    cDescription: {
        type: String,
        required: true
    }
})
module.exports = mongoose.models.Currencys || mongoose.model('Currencys', CurrencySchema)
