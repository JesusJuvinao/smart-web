import React from 'react'
import withSession from '../../apollo/session'
import { PdfC } from '../../container/view-pdf'

export default function Pdf () {
    return (<PdfC />)
}
export const getServerSideProps = withSession(async function ({ req }) {
    const user = req?.session?.get('user')
    if (!user) {
    // res.next()
        return { props: {} }
    }
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login' } }

    return {
        props: {}
    }
}
)
