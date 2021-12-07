/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { initialInvoice, initialProductLine } from '../../components/common/data/dataInovice'
import PropTypes from 'prop-types'
import { Text } from '@react-pdf/renderer'
import styled, { css } from 'styled-components'
import { GET_ALL_ACCOUNT, GET_ALL_IVA } from '../graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { Context } from '../../context'
import { useUser } from '../Profile'
import NewSelect from '../../components/NewSelectHooks'
import { AwesomeModal } from '../../components/AwesomeModal'
import { useFormTools } from '../../components/hooks/useForm'
import { nanoid } from 'nanoid'
import { CalculateAmount, dateNow, numberFormat, updateCache } from '../../utils'
import currencyFormatter from 'currency-formatter'

import { CREATE_INVOICES, GET_ALL_INVOICES } from './queries'
import InputHooks from '../../components/InputHooks/InputHooks'
import { GET_ONE_CURRENCY, SUPPLIER_FOR_COMPANY } from '../Supplier/queries'
import { InputFiles } from '../../components/InputFilesPrev'
import { BColor, BGColor, EColor, PColor, SECColor, SEGColor, SFVColor } from '../../public/colors'
import { IconCancel, IconDelete, IconPlus } from '../../public/icons'
import { ListInvoice } from './ListInvoice'
import { GET_ALL_PRODUCT_BY_ID } from '../Products/queries'
import { DocumentPdf } from './Document'
import { ALL_CLASS_FOR_COMPANY } from '../Clases/queries'

export const InvoiceC = () => {
  const [modal, setModal] = useState(true)
  return (
    <React.Fragment>
      <List modal={modal} setModal={setModal} />
      <ListInvoice modal={modal} setModal={setModal} />
    </React.Fragment>
  )
}

