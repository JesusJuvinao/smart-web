import { selector, DefaultValue } from 'recoil'
import { salesInvoice, lineItems, salesInvoiceRef, salesInvoiceDate, salesInvoiceDueDate, salesInvoiceNo } from '.'

export const salesInvoiceInfoState = selector({
    key: 'salesInfo',
    get: ({ get }) => {
        const Invoice = get(salesInvoice)
        return Invoice
    }
})
export const lineItemsInfoState = selector({
    key: 'lineItemsInfo',
    get: ({ get }) => {
        const Items = get(lineItems)
        return { Items }
    }
})

export const contactInfoState = selector({
    key: 'contactInfo',
    get: ({ get }) => {
        const salesRef = get(salesInvoiceRef)
        const invoiceDate = get(salesInvoiceDate)
        const invoiceDateDue = get(salesInvoiceDueDate)
        const InvoiceNo = get(salesInvoiceNo)
        return { salesRef, invoiceDate, invoiceDateDue, InvoiceNo }
    },
    set: ({ set }, value) => {
        if (value instanceof DefaultValue) {
            set(salesInvoiceRef, value)
            set(salesInvoiceDate, value)
            set(salesInvoiceDueDate, value)
            set(salesInvoiceNo, value)

            return
        }
        set(salesInvoiceRef, value.salesRef)
        set(salesInvoiceDate, value.invoiceDate)
        set(salesInvoiceDueDate, value.invoiceDueDate)
        set(salesInvoiceNo, value.InvoiceNo)
    }
})
