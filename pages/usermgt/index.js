import React, { useState } from 'react'
import { ListEmployee } from 'container/usermgt/ListEmployees'
import { AddEmployee } from 'container/usermgt/AddEmployees'
import withSession from '../../apollo/session'

export default function UserMgt () {
    const [modal, setModal] = useState(true)
    return (
        <>
            <ListEmployee modal={modal} setModal={setModal} />
            <AddEmployee modal={modal} setModal={setModal} />
        </>
    )
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
