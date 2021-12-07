import { atom } from 'recoil'

export const salesInvoice = atom({
    key: 'Invoice',
    default: []
})

export const lineItems = atom({
    key: 'Items',
    default: []
})

export const salesInvoiceRef = atom({
    key: 'salesRef',
    default: ''
})

export const salesInvoiceDate = atom({
    key: 'invoiceDate',
    default: ''
})
export const salesInvoiceDueDate = atom({
    key: 'invoiceDateDueDate',
    default: ''
})
export const salesInvoiceNo = atom({
    key: 'InvoiceNo',
    default: ''
})
