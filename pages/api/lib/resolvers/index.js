import UserResolvers from './users'
import BillsResolvers from './Bill'
import adminResolver from './admin'
import SupplierResolvers from './Supplier'
import CompanyResolvers from './Company'
import dateTimeScalar from './CustomScalar'
import CurrencyResolvers from './Currency'
import CountriesResolvers from './Countries'
import DashboardResolvers from './Dashboard'
import SaleResolvers from './Saleinvoice'
import productsResolvers from './Products'
import CategoriesResolvers from './Categories'
import IvaResolvers from './Iva'
import accountResolver from './Account'
import uploadFileResolver from './Upload'
import detailResolver from './DetailSales'
import CommentsResolver from './Commets'
import taxedResolver from './Taxes'
import reportsResolver from './Reports'
import ClassResolver from './class'
import modulesResolver from './Modules'
import registerEmailsTemplateResolver from './TemplatesEmails'
import GraphQLUpload from 'graphql-upload'
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
export default {
    ...UserResolvers.TYPES,
    ...SupplierResolvers.TYPES,
    ...BillsResolvers.TYPES,
    ...modulesResolver.TYPES,
    ...CompanyResolvers.TYPES,
    ...CurrencyResolvers.TYPES,
    ...CountriesResolvers.TYPES,
    ...uploadFileResolver.TYPES,
    ...ClassResolver.TYPES,
    DateTime: dateTimeScalar,
    Upload: GraphQLUpload,
    Query: {
        ...reportsResolver.QUERIES,
        ...taxedResolver.QUERIES,
        ...ClassResolver.QUERIES,
        ...CommentsResolver.QUERIES,
        ...registerEmailsTemplateResolver.QUERIES,
        ...modulesResolver.QUERIES,
        ...detailResolver.QUERIES,
        ...accountResolver.QUERIES,
        ...uploadFileResolver.QUERIES,
        ...IvaResolvers.QUERIES,
        ...CategoriesResolvers.QUERIES,
        ...productsResolvers.QUERIES,
        ...UserResolvers.QUERIES,
        ...adminResolver.QUERIES,
        ...BillsResolvers.QUERIES,
        ...SupplierResolvers.QUERIES,
        ...CurrencyResolvers.QUERIES,
        ...CountriesResolvers.QUERIES,
        ...CompanyResolvers.QUERIES,
        ...DashboardResolvers.QUERIES,
        ...SaleResolvers.QUERIES
    },
    Subscription: {
        testEmit: {
            subscribe: () => pubsub.asyncIterator('testEmit')
        }
    },
    Mutation: {
        ...registerEmailsTemplateResolver.MUTATIONS,
        ...modulesResolver.MUTATIONS,
        ...taxedResolver.MUTATIONS,
        ...uploadFileResolver.MUTATIONS,
        ...accountResolver.MUTATIONS,
        ...IvaResolvers.MUTATIONS,
        ...reportsResolver.MUTATIONS,
        ...CategoriesResolvers.MUTATIONS,
        ...ClassResolver.MUTATIONS,
        ...productsResolvers.MUTATIONS,
        ...CurrencyResolvers.MUTATIONS,
        ...CountriesResolvers.MUTATIONS,
        ...adminResolver.MUTATIONS,
        ...UserResolvers.MUTATIONS,
        ...SupplierResolvers.MUTATIONS,
        ...BillsResolvers.MUTATIONS,
        ...CompanyResolvers.MUTATIONS,
        ...SaleResolvers.MUTATIONS
    }
}
