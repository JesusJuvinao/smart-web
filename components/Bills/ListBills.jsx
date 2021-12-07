import React from 'react'
import currencyFormatter from 'currency-formatter'
import PropTypes from 'prop-types'
import { Table } from '../Table'
import { Button, Content, ContentTableItem, TableButton, Text } from './styled'
import { BGColor, SEGColor } from '../../public/colors'
import { dateFormat } from '../../utils'
import { Section } from '../Table/styled'
import { IconArrowRight } from '../../public/icons'
const ListBills = ({
  data,
  modal,
  setModal,
  handleDelete,
  HandleClickEdit,
  billSubTotal,
  setShowLateral,
  showLateral,
  DeleteAll,
  handleFileChange,
  Disable,
  handleMenu,
  isSettingModal

}) => {
  return (
        <div>
            <Table
                titles={[
                  { name: '#', width: '2%' },
                  { name: '', width: '9%' },
                  { name: 'Bill #No', width: '9%' },
                  { name: 'Supplier', width: '9%' },
                  { name: 'VatType', width: '9%' },
                  { name: 'DueDate', width: '9%' },
                  { name: 'InvoiceDate', width: '9%' },
                  { name: 'Currency', width: '9%' },
                  { name: 'Total', width: '9%' },
                  { name: 'Action', width: '9%' }
                ]}
                bgRow={2}
                pointer
                labelBtn='Bills'
                entryPerView
                buttonAdd={true}
                handleAdd={() => { isSettingModal(); DeleteAll() }}
                data={data?.filter(x => x.bDescription !== 0 && x)}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section columnWidth={titles} key={i}>
                    <Content>
                        <Text>{i + 1}</Text>
                    </Content>
                    <Content>
                        <Text><Button padding='5px' type='button' bgColor={SEGColor} onClick={(e) => { HandleClickEdit({ ...elem, view: 3 }); e.stopPropagation(); e.preventDefault() }} ><IconArrowRight color={BGColor} size={'14px'} /></Button></Text>
                    </Content>
                    <Content>
                        <Text> {elem.billNo}</Text>
                    </Content>
                    <Content>
                        <Text> {elem.idSupplier?.sName}</Text>
                    </Content>
                    <Content>
                        <Text> {elem.VatType}</Text>
                    </Content>
                    <Content>
                        <Text> {dateFormat(elem.bDueDate)}</Text>
                    </Content>
                    <Content>
                        <Text>{dateFormat(elem.bInvoiceDate)}</Text>
                    </Content>
                    <Content>
                        <Text> {elem.currencyBill}</Text>
                    </Content>
                    <Content>
                        <Text> {currencyFormatter.format(elem.billTotal, { code: elem.currencyBill })}</Text>
                    </Content>
                    <Content>
                        <ContentTableItem padding='0px' direction='row'>
                            <TableButton color={SEGColor} onClick={(e) => HandleClickEdit({ ...elem, view: 1 })}>
                                View
                            </TableButton>
                            <TableButton color={2} onClick={() => handleDelete({ _id: elem._id })}>
                                Delete
                            </TableButton>
                            <TableButton color={1} onClick={() => HandleClickEdit({ ...elem, view: 2 })}>
                                Edit
                            </TableButton>
                        </ContentTableItem>
                    </Content>
                </Section>)}
            />
        </div>
  )
}

ListBills.propTypes = {
  dataFiles: PropTypes.array,
  isSettingModal: PropTypes.bool,
  data: PropTypes.array,
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  setsize: PropTypes.number,
  handleDelete: PropTypes.func,
  HandleClickEdit: PropTypes.func,
  billSubTotal: PropTypes.number,
  setShowLateral: PropTypes.bool,
  showLateral: PropTypes.func,
  DeleteAll: PropTypes.func,
  handleFileChange: PropTypes.func,
  Disable: PropTypes.bool,
  handleMenu: PropTypes.func
}

export default ListBills
