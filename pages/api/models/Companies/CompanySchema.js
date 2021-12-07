import mongoose from 'mongoose'
const { Schema } = mongoose

mongoose.Promise = global.Promise

const CompanySchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sCurrency: {
        type: Schema.Types.ObjectId,
        ref: 'Currencys'
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: false,
        trim: true
    },
    registeredOfficeAddress: {
        type: String,
        required: true,
        trim: true
    },
    companyLegalStatus: {
        type: String,
        required: false,
        trim: true
    },
    companyType: {
        type: String,
        required: true,
        enum: ['LEGAL_PERSON', 'NATURAL_PERSON']
    },
    accounts: {
        type: String,
        required: false,
        trim: true
    },
    natureOfBusiness: {
        type: String,
        required: false,
        trim: true
    },
    dissolvedOn: {
        type: String,
        required: false
    },
    incorporatedOn: {
        type: String,
        required: true
    },
    cState: {
        type: Boolean,
        default: true
    },
    lineItemsTeam: [{
        description: String,
        authorization: Number,
        uEmail: String,
        Username: String,
        status: {
            type: Boolean,
            default: false
        },
        dateAdded: {
            type: Date,
            default: Date.now()
        },
        idUser: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }],
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.models.Companies || mongoose.model('Companies', CompanySchema)
