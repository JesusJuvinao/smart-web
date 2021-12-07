import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const UserSchema = new mongoose.Schema({
    idComp: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Companies'
        }
    ],
    idTeamComp: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Companies'
        }
    ],
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'UserAdminSchema',
            default: 'user'
        }
    ],
    refreshTokens: [
        {
            hash: {
                type: String
            },
            expiry: {
                type: Date
            }
        }
    ],
    lastCompany: {
        type: String,
        required: false
    },
    userConfirmEmail: {
        type: Number,
        default: '0'
    },
    uPhone: {
        type: String,
    },
    firstName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    userName: {
        type: String,
        required: false
    },
    uEmail: {
        type: String,
        required: true,
        trim: true
    },
    uAddress: {
        type: String,
        required: false,
        trim: true
    },
    uAvatar: {
        type: String
    },
    // landline *(Optional)
    landLine: {
        type: Number,
        required: false,
        trim: true
    },
    uPassword: {
        type: String,
        required: true,
        trim: true
    },
    // date of birth
    uBirthday: {
        type: Date,
        default: Date.now
    },
    uToken: {
        type: String,
        required: false
    },
    // location logint
    long: {
        type: Number,
        required: false
    },
    // location latitude
    lat: {
        type: Number,
        required: false
    },
    iP: {
        type: Number,
        required: false
    }

}, {
    timestamps: true
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
