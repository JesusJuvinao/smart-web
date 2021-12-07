export const initialProductLine = {
    description: '',
    _id: '',
    idAccount: '',
    vat: '',
    idPro: '',
    quantity: '0.00',
    rate: '0.00'
}
export const initialInvoice = {
    logo: '',
    logoWidth: 100,
    title: 'INVOICE',
    companyName: '',
    name: '',
    companyAddress: '',
    companyAddress2: '',
    companyCountry: 'United States',
    billTo: 'Bill To:',
    clientName: '',
    clientAddress: '',
    clientAddress2: '',
    idAccount: 'United States',
    invoiceTitleLabel: 'Invoice#',
    invoiceTitle: '',
    invoiceDateLabel: 'Invoice Date',
    invoiceDate: '',
    invoiceDueDateLabel: 'Due Date',
    invoiceDueDate: '',
    productLineDescription: 'Item Description',
    productLineQuantity: 'Qty',
    productLineQuantityRate: 'Rate',
    productLineQuantityAmount: 'Amount',
    productLines: [
        {
            description: 'Brochure Design',
            quantity: '',
            rate: '100.00',
            _id: '',
            idPro: '',
            idAccount: '',
            vat: ''
        },
        (initialProductLine)
    ],
    subTotalLabel: 'Sub Total',
    taxLabel: 'Sale Tax (10%)',
    totalLabel: 'TOTAL',
    currency: '$',
    notesLabel: 'Notes',
    notes: 'It was great doing business with you.',
    termLabel: 'Terms & Conditions',
    term: 'Please make the payment by the due date.'
}
