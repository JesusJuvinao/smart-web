import React from 'react'
import { ClasesC } from '../../container/Clases'

export default function Clases () {
    return <ClasesC/>
}
export async function getServerSideProps ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) { return { redirect: { destination: '/login' } } }
    return {
        props: {}
    }
}
