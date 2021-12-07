import dashboardResolver from './dashboard'

export default {
    TYPES: {
        ...dashboardResolver.TYPES
    },
    QUERIES: {
        ...dashboardResolver.QUERIES
    },
    MUTATIONS: {
        ...dashboardResolver.MUTATIONS
    }
}
