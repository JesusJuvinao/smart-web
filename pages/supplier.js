import React, { useContext } from 'react'
import { SupplierC } from '../container/Supplier'
import PropTypes from 'prop-types'
import withSession from '../apollo/session'
import { Context } from '../context'
import { useUser } from '../container/Profile'

export default function Supplier () {
    const { setAlertBox, setCompanyLink, isCompany, company } = useContext(Context)
    const [dataUser] = useUser()
    return (<SupplierC setAlertBox={setAlertBox} setCompanyLink={setCompanyLink} isCompany={isCompany} dataUser={dataUser} company={company} />)
}
export const getServerSideProps = withSession(async function ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
    return {
        props: { }
    }
})
Supplier.propTypes = {
    id: PropTypes.string,
    setCompanyLink: PropTypes.func,
    isCompany: PropTypes.string
}
