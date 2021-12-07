import React from 'react'
import withSession from '../apollo/session'
import { ProductsC } from '../container/Products'

export default function Bills () {
    return <ProductsC />
}

export const getServerSideProps = withSession(async function ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
    return {
        props: { }
    }
})
