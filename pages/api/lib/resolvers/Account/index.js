import accountResolver from './Account'

export default {
    TYPES: {
        ...accountResolver.TYPES
    },
    QUERIES: {
        ...accountResolver.QUERIES
    },
    MUTATIONS: {
        ...accountResolver.MUTATIONS
    }
}
