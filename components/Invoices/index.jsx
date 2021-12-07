/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import InputHooks from '../InputHooks/InputHooks'
import { RippleButton } from '../Ripple'
import { AwesomeModal } from '../AwesomeModal'
import { Skeleton } from '../Loading/skeleton'
import NewSelect from '../NewSelectHooks'
import { Container, Content, ContentTableItem, Form, Section, TableButton, Text, Card, InputNanoId, Button, ContentCode, ContentOptions, ContentAction, Textarea } from './styled'
import { Loading } from '../Loading'
import { nanoid } from 'nanoid'
import { PLColor, PVColor } from '../../public/colors'
import { IconDelete, IconPlus } from '../../public/icons'
import { numberFormat } from '../../utils'
import { InputTags } from '../InputTags'
export const Invoice = ({
  dataForm,
  dateNow,
  onChange,
  handleSubmit,
  onchangeFile,
  data,
  modal,
  setModal,
  datCurrency,
  handleUpdate,
  HandleClickEdit,
  loading,
  setId,
  handleAdd,
  invoice,
  handleRemove,
  handleChangeDemo,
  handleProductLineChange,
  calculateAmount,
  calcTaxTotal,
  setInvoice,
  saleTax,
  billSubTotal,
  // HERE
  formatCurrency,
  selectedTags,
  handleChangeEditable,
  dataSupplier,
  nId
}) => {
  return (
    <Container>
      {loading && <Loading />}
      <Content>
        <RippleButton widthButton='200px' standard onClick={() => setModal(!modal)}>
          Create Sales Invoice
        </RippleButton>
        <AwesomeModal show={modal} title='Bill' onHide={() => setModal(false)} onCancel={() => false} size='large' btnCancel={false} btnConfirm={false} header={true} footer={false} borderRadius='0' >
          <Form onSubmit={e => (handleSubmit(e))}>
            <Card>
              {/* <EditableInput pdfMode={false} size='35px' placeholder="Name Bill" value={invoice?.title} onChange={(value) => handleChangeEditable('title', value)} /> */}
              <NewSelect secOptionName={''} width='33.33%' search disabled={!dataSupplier} options={dataSupplier || []} id='_id' name='_id' value={dataForm?._id || ''} optionName='sName' onChange={onChange} padding='0px' title='Choose a Supplier' />
              <Card responsive>
                <ContentCode>
                  <Button type='button' onClick={() => setId(nanoid())}>#</Button>
                  <InputNanoId value={nId} />
                </ContentCode>
                <ContentCode>
                  <InputNanoId value={dateNow}/>
                </ContentCode>
                <InputHooks width='33.33%' title='bDueDate' required type={'date'} errors={dataForm?.bDueDate} value={dataForm?.bDueDate} onChange={onChange} name='bDueDate' />
              </Card>
              <Card responsive>
                <InputHooks width='33.33%' title='bAccount' required errors={dataForm?.bAccount} value={dataForm?.bAccount} onChange={onChange} name='bAccount' />
                <InputHooks width='33.33%' title='idClass' required errors={dataForm?.idClass} value={dataForm?.idClass} onChange={onChange} name='idClass' />
              </Card>
              <InputTags width='50%' selectedTags={selectedTags} />
              {invoice?.productLines?.map((productLine, i) => {
                return (
                  <Section key={i} n={7} >
                    <ContentTableItem> {i + 1} </ContentTableItem>
                    <ContentTableItem>
                      {/* <EditableInput placeholder="item" value={productLine.item} onChange={(value) => handleProductLineChange(i, 'item', value)} /> */}
                    </ContentTableItem>
                    <ContentTableItem>
                      {/* <EditableInput placeholder="Enter description" value={productLine.description} onChange={(value) => handleProductLineChange(i, 'description', value)} /> */}
                    </ContentTableItem>
                    <ContentTableItem>
                      {/* <EditableInput placeholder="Enter quantity" value={productLine.quantity} onChange={(value) => handleProductLineChange(i, 'quantity', value)} /> */}
                    </ContentTableItem>
                    <ContentTableItem>
                      {/* <EditableInput placeholder="Enter rate" value={productLine.rate} onChange={(value) => handleProductLineChange(i, 'rate', value)} /> */}
                    </ContentTableItem>
                    <ContentTableItem>
                      <Text size='17px'> {calculateAmount(productLine.quantity, productLine.rate)}</Text>
                    </ContentTableItem>
                    <ContentTableItem>
                      <Button type='button' design color='transparent' onClick={() => handleRemove(i)} >
                        <IconDelete size='30px' />
                      </Button>
                    </ContentTableItem>
                  </Section>
                )
              })}
              <ContentAction>
                <Button height='min-content' type='button' onClick={handleAdd}>
                  <span>Add Line Item</span>
                  <IconPlus size='20px' color={PVColor} />
                </Button>
                <Card content width='20%' >
                  <Text size='20px' margin='0' >Sub Total</Text>
                  <>
                    {billSubTotal ? numberFormat(billSubTotal) : '00'}
                  </>
                  <Text size='20px' >Total</Text>
                  <>
                    {billSubTotal + saleTax ? numberFormat(billSubTotal + saleTax) : '00'}
                  </>
                </Card>
              </ContentAction>
              <span>Memo</span>
                <Textarea onChange={onChange} value={dataForm?.bDescription} name='bDescription' id='bDescription' />
            </Card>
            {/* <Card content >
              <InputFilePrev onChange={onchangeFile} />
            </Card> */}
            <ContentOptions>
              <Button onClick={() => setModal(false)} color={PLColor} design >Cancel</Button>
              <Button design >Save</Button>
            </ContentOptions>
          </Form>
        </AwesomeModal>
        <Text margin='30px 0px 30px' size='20px'>Register Sales invoice</Text>
        <div>
          {data
            ? data?.map((x, i) =>
              <div key={i}>
                <Section n={9} >
                  <ContentTableItem>
                    <Text>{i + 1}</Text>
                  </ContentTableItem>
                  <ContentTableItem>
                    <Text>{x.bsupplierName}</Text>
                  </ContentTableItem>
                  <ContentTableItem>
                    <Text>{x.bAccount}</Text>
                  </ContentTableItem>
                  <ContentTableItem>
                    <Text >{x.bCurrency}</Text>
                  </ContentTableItem>
                  <ContentTableItem>
                    <Text>{x.bDescription}</Text>
                  </ContentTableItem>
                  <ContentTableItem>
                    <Text>{x.bDueDate}</Text>
                  </ContentTableItem>
                  <ContentTableItem>
                    <Text>{x.bInvoiceDate}</Text>
                  </ContentTableItem>
                  <ContentTableItem>
                    <Text>{x.bInvoiceRef}</Text>
                  </ContentTableItem>
                  <ContentTableItem padding='0px' direction='row'>
                    <TableButton color={2} onClick={() => handleUpdate({ ...x })}>
                      Delete
                    </TableButton>
                    <TableButton color={1} onClick={() => HandleClickEdit({ ...x })}>
                      Edit
                    </TableButton>
                  </ContentTableItem>
                </Section>
              </div>
            )
            : <Skeleton />}
        </div>
      </Content>
    </Container>
  )
}

Invoice.propTypes = {
  data: PropTypes.array
}
