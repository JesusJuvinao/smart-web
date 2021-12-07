import companyResolver from './company'

export default {
    TYPES: {
        ...companyResolver.TYPES
    },
    QUERIES: {
        ...companyResolver.QUERIES
    },
    MUTATIONS: {
        ...companyResolver.MUTATIONS
    }
}
