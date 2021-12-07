import countriesResolver from './countries'

export default {
    TYPES: {
        ...countriesResolver.TYPES
    },
    QUERIES: {
        ...countriesResolver.QUERIES
    }
}