export const List = ({ modal, setModal }) => {
  // STATES
  const { setAlertBox, handleMenu, company } = useContext(Context)
  const [dataUser] = useUser()
  const [invoice, setInvoice] = useState(initialInvoice)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const [files, setFiles] = useState([])
  const [total, setTotal] = useState(0)
  const [reset, setReset] = useState(false)
  const [isEdit, setIsEdit] = useState(true)
  // QUERIES
  const { data: dataProducts } = useQuery(GET_ALL_PRODUCT_BY_ID, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const { data: dataIva } = useQuery(GET_ALL_IVA, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const { data: dataOneSupplier } = useQuery(GET_ONE_CURRENCY, { variables: { id: dataForm && dataForm?._id }, fetchPolicy: 'cache-and-network' })
  const { data: dataSupplier } = useQuery(SUPPLIER_FOR_COMPANY, { variables: { idC: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const { data: dataClass } = useQuery(ALL_CLASS_FOR_COMPANY, { variables: { idComp: company.idLasComp ? company.idLasComp : null }, fetchPolicy: 'cache-and-network' })
  const [createSalesInvoicesMutation] = useMutation(CREATE_INVOICES, {
    onError: () => setAlertBox({ message: 'Se produjo un error' })
  })
  const { data: dataAccount } = useQuery(GET_ALL_ACCOUNT, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const pdfMode = false
  const Disable = false
  useEffect(() => {
    setDataValue({
      tax: 'INCLUSIVE',
      salesNo: Math.round(Math.random() * (99999 - 10000) + 10000),
      refCode: `${nanoid()}`,
      dateNow: `${dateNow}`,
      tags: []
    })
  }, [])
  const handleAdd = () => {
    const productLines = [...invoice?.productLines, { ...initialProductLine }, { ...initialProductLine }]
    setInvoice({ ...invoice, productLines })
  }
  const CleanLines = () => {
    setInvoice(initialInvoice)
  }
  console.log(invoice.productLines)
  const handleLineChange = (index, name, value) => {
    const productLines = invoice.productLines.map((salesLine, i) => {
      if (i === index) {
        const newProductLine = { ...salesLine }
        if (name === 'description' && '_id' && 'idAccount') {
          newProductLine[name] = value
        } else {
          newProductLine[name] = value
        }
        return newProductLine
      }
      return { ...salesLine }
    })
    setInvoice({ ...invoice, productLines })
  }
  // Calculate Total
  const calculateAmount = (quantity, rate) => {
    const data = CalculateAmount(quantity, rate)
    return data
  }
  // remove
  const handleRemove = (i) => {
    const productLines = invoice?.productLines?.filter((salesLine, index) => index !== i)
    setInvoice({ ...invoice, productLines })
  }
  // CAL SUBTOTAL
  const sumSubTotal = arr => arr && arr?.reduce((sum, { rate, quantity }) => sum + parseFloat(rate) * parseFloat(quantity), 0)
  const subtotal = sumSubTotal(invoice?.productLines)
  // const newData = invoice?.productLines?.map(x => ({ _id: x.id, lineItemsDescription: x.description, lineItemsQuantity: x.quantity ? parseFloat(x.quantity) : 0, lineItemsIdPro: x.idRef, lineItemsIdAccount: x.idAccount, lineItemsRate: x.rate ? parseFloat(x.rate) : 0, lineItemsIdClass: x.idClass, lineItemsIdVAT: x.idClass, lineItemsTotalVAT: 0, lineItemsSubTotal: (parseFloat(x.rate) * parseFloat(x.quantity)) ? (parseFloat(x.rate) * parseFloat(x.quantity)) : 0, setDataIva: [{ iPercentage: x.iPercentage }] }))
  // SUBMIT FUNC
  const handleForm = (e, show) => handleSubmit({
    event: e,
    action: () => {
      if (show === 1) {
        return createSalesInvoicesMutation({
          variables: {
            input: {
              idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany,
              idFiles: '6192d16229cd7c0f50d0a62c',
              idSupplier: dataForm._id, // listo
              bInvoiceDate: dateNow,
              salesNo: parseInt(dataForm.salesNo),
              currencySalesInvoices: dataOneSupplier?.getOneSuppliers?.sCurrency?.cName,
              salesTotal: 999999999,
              SalesSubtotal: subtotal,
              bDueDate: dataForm.bDueDate,
              bInvoiceRef: dataForm?.refCode,
              totalVAT: 12312321,
              bDescription: dataForm.SalesDescription,
              bVATCode: 'dataForm.salesNo',
              VatType: dataForm.tax,
              SalesInvoicesTotal: 12312321
            },
            //  Array
            inputLineItems: {
              setData: []
            },
            //  Array Tags
            setTagsInput: {
              setTags: []
            },
            setFilesInput: {
              idFiles: '',
              filesData: []
            }
          },
          update: (cache, { data: { getAllSalesInvoices } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES,
            nameFun: 'getAllSalesInvoices',
            dataNew: getAllSalesInvoices,
            type: 2

          })
        })
      } else if (show === 2) {
        console.log('')
      } else if (show === 3) {
        return null
      }
    },
    msgSuccess: '',
    actionAfterSuccess: () => {
      // setModal(!modal)
      // setDataValue({
      //   tax: 'INCLUSIVE',
      //   salesNo: Math.round(Math.random() * (99999 - 10000) + 10000),
      //   refCode: `${nanoid()}`,
      //   dateNow: `${dateNow}`
      // })
    }
  })
  const handleFileChange = async (paramFiles) => {
    setFiles(paramFiles)
  }
  const handleTag = e => {
    setTagValue({ ...tagValue, [e.target.name]: e.target.value })
  }
  const deleteSlot = useCallback(async (slot) => {
    const { id, key, type } = slot || {}
    setDataValue({
      ...dataForm,
      [type]: dataForm[type].filter(e => e.id !== id && e).map(x => (x[key[0]] === id ? { ...x, [key[1]]: 0 } : x))
    })
  }, [dataForm])
  const [tagValue, setTagValue] = useState({ tName: '' })
  const [modalPdf, setModalPdf] = useState(false)
  const addTag = (type, key, event) => {
    const { name } = event.target
    if (event.which === 13) {
      tagValue[name] !== '' && setDataValue({
        ...dataForm,
        [type]: [...dataForm?.[type], { [key]: dataForm?.[type]?.length, [name]: tagValue[name] }]
      })
      setTagValue({ tName: '' })
      event.preventDefault()
    }
  }
  const refBox = useRef()
  return (
    <div>
      <div>
        <AwesomeModal useScroll={true} backdrop='static' height='100vh' padding='30px' show={!!modal} hideOnConfirm={false} title={` Invoice ${dataForm?.refCode} `} onHide={() => { setModal(!modal) }} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
          <ContentModal>
            <WrapPdf>
              <AwesomeModal zIndex={'9999'} height='100vh' show={modalPdf} hideOnConfirm={false} title={` Generate Pdf ${dataForm?.refCode} `} onHide={() => setModalPdf(!modalPdf)} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <ContentModal>
                  <ContentPdf>
                    <DocumentPdf
                      setInvoice={setInvoice}
                      handleMenu={handleMenu}
                      handleAdd={handleAdd}
                      handleRemove={handleRemove}
                      calculateAmount={calculateAmount}
                      dataProducts={dataProducts}
                      dataIva={dataIva}
                      dataAccount={dataAccount}
                      dataClass={dataClass}
                      handleLineChange={handleLineChange}
                      invoice={invoice}
                      errorForm={errorForm}
                      dataForm={dataForm}
                      isEdit={isEdit}
                      Disable={Disable}
                      CleanLines={CleanLines}
                      handleChange={handleChange}
                    />
                  </ContentPdf>
                </ContentModal>
              </AwesomeModal>
            </WrapPdf>
            <Card justify='space-between'>
              <Card>
                <NewSelect action top='88%' icon title='Choose a supplier.' width='30%' secOptionName={''} error={errorForm?._id} required search disabled={Disable} options={dataSupplier?.getSuppliersForCompany || []} id='_id' name='_id' value={dataForm?._id || ''} optionName={['sName']} onChange={handleChange} onClick={(x) => handleMenu(1)} />
                <InputHooks title='Sales ref.' width='15%' required error={errorForm?.refCode} value={dataForm?.refCode} disabled={Disable || isEdit} onChange={handleChange} name='refCode' />
                <InputHooks title='Current date.' width='10%' type='date' required disabled={Disable || isEdit} error={errorForm?.dateNow} value={dataForm?.dateNow} onChange={handleChange} name='dateNow' />
                <InputHooks title='Due date.' width='10%' required type='date' error={errorForm?.bDueDate} disabled={Disable} value={dataForm?.bDueDate} onChange={handleChange} name='bDueDate' />
                <InputHooks title='Sales no.' width='10%' required error={errorForm?.salesNo} disabled={Disable || isEdit} value={dataForm?.salesNo} onChange={handleChange} numeric name='salesNo' range={{ min: 0, max: 50 }} />
              </Card>
              <Texto font='PFont-Medium' size='17px' ><span style={{ fontSize: '10px' }}>Currency</span> {dataOneSupplier?.getOneSuppliers?.sCurrency?.cName ? dataOneSupplier?.getOneSuppliers?.sCurrency?.cName : 'USD'}</Texto>
              <Button width='120px' border='1px solid' height='30px' type='button' onClick={() => setModalPdf(!modalPdf)}>
                Open Pdf
              </Button>
            </Card>
            <Card justify='space-between'>
              <Box width="30%" onClick={() => refBox.current.focus()}>
                <InputTag>
                  {dataForm?.tags?.map((tag, index) => (
                    <Tags key={index.id}>
                      <Texto size='10px'>{tag.tName}</Texto>
                      <button type='button' onClick={() => deleteSlot({ id: tag.id, type: 'tags', key: ['id'], Delete: !!isEdit.state })}><IconCancel size='7px' /></button>
                    </Tags>
                  ))}
                  <InputText ref={refBox} onKeyPress={e => addTag('tags', 'id', e)} type="text" name="tName" value={tagValue?.tName || ''} placeholder="Add tags" onChange={handleTag} />
                </InputTag>
              </Box>
              <Select border='1px solid' width='min-content' disabled={Disable} onChange={handleChange} name='tax' id='tax'>
                <option value='INCLUSIVE' selected={dataForm.tax === 'INCLUSIVE'} > Inclusive of VAT</option>
                <option value='EXCLUSIVE' selected={dataForm.tax === 'EXCLUSIVE'}>Exclusive of VAT</option>
                <option value='NO_VAT' selected={dataForm.tax === 'NO_VAT'}>No VAT</option>
              </Select>
            </Card>
            <ContainerListItem>
              <form onSubmit={(e) => (handleForm(e, 1))}>
                <CustomTable>
                  <table>
                    <tr >
                      <th>#</th>
                      <th>Account</th>
                      <th>Vat</th>
                      <th>Products</th>
                      <th>Class</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Sub Total</th>
                      <th>Total Vat</th>
                      <th></th>
                    </tr>
                    {invoice && invoice?.productLines?.map((salesLine, i) => {
                      return pdfMode && salesLine.description === ''
                        ? (<span key={i}></span>)
                        : (
                          <tr key={i} className="row flex" pdfMode={pdfMode}>
                            <td>
                              {i + 1}
                            </td>
                            <td>
                              <InputSelect
                                options={dataAccount?.getAllAccount || []}
                                value={salesLine.idAccount}
                                onChange={(value) => handleLineChange(i, 'idAccount', value)}
                                onClick={() => handleMenu(3)}
                                border='none'
                                heightBody='35px'
                                id='idAccount'
                                name='idAccount'
                                search
                                required
                                pdfMode={pdfMode}
                                show={false}
                                action
                                error={invoice?.quantity}
                                minWidth='115px'
                                optionName={['aName', 'aType']}
                              />
                            </td>
                            <td>
                              <InputSelect
                                options={dataIva?.getAllIva || []}
                                value={invoice._id}
                                onChange={(value) => handleLineChange(i, 'vat', value)}
                                pdfMode={pdfMode}
                                onClick={() => handleMenu(2)}
                                border='none'
                                heightBody='35px'
                                required action
                                minWidth='115px'
                                disabled={!dataAccount || Disable}
                                search
                                name='vat'
                                sideLabel='%'
                                optionName={['IName', 'iPercentage']}
                              />
                            </td>
                            <td>
                              <InputSelect
                                options={dataProducts?.getProductsForCompany || []}
                                value={invoice._id}
                                onChange={(value) => handleLineChange(i, 'idPro', value)}
                                onClick={() => handleMenu(4)}
                                border='none'
                                heightBody='35px'
                                required action
                                minWidth='115px'
                                disabled={!dataAccount || Disable}
                                search
                                name='idPro'
                                optionName={['pName']}
                              />
                            </td>
                            <td>
                              <InputSelect
                                options={dataClass?.getClass || []}
                                value={invoice._id}
                                onChange={(value) => handleLineChange(i, 'idPro', value)}
                                onClick={() => handleMenu(3)}
                                border='none'
                                heightBody='35px'
                                required action
                                minWidth='115px'
                                disabled={!dataAccount || Disable}
                                search
                                name='idPro'
                                optionName={['className']}
                              />
                            </td>
                            <td>
                              <Input
                                value={salesLine.description}
                                onChange={(value) => handleLineChange(i, 'description', value)}
                                pdfMode={pdfMode}
                              />
                            </td>
                            <td>
                              <Input
                                value={salesLine.quantity}
                                onChange={(value) => handleLineChange(i, 'quantity', value)}
                                pdfMode={pdfMode}
                              />
                            </td>
                            <td>
                              <Input
                                value={salesLine.rate}
                                name={'rate'}
                                onChange={(value) => handleLineChange(i, 'rate', value)}
                                pdfMode={pdfMode}
                              />
                            </td>
                            <td>
                              <Texto size='12px'>
                                {calculateAmount(salesLine.quantity, salesLine.rate)}
                              </Texto>
                            </td>
                            <td>
                              <Texto size='12px'>
                                {calculateAmount(salesLine.quantity, salesLine.rate)}
                              </Texto>
                            </td>
                            <td>
                              {!pdfMode && (
                                <Button type="button" onClick={() => handleRemove(i)} >
                                  <IconDelete size='25px' color={Disable ? SFVColor : EColor} />
                                </Button>
                              )}
                            </td>
                          </tr>
                          )
                    })}
                  </table>
                </CustomTable>
                <FooterModal>
                  <Button type='button' className="link" onClick={handleAdd}>
                    <span className="icon icon-add bg-green mr-10"></span>
                    Add Line Item
                  </Button>
                  <Button type='submit' className="link">
                    <span className="icon icon-add bg-green mr-10"></span>
                    Save
                  </Button>
                </FooterModal>
              </form>

            </ContainerListItem>
            <Card justify='space-between' margin='10px 0 0 0' width='100%'>
              <Card>
                <Button height='30px' width='135px' border='1px solid #8d9096' type='button' className="link" onClick={handleAdd}>
                  Add Line Item
                </Button>
                <Button height='30px' width='135px' border='1px solid #8d9096' type='button' className="link" onClick={CleanLines}>
                  Clean lines
                </Button>
              </Card>
              <Card width='min-content'>
                <Texto font='PFont-Medium' size='17px'>Sub Total </Texto>  &nbsp; &nbsp; <Texto font='PFont-Medium' size='17px'> {currencyFormatter.format(numberFormat(subtotal), { code: dataOneSupplier?.getOneSuppliers?.sCurrency?.cName ? dataOneSupplier?.getOneSuppliers?.sCurrency?.cName : 'USD' })} </Texto>
              </Card>
            </Card>
            <Card margin='10px 0 0 0' height='89px' width="300px" border='1px solid #BABEC5'>
              <InputHooks border='none' disabled={Disable} value={dataForm?.SalesDescription} name='SalesDescription' TypeTextarea required={true} title='Memo' minWidth='100%' onChange={handleChange} />
            </Card>
            <Card margin='30px 0 0 0' width='50%'>
              <InputFiles Disable={Disable} onChange={handleFileChange} reset={reset} MaximumSizeFiles={20971520} ShowMessage={'25M'} />
            </Card>
          </ContentModal>
        </AwesomeModal>
      </div>
    </div>
  )
}

export const Input = ({ className, placeholder, value, onChange, pdfMode, width }) => {
  return (
    <>
      {pdfMode
        ? <Text>{value}</Text>
        : <InputCustom
          type="text"
          width={width}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />}
    </>
  )
}
export const InputSelect = ({ className, placeholder, value, onChange, show, pdfMode, width, options, optionName, accessor, search, action, onClick, sideLabel }) => {
  const [valueInput, setValueInput] = useState()
  const [newOption, setNewOption] = useState(false)
  const [select, setSelect] = useState(false)
  const renderVal = data => {
    if (!data) return ''
    if (Array.isArray(optionName)) {
      let valueRender = ''
      optionName.forEach(x => valueRender = `${valueRender} ${(accessor && data[accessor]) ? data[accessor][x] : data[x]}`)
      return valueRender
    } else return data[optionName]
  }
  // Search
  const changeSearch = v => {
    setValueInput(v.target.value)
    const fil = options.filter(x => renderVal(x).toUpperCase().indexOf(v.target.value.toUpperCase()) > -1)
    setNewOption(fil)
  }
  const handleClickAction = () => {
    setSelect(!select)
    onClick()
  }
  useEffect(() => {
    setNewOption(options)
  }, [options])
  const [isEditing, setIsEditing] = useState(false)
  console.log(newOption)
  // const nameValue = ()=> {
  //   const data = newOption.find()
  // }
  return (
    <>
      {pdfMode
        ? (
          <Text>{value}</Text>
          )
        : (
          <>
            {isEditing
              ? (
                <BoxSelect>
                  <Select
                   onBlur={() => show && setIsEditing(false)}
                   autoFocus={true}
                   value={value} onChange={onChange ? (e) => onChange(e.target.value) : undefined} 
                   >
                    <option value="" selected hidden></option>
                    {newOption && newOption?.map((x) => (
                      <option key={x._id} value={x._id}>
                        {renderVal(x)}{x && sideLabel}
                      </option>
                    ))}
                  </Select>
                  {action && <ButtonAction type='button' onClick={() => handleClickAction() || undefined}><IconPlus color={PColor} size='15px' /> {<>{!newOption.length && valueInput}</>}</ButtonAction>}
                </BoxSelect>
                )
              : (
                 <BoxSelect>
                  <Select
                   onBlur={() => show && setIsEditing(false)}
                   autoFocus={true}
                   value={value} onChange={onChange ? (e) => onChange(e.target.value) : undefined} 
                   >
                    <option value="" selected hidden></option>
                    {newOption && newOption?.map((x) => (
                      <option key={x._id} value={x._id}>
                        {renderVal(x)}{x && sideLabel}
                      </option>
                    ))}
                  </Select>
                  {action && <ButtonAction type='button' onClick={() => handleClickAction() || undefined}><IconPlus color={PColor} size='15px' /> {<>{!newOption.length && valueInput}</>}</ButtonAction>}
                </BoxSelect>
                )}
          </>
          )}
    </>
  )
}
const ButtonAction = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    text-align: left;
    height: 25px;
    min-height: 25px;
    max-height: 25px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: PFont-Light;
    width: 25px;
    font-size: 16px;
    line-height: 20px;
    color: rgb(57, 58, 61);
    background-color: rgb(212, 215, 220);
    &:hover {
      background-color: rgb(44, 160, 28);
      color: ${BGColor};
    }
    &:hover > svg {
      fill: ${BGColor};
    }
`
const InputTag = styled.div`
    display: flex;
    padding: 5px;
    flex-wrap: wrap; 
    line-height: 20px;
    flex-direction: row;
    cursor: text;
    align-items: center;
    ${({ maxHeight }) => maxHeight && css`max-height: ${maxHeight};`}


`
const WrapPdf = styled.div`

`
const Tags = styled.div`
  border: .5px solid ${`${SEGColor}69`};
  color: ${SEGColor};
  display: flex;
  place-content: center;
  margin: 0px 2px;
  padding: 0px 2px;
  border-radius: 10px;
  width: fit-content;
  justify-content: center;
  vertical-align: middle;
  align-items: center; 

`
export const Box = styled.div`
    display: block;
    width: ${({ width }) => width || '100%'};
    flex-direction: ${({ direction }) => direction || 'row'};
    position: relative;
    box-sizing: border-box;
    margin: 10px 5px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    ${props => props.block && css`
        background-color: ${SFVColor};
        cursor: no-drop;
    `}
 
`
const ContentPdf = styled.div`
   position: relative;
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 21cm;
    padding: 1.5cm;
    width: 100%;
    margin: 1cm auto;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`
const ContentModal = styled.div`
    padding: 20px;
    transition: all 200ms ease-in-out;
    padding-bottom: 200px;
    background-color: #fff;
    align-self: center;
    width: 100%;
    max-height: 100vh;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    position: relative;
    ${({ width }) => width
    ? css`
                  width: 80%;
                  `
    : css`
                
                width: 100%;
              `}

`
const BoxSelect = styled.div`
    display: flex;
    place-content: center;
    justify-content: center;
    width: 100%;
    min-width: 115px;
    min-height: 35px;
    align-items: center;
    position: relative;
    display: flex;
`

export const Select = styled.select`
  width: ${({ width }) => width || '100%'};
  border: ${({ border }) => border || 'none'};
  height: 330px;
  min-height: 30px;
  max-height: 30px;
  font-size: 11px;
  color: ${BColor};
  outline: none;
  option {
    color: ${BColor};
    position: fixed;
  } 
  &:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
  }
`
export const Button = styled.button`
    flex-direction: row;
    position: relative;
    width: ${({ width }) => width || 'auto'};
    padding: ${({ padding }) => padding || '5px'};
    display: ${({ display }) => display || 'flex'};
    cursor: pointer;
    border-radius: ${({ radius }) => radius || '30px'};
    border: ${({ border }) => border || 'none'};
    font-size: 16px;
    justify-content: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    height: min-content;
    width: ${({ width }) => width || 'auto'};
    background-color: ${BGColor};
    &:disabled {
        cursor: no-drop;
    }
    .link:hover {
        text-decoration: underline;
    }
`
const InputText = styled.input`
    border: none;
    box-shadow: none;
    outline: none;
    background-color: transparent;
    padding: 0 2px;
    width: fit-content;
    max-width: inherit;
    display: inline-block;
    max-height: 20px;
    font-size: 12px;
    &:disabled {
      cursor: no-drop;
      background-color: ${SFVColor};
    }
`
export const FooterModal = styled.div`
    width: 100%;
    height: 40px;
    right: 0;
    background-color: ${SECColor};
    bottom: -1px;
    z-index: 999;
    display: flex;
    align-items: center;
    position: ${({ position }) => position || 'fixed'};
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`
const InputCustom = styled.input`
  padding: 10px;
  outline: none;
  font-size: 11px;
  border: none;
  width: ${({ width }) => width || '100%'};
`
const Card = styled.div`
  display: ${({ display }) => display || 'flex'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
  height: ${({ height }) => height || 'auto'};
  width: ${({ width }) => width || '100%'};
  border: ${({ border }) => border || 'none'};
`
const Texto = styled.span`
    font-size: ${({ size }) => size || '12px'};
    font-family: ${({ font }) => font || 'PFont-Regular'};
`
const ContainerListItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => width || '100%'};
        max-height: 100%;
        @media (max-width: 1199px) {
        overflow-y: scroll;
        position: relative;
    }  
`
export const CustomTable = styled.div`
        min-height: auto;
        margin-bottom: 200px;
        table{
            margin-bottom: 200px;
        }
    && {
        thead {
            padding: 10px;
        }
        thead th {
            padding: 0px;
            margin: 0px;
            font-size: 13px;
            font-family: PFont-Regular;
        }
        th,
        td {
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            width: -webkit-fill-available;
            border-collapse: collapse;
            letter-spacing: 1px;
            border-left: 1px dotted #c7c7c7;
            border-right: 1px dotted #c7c7c7;
        }
        th,
        td,
        th {
            text-align: center;
            max-width: 100px;
        }
        th:first-child {
            width: 20px;
            max-width: 20px;
            min-width: 20px;
        }
        td:last-child {
            text-align: center;
        }
        table {
            width: 100%;
        }
    }
    
    /* tr:nth-of-type(odd) {
      background-color: #efefef;
    } */
    `
InputSelect.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  optionName: PropTypes.string,
  width: PropTypes.string,
  options: PropTypes.array,
  accessor: PropTypes.array,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  pdfMode: PropTypes.bool
}

Input.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  pdfMode: PropTypes.bool
}
List.propTypes = {
  setModal: PropTypes.func,
  modal: PropTypes.bool
}
