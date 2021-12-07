import supplierResolver from './supplier'

export default {
    TYPES: {
        ...supplierResolver.TYPES
    },
    QUERIES: {
        ...supplierResolver.QUERIES
    },
    MUTATIONS: {
        ...supplierResolver.MUTATIONS
    }
}
