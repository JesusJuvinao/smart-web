import billResolver from './bill'

export default {
    TYPES: {
        ...billResolver.TYPES
    },
    QUERIES: {
        ...billResolver.QUERIES
    },
    MUTATIONS: {
        ...billResolver.MUTATIONS
    }
}
