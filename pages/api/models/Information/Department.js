import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const DepartmentSchema = new Schema({
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
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.models.DepartmentSchema || mongoose.model('departmentSchema', DepartmentSchema)
