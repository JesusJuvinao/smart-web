import CommentsResolver from './comments'

export default {
    TYPES: {
        ...CommentsResolver.TYPES
    },
    QUERIES: {
        ...CommentsResolver.QUERIES
    },
    MUTATIONS: {
        ...CommentsResolver.MUTATIONS
    }
}
