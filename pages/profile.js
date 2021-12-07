// import { useQuery } from '@apollo/client'
import React from 'react'
import withSession from '../apollo/session'
import { ProfileC } from '../container/Profile'
// import { GET_AUT_ROLES } from '../container/Profile/queries'

export default function Profile () {
    // const { data } = useQuery(GET_AUT_ROLES)
    // Validate Route super admin
    // useEffect(() => {
    //   for (let i = 0; i < data?.getRoles?.length; i++) {
    //     if (data?.getRoles[i].name === 'admin') {
    //     }
    //   }
    // }, [data])
    return (<ProfileC />)
}

export const getServerSideProps = withSession(async function ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
    return {
        props: { }
    }
})
