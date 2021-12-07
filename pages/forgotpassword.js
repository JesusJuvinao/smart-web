import React from 'react'
import withSession from '../apollo/session'
import { ForgotPasswordC } from '../container/ForgotPassword'

export default function ForgotPassword () {
    return (
        <>
            <ForgotPasswordC />
        </>
    )
}

export const getServerSideProps = withSession(async function ({ req }) {
    if (req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/dashboard', permanent: false } }
    return {
        props: { }
    }
})
