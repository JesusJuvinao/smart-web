import reportsResolver from './Reports'
import marginResolver from './Margins'

export default {
    TYPES: {
        ...reportsResolver.TYPES
    },
    QUERIES: {
        ...reportsResolver.QUERIES,
        ...marginResolver.QUERIES
    },
    MUTATIONS: {
        ...reportsResolver.MUTATIONS
    }
}
