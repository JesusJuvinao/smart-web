import registerEmailsTemplateResolver from './EmailsTemplates'

export default {
    TYPES: {
        ...registerEmailsTemplateResolver.TYPES
    },
    QUERIES: {
        ...registerEmailsTemplateResolver.QUERIES
    },
    MUTATIONS: {
        ...registerEmailsTemplateResolver.MUTATIONS
    }
}
