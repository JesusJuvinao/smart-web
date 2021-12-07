import React from 'react'
import { useRouter } from 'next/router'
import withSession from 'apollo/session'
import { BillsAcceptInvoice } from 'container/Bills/accept'

const clientAddInvoice = () => {
    const router = useRouter()
    const idBills = router.query.idBills
    return (<BillsAcceptInvoice idBills={idBills} />)
}

clientAddInvoice.propTypes = {

}

export default clientAddInvoice

export const getServerSideProps = withSession(async function ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
    return {
        props: {}
    }
})
