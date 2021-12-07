import uploadFileResolver from './upload'

export default {
    TYPES: {
        ...uploadFileResolver.TYPES
    },
    QUERIES: {
        ...uploadFileResolver.QUERIES
    },
    MUTATIONS: {
        ...uploadFileResolver.MUTATIONS
    }
}
