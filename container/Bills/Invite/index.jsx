import { useContext, useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { useUser } from 'container/Profile'
import { Context } from 'context'
import { FIND_ONE_BILLS, GET_ALL_BILL, INVITE_EMPLOYEE_TO_ACCESS_BILL } from '../queries'
import { Loading } from '@/components/Loading'
import { AwesomeModal } from '@/components/AwesomeModal'
import { Container, WrapperCard, Text, Span, Block, Figure, Button, HeroTitle, Content } from './styled'
import { useFormTools } from '@/components/hooks/useForm'
import { ALL_COMPANIES_BY_USER } from 'container/Company/queries'
import NewSelect from '@/components/NewSelectHooks'
import { SpinnerColorJust } from '@/components/Loading'
import { RippleButton } from '@/components/Ripple'
import { SCColor } from '@/public/colors'
import { updateCacheMod } from '@/utils/index'

export const InviteEmployeeC = () => {
    const [dataUser] = useUser()
    const [modal, setModal] = useState(false)
    const [iBills, setBills] = useState('')
    const { setAlertBox, handleMenu, menu, company } = useContext(Context)
    const { data, loading } = useQuery(GET_ALL_BILL, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: navigator.onLine ? 'network-only' : 'cache-only' })
    // if (loading) return <Loading />
    return (

        <Container>
            <HeroTitle>Invite a Employee Bills</HeroTitle>
            <Content>
                {data ? data.getAllBill.map(x => (<WrapperCard key={x._id}>
                    <div>
                        <Block>
                            <Text size='.6rem' margin='0'>PAYMENT STATUS:</Text>
                            <Text margin='0' size='1rem'> NO PAID </Text>
                        </Block>
                        <Text size='13px'><Span size='13px'>Bill No:  &nbsp; &nbsp; </Span>{x.billNo}</Text>
                        <Text size='13px'><Span size='13px'>Currency: &nbsp; &nbsp;
                        </Span>{x.currencyBill}</Text>
                        <Button onClick={() => { setModal(!modal); setBills(x._id) }}  >Invite to edit</Button>
                    </div>
                    <Figure />
                </WrapperCard>))
                    : <Text>No data</Text>}
                {/* ModalInviteEmployeeToBills */}
                <InviteEmployeeBills setModal={setModal} modal={modal} iBills={iBills} />
            </Content>
        </Container>

    )
}

InviteEmployeeC.propTypes = {

}

export const InviteEmployeeBills = ({ modal, setModal, iBills }) => {
    // STATE
    const { company, setAlertBox } = useContext(Context)
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
    const { data: allCompany } = useQuery(ALL_COMPANIES_BY_USER, { fetchPolicy: 'network-only', variables: { search: '' } })
    const dataTeam = allCompany && allCompany?.getAllCompanyById?.map(x => { return { lineItemsTeam: x.lineItemsTeam } })
    // QUERIES
    const [setAccessBills, { loading, error, }] = useMutation(INVITE_EMPLOYEE_TO_ACCESS_BILL, {
        onCompleted: (data) => setAlertBox({ message: `${data?.setAccessBills?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
    })
    const { data: dataOneBill } = useQuery(FIND_ONE_BILLS, { variables: { id: iBills }, fetchPolicy: 'cache-and-network' })
    const getDataOneBill = dataOneBill?.getOneBillById
    const lineItemsTeam = dataTeam && dataTeam[0]?.lineItemsTeam
    // HANDLESS
    const uEmailEmployee = dataForm.uEmail
    const handleForm = (e) => handleSubmit({
        event: e,
        action: () => setAccessBills({
            variables: {
                idBill: iBills,
                idUserEmployee: '',
                typeAccess: '',
                idComp: company.idLasComp && company.idLasComp,
                uEmailEmployee: uEmailEmployee

            },
            update: (cache, { data: { getAllCompany } }) => updateCacheMod({
                cache,
                query: ALL_COMPANIES_BY_USER,
                nameFun: 'getAllCompanyById',
                dataNew: getAllCompany
            })
        }),
        actionAfterSuccess: () => {
            setDataValue({})
        }
    })
    return (
        <div>
            <AwesomeModal show={modal} padding='1rem' height='100vh' title='Bill' onHide={() => setModal(false)} onCancel={() => false} size='large' btnCancel={false} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <WrapperCard height='120px'>
                    <div>
                        <Block>
                            <Text size='.6rem' margin='0'>PAYMENT STATUS:</Text>
                            <Text margin='0' size='1rem'> NO PAID </Text>
                        </Block>
                        <Text size='13px'><Span size='13px'>Bill No:  &nbsp; &nbsp; </Span>{getDataOneBill?.billNo}</Text>
                        <Text size='13px'><Span size='13px'>Currency: &nbsp; &nbsp;
                        </Span>{getDataOneBill?.currencyBill}</Text>
                    </div>
                    <Figure style={{ right: '-60px' }} />
                </WrapperCard>
                <div style={{ marginTop: '30px' }}>
                    <form onSubmit={(e) => (handleForm(e))}>
                        <NewSelect title='Choose a Employee.' width='20%' error={errorForm?.uEmail} required search options={lineItemsTeam || []} id='uEmail' name='uEmail' value={dataForm?.uEmail || ''} optionName={['Username', 'uEmail']} onChange={handleChange} />
                        <RippleButton bgColor={SCColor} margin='20px 0px' type='submit'>{loading ? <SpinnerColorJust /> : 'Send Email'}</RippleButton>
                    </form>
                </div>
            </AwesomeModal>
        </div>
    )
}
