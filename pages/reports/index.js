import React from 'react'
import { ReportsC } from '../../container/Reports'

export default function Reports () {
    return <ReportsC />
}
export async function getServerSideProps ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) { return { redirect: { destination: '/login' } } }
    return {
        props: {}
    }
}
