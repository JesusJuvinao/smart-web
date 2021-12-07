import taxesResolver from './taxes'

export default {
    TYPES: {
        ...taxesResolver.TYPES
    },
    QUERIES: {
        ...taxesResolver.QUERIES
    },
    MUTATIONS: {
        ...taxesResolver.MUTATIONS
    }
}
