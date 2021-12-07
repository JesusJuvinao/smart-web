import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const modulesModel = new mongoose.Schema({
    mPath: {
        type: String,
        trim: true
    },
    mName: {
        type: String,
        required: true,
        trim: true
    },
    mPriority: {
        type: Number,
        required: true,
        trim: true
    },
    mIcon: {
        type: Number,
        required: true,
        trim: true
    },
    SubModules: [{
        smName: String,
        smPath: String,
        smState: Number
    }]
}, {
    timestamps: true
})

module.exports =
    mongoose.models.modules || mongoose.model('modules', modulesModel)
