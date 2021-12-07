import { useContext } from 'react'
import PropTypes from 'prop-types'
import { Context } from 'context'
import { useRouter } from 'next/router'
import { decodeToken, getTokenState } from '@/utils/index'
import { useQuery } from '@apollo/client'
import { FIND_ONE_BILLS } from '../queries'
import { Container, Text } from './styled'


export const BillsAcceptInvoice = ({ idBills }) => {
    const { setAlertBox } = useContext(Context)
    // Validando token
    const data = decodeToken(idBills)
    const router = useRouter()
    const tokenState = getTokenState(idBills)
    if (tokenState?.needRefresh === true) {
      return <span>The link has expired</span>
    } else if (!tokenState?.valid) {
      return <span>The link is not valid</span>
    } else if (!tokenState) {
        return router.push('/bills')
    } else return <BillsEditEmployee data={data} />
}

BillsAcceptInvoice.propTypes = {

}
export const BillsEditEmployee = ({ data }) => {
    const { data: dataOneBill } = useQuery(FIND_ONE_BILLS, { variables: { id: data && data.idBill }, fetchPolicy: 'cache-and-network' })
    console.log(dataOneBill)
    return (
        <Container>
            <Text>Hello {data?.UserName}</Text>
        </Container>
    )
}
