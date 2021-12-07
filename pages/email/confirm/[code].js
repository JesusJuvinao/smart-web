import React from 'react'
import withSession from '../../../apollo/session'
import { EmailConfirm } from '../../../container/email'

export default function ConfirmCode () {
    return (<EmailConfirm />)
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
