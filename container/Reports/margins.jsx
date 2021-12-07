import React, { useContext, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useUser } from '../Profile'
import { Margins } from '../../components/Reports/margins'
import { Context } from '../../context'
import { GET_ALL_BILL } from './queries'

export const MarginsC = props => {
    const { company } = useContext(Context)
    const [dataUser] = useUser()

    useEffect(() => getAllBillsDemo(), [company.idLasComp])

    const [getAllBillsDemo, { data: dataBill, loading: loadingBills }] =
        useLazyQuery(GET_ALL_BILL, {
            variables: {
                idComp: company.idLasComp
                    ? company.idLasComp
                    : dataUser?.lastCompany
            },
            fetchPolicy: navigator.onLine ? 'network-only' : 'cache-only'
        })
    return <Margins data={dataBill?.getAllBillsDemo} loading={loadingBills} />
}

MarginsC.propTypes = {}
