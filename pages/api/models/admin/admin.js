import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const UserAdminSchema = new mongoose.Schema({
    name: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.models.UserAdminSchema || mongoose.model('UserAdminSchema', UserAdminSchema)
