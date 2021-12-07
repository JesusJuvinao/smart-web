import React from 'react'
import PropTypes from 'prop-types'
import withSession from '../../apollo/session'
import { Taxes } from '../../container/Taxes'

export default function taxes () {
    return (
        <Taxes />
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
taxes.propTypes = {
    id: PropTypes.string,
    setCompanyLink: PropTypes.func,
    isCompany: PropTypes.string
}
