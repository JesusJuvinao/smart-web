import React from 'react'
import withSession from '../apollo/session'
import { IndexC } from '../container/Home'

export default function Home() {
    return <IndexC />
}
export const getServerSideProps = withSession(async function ({ req }) {
    if (req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/dashboard', permanent: false } }
    return {
        props: {}
    }
})
