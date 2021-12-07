import adminResolver from './rolesadmin'

export default {
    TYPES: {
        ...adminResolver.TYPES
    },
    QUERIES: {
        ...adminResolver.QUERIES
    },
    MUTATIONS: {
        ...adminResolver.MUTATIONS
    }
}
