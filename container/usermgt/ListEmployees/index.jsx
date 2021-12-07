import { Table } from '@/components/Table'
import PropTypes from 'prop-types'
import { Section } from '@/components/Table/styled'
import { useQuery } from '@apollo/client'
import { ALL_COMPANIES_BY_USER } from 'container/Company/queries'
import { Container, Footer, Text, Card } from '../styled'

export const ListEmployee = ({ modal, setModal }) => {
    const { data: allCompany } = useQuery(ALL_COMPANIES_BY_USER, { fetchPolicy: 'network-only', variables: { search: '' } })
    const dataTeam = allCompany && allCompany?.getAllCompanyById?.map(x => { return { lineItemsTeam: x.lineItemsTeam } })
    const lineItemsTeam = dataTeam && dataTeam[0]?.lineItemsTeam
    return (
        <div>
            <Table
                titles={[
                    { name: '#', width: '6%' },
                    { name: 'NAME', width: '12%' },
                    { name: 'EMAIL', width: '12%' },
                    { name: 'USER TYPE', width: '12%' },
                    { name: 'STATUS', width: '12%' },
                    { name: 'DATE ADDED', width: '12%' },
                    { name: 'BILLABLE', width: '12%' },
                    { name: 'ACTION', width: '12%' }
                ]}
                bgRow={2}
                pointer
                labelBtn='user'
                entryPerView
                buttonAdd={true}
                handleAdd={() => setModal(!modal)}
                data={lineItemsTeam}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section columnWidth={titles} key={i}>
                    <div>
                        <Text>{i + 1}</Text>
                    </div>
                    <div>
                        <Text>{elem.IName}</Text>
                    </div>
                    <div>
                        <Text>{elem.uEmail}</Text>
                    </div>
                    <div>
                        <Text>{elem.authorization}</Text>
                    </div>
                    <div>
                        <Text>{elem.status ? 'ACTIVE' : 'INACTIVE'}</Text>
                    </div>
                    <div>
                        <Text>{elem.dateAdded}</Text>
                    </div>
                    <div>
                        <Text> No</Text>
                    </div>
                    <div>
                        Action
                    </div>
                </Section>)}
            />
        </div>
    )
}
ListEmployee.propTypes = {
    setModal: PropTypes.func,
    modal: PropTypes.bool
}