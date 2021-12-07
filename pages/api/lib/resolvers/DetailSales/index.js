import detailResolver from './DetailSales'

export default {
    TYPES: {
        ...detailResolver.TYPES
    },
    QUERIES: {
        ...detailResolver.QUERIES
    },
    MUTATIONS: {
        ...detailResolver.MUTATIONS
    },
    SUBSCRIPTION: {
        ...detailResolver.SUBSCRIPTION
    }
}
