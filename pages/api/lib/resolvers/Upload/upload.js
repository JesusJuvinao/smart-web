'use strict'
import { ApolloError } from 'apollo-server-errors'
import FileUploadSchema from '../../../models/FileUpload/FileUpload'
import { client } from '../../../presignedUrl'

export const uploadFile = async (_, { file, input }, ctx) => {
    // Upload the files
    const idUser = ctx.User.id
    const idComp = ctx.idComp
    try {
        const fileUpload = await file
        const { createReadStream, filename, encoding } = fileUpload
        const extFile = filename.substring(filename.lastIndexOf('.'), filename.length)
        const fileStream = createReadStream()
        const newFilename = new FileUploadSchema({ ...input, idUser, BillLink: '', mimetype: extFile, SalesLink: '', idComp, idFile: '', encoding, filename })
        client.putObject(`smartreportzuploads${ idComp }`, filename, fileStream, '', extFile, function (e) {
            if (e) {
                return e
            }
        })

        await newFilename.save(newFilename)
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const setFiles = async (_root, { bId, input, idUser, idComp, bInvoiceRef, idFiles }) => {
    try {
        for (let i = 0; i < input.length; i++) {
            const data = input[i]
            const idFile = idFiles
            const IdBills = bId
            const BillLink = `${ data.filename }${ bInvoiceRef }`
            await FileUploadSchema.create({ ...input, idUser, idFiles: idFile, BillLink, mimetype: data.mimetype, SalesLink: data.SalesLink, idComp, IdBills, filename: data.filename, aSize: data.aSize })
        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const setAttachment = async (_root, { input }, ctx) => {
    const idUser = ctx.User.id
    const idComp = ctx.idComp
    const { filesData } = input || {}

    try {
        for (let i = 0; i < filesData.length; i++) {
            const data = filesData[i]
            const newFilename = new FileUploadSchema({ idUser, mimetype: data.mimetype, SalesLink: data.SalesLink, filename: data.filename, aSize: data.aSize, idComp })
            await newFilename.save(newFilename)
        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const EditFiles = async (_root, { input, idUser }) => {
    const { _id } = input
    try {
        for (let i = 0; i < input.length; i++) {
            await FileUploadSchema.findOneAndUpdate({ _id }, { idUser })
        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const EditOneFile = async (_root, { input }) => {
    const { _id, filename, Notes } = input
    try {
        const data = await FileUploadSchema.findOneAndUpdate({ _id }, { filename, Notes }, { upsert: true })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getAllFilesToBills = async (_root, { IdBills }, ctx) => {
    const idUser = ctx.User.id
    // const idComp = ctx.idComp
    // let size = 0
    try {
        const data = await FileUploadSchema.find({ idUser, IdBills })
        // for (let i = 0; i < data.length; i++) {
        //   const res = data[i]
        //   // Obtiene metadatas de las imagenes
        //   client.statObject('uploads', res.BillLink, function (err, stat) {
        //     if (err) {
        //       return console.log(err)
        //     }
        //     console.log(stat)
        //   })
        //   // Busca nombre de  archivos y te devuelve el dataStream CON LA RUTA
        //   client.getObject('uploads', res.BillLink, function (err, dataStream) {
        //     console.log(dataStream)
        //     if (err) {
        //       return console.log(err)
        //     }
        //     dataStream.on('data', function (chunk) {
        //       size += chunk.length
        //     })
        //     dataStream.on('end', function () {
        //       console.log('End. Total size = ' + size)
        //     })
        //     dataStream.on('error', function (err) {
        //       console.log(err)
        //     })
        //   })
        // }
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getOneObjectMinioClient = async (_, { fileName }) => {
    await client.presignedUrl('GET', 'uploads', fileName, 24 * 60 * 60,
        function (err, presignedUrl) {
            if (err) return err
            return presignedUrl
        })
}
export const getAllFilesLinkToBills = async (_, args) => {
    const { fileName, idComp } = args
    // 900 seg = 15 Mts
    const data = await client.presignedUrl('GET', `smartreportzuploads${ idComp }`, fileName, 15 * 60)
    return { success: true, message: data }
}
export const deleteOneFileMinio = async (_, { fileName }, ctx) => {
    const idComp = ctx.idComp
    const data = client.removeObject(`smartreportzuploads${ idComp }`, fileName)
    return { success: true, message: data }
}
export const getAllAttachment = async (_, { idComp }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = await FileUploadSchema.find({ idUser, idComp })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
// Delete multiple attachments
export const deleteMultipleAttachment = async () => {
    try {
        const objectsList = []

        // List all object paths in bucket uploads.
        const objectsStream = client.listObjects('uploads', 'filename', true)

        objectsStream.on('data', function (obj) {
            objectsList.push(obj.name)
        })

        objectsStream.on('error', function () {
        })

        objectsStream.on('end', function () {
            client.removeObjects('uploads', objectsList, function (e) {
                if (e) {
                    return ('Unable to remove Objects ', e)
                }
                ('Removed the objects successfully')
            })
        })
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getOneAttachment = async (_, { idComp }, ctx) => {
    const idUser = ctx.User.id
    try {
        const data = await FileUploadSchema.findOne({ idUser, idComp })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const DeleteOneFile = async (_, { id }, ctx) => {
    const idUser = ctx.User.id
    try {
        await FileUploadSchema.deleteOne({ _id: id, idUser })
        return true
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }// Delete One
}
export default {
    TYPES: {
    },
    QUERIES: {
        getAllFilesToBills,
        getOneObjectMinioClient,
        getOneAttachment,
        getAllFilesLinkToBills,
        getAllAttachment
    },
    MUTATIONS: {
        uploadFile,
        EditFiles,
        setAttachment,
        EditOneFile,
        deleteOneFileMinio,
        DeleteOneFile,
        setFiles
    }
}
