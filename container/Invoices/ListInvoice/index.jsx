import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Table } from '../../../components/Table'
import { SEGColor } from '../../../public/colors'
import { Section } from '../../../components/Table/styled'
import { dateFormat } from '../../../utils'
import currencyFormatter from 'currency-formatter'
import { useQuery } from '@apollo/client'
import { GET_ALL_INVOICES } from '../queries'
import { Context } from '../../../context'
import { useUser } from '../../Profile'

export const ListInvoice = ({ setModal, modal }) => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  const [dataUser] = useUser()
  const { data } = useQuery(GET_ALL_INVOICES, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  return (
        <div>
            <Table
                titles={[
                  { name: '#', width: '2%' },
                  { name: '', width: '9%' },
                  { name: 'Bill #No', width: '9%' },
                  { name: 'Supplier', width: '9%' },
                  { name: 'DueDate', width: '9%' },
                  { name: 'InvoiceDate', width: '9%' },
                  { name: 'Currency', width: '9%' },
                  { name: 'Total', width: '9%' },
                  { name: 'Action', width: '9%' }
                ]}
                bgRow={2}
                pointer
                labelBtn='Sales'
                entryPerView
                buttonAdd={true}
                handleAdd={() => setModal(!modal)}
                data={data?.getAllSalesInvoices}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section columnWidth={titles} key={i}>
                    <div>
                        <span>{i + 1}</span>
                    </div>
                    <div>
                        <span> {elem.billNo}</span>
                    </div>
                    <div>
                        <span> {elem.idSupplier?.sName}</span>
                    </div>
                    <div>
                        <span> {elem.VatType}</span>
                    </div>
                    <div>
                        <span> {dateFormat(elem.bDueDate)}</span>
                    </div>
                    <div>
                        <span>{dateFormat(elem.bInvoiceDate)}</span>
                    </div>
                    <div>
                        <span> {elem.currencyBill}</span>
                    </div>
                    <div>
                        <span> {currencyFormatter.format(elem.billTotal, { code: elem.currencyBill })}</span>
                    </div>
                    <div>
                        <div padding='0px' direction='row'>
                            <button color={SEGColor} onClick={(e) => null({ ...elem, view: 1 })}>
                                View
                            </button>
                            <button color={2} onClick={() => null({ _id: elem._id })}>
                                Delete
                            </button>
                            <button color={1} onClick={() => null({ ...elem, view: 2 })}>
                                Edit
                            </button>
                        </div>
                    </div>
                </Section>)}
            />
        </div>
  )
}

ListInvoice.propTypes = {

}
