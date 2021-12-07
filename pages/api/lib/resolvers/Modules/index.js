import modulesResolver from './modules'

export default {
    TYPES: {
        ...modulesResolver.TYPES
    },
    QUERIES: {
        ...modulesResolver.QUERIES
    },
    MUTATIONS: {
        ...modulesResolver.MUTATIONS
    }
}
