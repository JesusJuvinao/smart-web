import React, { useContext } from 'react'
import withSession from '../apollo/session'
import { LoginC } from '../container/Login'
import { Context } from '../context'

export default function Login() {
    const { setAlertBox } = useContext(Context)
    return (<LoginC setAlertBox={setAlertBox} />
    )
}

export const getServerSideProps = withSession(async function ({ req }) {
    if (req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
    return {
        props: {}
    }
})
