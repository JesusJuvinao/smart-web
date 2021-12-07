import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const SalesInvoices = new mongoose.Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        idComp: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Company'
        },
        idSupplier: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Suppliers'
        },
        idFiles: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'FileUploadSchema'
        },
        salesNo: {
            type: Number,
            required: true,
            trim: true
        },
        currencySalesInvoices: {
            type: String,
            required: true,
            trim: true
        },
        VatType: {
            type: String,
            required: true,
            enum: ['INCLUSIVE', 'EXCLUSIVE', 'NO_VAT']
        },
        billStatusPayment: {
            type: String,
            required: false,
            enum: ['PAID', 'NO_PAID']
        },
        datePayment: {
            type: Date,
            required: false
        },
        lineItems: [{
            lineItemsDescription: String,
            lineItemsQuantity: Number,
            lineItemsRate: Number,
            lineItemsTotalVAT: Number,
            lineItemsSubTotal: Number,
            iva: [{
                IName: String,
                iPercentage: Number
            }],
            lineItemsIdVAT: {
                type: Schema.Types.ObjectId,
                required: false,
                ref: 'IvaSchema'
            },
            lineItemsIdClass: {
                type: Schema.Types.ObjectId,
                required: false,
                ref: 'Class'
            },
            lineItemsIdPro: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Products'
            },
            lineItemsIdAccount: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Account'
            }
        }],
        tags: [{
            TName: String
        }],
        bInvoiceDate: {
            type: Date,
            required: true,
            trim: true
        },
        bDueDate: {
            type: String,
            required: true,
            trim: true
        },
        bInvoiceRef: {
            type: String,
            required: true
        },
        bDescription: {
            type: String,
            required: false
        },
        SalesSubtotal: {
            type: Number,
            required: true
        },
        salesTotal: {
            type: Number,
            required: true
        },
        totalVAT: {
            type: Number,
            required: false
        }
    },
    { timestamps: true }
)

module.exports =
    mongoose.models.sales || mongoose.model('sales', SalesInvoices)
