import Roles from '../../../models/admin/admin'
import UserSchema from '../../../models/users/userLogin'
import { client } from '../../../presignedUrl'

export const getRoles = async (_, parent, context) => {
    try {
        const idUser = context.User.id
        const user = await UserSchema.findById({ _id: idUser })
        const data = await Roles.find({ _id: { $in: user.roles } })
        return data
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}
export const removeBucketMinio = async bucketName => {
    client.removeBucket(`smartreportzuploads${ bucketName }`, function (e) {
        if (e) {
            return e
        }
    })
}
export const bucketExistsQuery = async () => {
    client.bucketExists('BucketName', function (err, exists) {
        if (err) {
            return err
        }
        if (exists) {
            return 'Bucket exists.'
        }
    })
}
export const createOneBucket = async () => {
    client.makeBucket('mybucket', 'us-east-1', function (err) {
        if (err) return ('Error creating bucket.', err)
    })
}
export const createRoleMutation = async (_, input, context) => {
    const { name } = input.input
    const idUser = context.User.id
    try {
    // Can only register the administrator
        const user = await UserSchema.findById({ _id: idUser })
        const roles = await Roles.find({ _id: { $in: user.roles } })
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                const data = await Roles.create({ name })
                return data
            }
        }
    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}
export const createRoles = async () => {
    try {
    // Count Documents
        const count = await Roles.estimatedDocumentCount()
        // check for existing roles
        if (count > 0) return
        // Create default Roles
        // const values = await Promise.all([
        //     new Roles({ name: 'user' }).save(),
        //     new Roles({ name: 'moderator' }).save(),
        //     new Roles({ name: 'admin' }).save()
        // ])
    } catch (error) {
        return error
    }
}

export default {
    TYPES: {},
    QUERIES: {
        getRoles,
        bucketExistsQuery
    },
    MUTATIONS: {
        createRoleMutation,
        createOneBucket,
        removeBucketMinio
    }
}
