import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const CommentsSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    idComp: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Companies'
    },
    content: {
        type: String,
        required: true
    },
    postUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    postId: {
        type: String,
        required: false,
        trim: true
    },
    likes: [{
        number: Number
    }]
}, {
    timestamps: true
})

module.exports =
    mongoose.models.comments || mongoose.model('comments', CommentsSchema)
