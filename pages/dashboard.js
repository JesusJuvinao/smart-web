import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { CompanyC } from '../container/dashboard'
import withSession from '../apollo/session'
import { Context } from '../context'
import { useUser } from '../container/Profile'

export default function Company () {
    const { setAlertBox, setCompanyLink, isCompany } = useContext(Context)
    const [dataUser] = useUser()
    return (<CompanyC setAlertBox={setAlertBox} setCompanyLink={setCompanyLink} isCompany={isCompany} dataUser={dataUser} />)
}

export const getServerSideProps = withSession(async function ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
    return {
        props: { }
    }
})

Company.propTypes = {
    id: PropTypes.string,
    setCompanyLink: PropTypes.func,
    isCompany: PropTypes.string
}
