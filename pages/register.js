import React from 'react'
import withSession from '../apollo/session'
import { RegisterUserC } from '../container/RegisterUser'

export default function Register () {
    return (<RegisterUserC />)
}
export const getServerSideProps = withSession(async function ({ req }) {
    if (req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/switch-options', permanent: false } }
    return {
        props: { }
    }
})
