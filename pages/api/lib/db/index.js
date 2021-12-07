/* eslint-disable no-console */
import mongoose from 'mongoose'

const connect = async () => {
    await mongoose
        .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
        .then(() => console.log(`Mongo running at ${ process.env.MONGODB_URI }`))
        .catch(err => console.log(err))
}

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState !== 1) {
        await connect()
    }
    return handler(req, res)
}

const db = mongoose.connection
db.once('ready', () => console.log(`connected to mongo on ${ process.env.MONGODB_URI }`))

export default connectDB
