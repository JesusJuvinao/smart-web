import React from 'react'
import { InvoiceC } from '../../container/Invoices'

export default function SalesInvoice () { return <InvoiceC /> }
export async function getServerSideProps ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login' } }
    return {
        props: { }
    }
}
