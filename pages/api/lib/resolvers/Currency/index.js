import currencyResolver from './currency'

export default {
    TYPES: {
        ...currencyResolver.TYPES
    },
    QUERIES: {
        ...currencyResolver.QUERIES
    },
    MUTATIONS: {
        ...currencyResolver.MUTATIONS
    }
}
