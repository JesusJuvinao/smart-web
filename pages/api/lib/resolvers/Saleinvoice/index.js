import saleInvoiceResolver from './saleInvoice'

export default {
    TYPES: {
        ...saleInvoiceResolver.TYPES
    },
    QUERIES: {
        ...saleInvoiceResolver.QUERIES
    },
    MUTATIONS: {
        ...saleInvoiceResolver.MUTATIONS
    }
}
