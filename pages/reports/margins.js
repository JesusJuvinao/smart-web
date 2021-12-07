import React from 'react'
import { MarginsC } from '../../container/Reports/margins'

export default function Margins () {
    return <MarginsC />
}
export async function getServerSideProps ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) { return { redirect: { destination: '/login' } } }
    return {
        props: {}
    }
}
