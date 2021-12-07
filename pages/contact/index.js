import React from 'react'
// import withSession from '../apollo/session'
import { ContactC } from '../../container/Contact/index'

export default function Home () {
    return (
        <>
            <ContactC />
        </>
    )
}
// export const getServerSideProps = withSession(async function ({ req, res }) {
//     if (req.cookies[process.env.SESSION_NAME])
//         return { redirect: { destination: '/dashboard', permanent: false } }
//     return {
//         props: {}
//     }
// })
