import productResolver from './product'

export default {
    TYPES: {
        ...productResolver.TYPES
    },
    QUERIES: {
        ...productResolver.QUERIES
    },
    MUTATIONS: {
        ...productResolver.MUTATIONS
    }
}
