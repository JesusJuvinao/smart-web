import React from 'react'
import currencyFormatter from 'currency-formatter'
import PropTypes from 'prop-types'
import { BtnMore, Button, ContentList, CustomTable, Td, Text } from './styled'
import { SEGColor, SFVColor, PColor, EColor } from '../../public/colors'
import { CalculateAmount, numberFormat } from '../../utils'
import { AddPlusCircle, IconDelete, IconDrag } from '../../public/icons'
import NewSelect from '../NewSelectHooks'
import InputHooks from '../InputHooks/InputHooks'
const ListBillsLateral = ({
  data,
  modal,
  deleteSlot,
  setModal,
  filterLineItems,
  dataAccount,
  dispatch,
  state,
  handleDelete,
  dataForm,
  HandleClickEdit,
  onChange,
  billSubTotal,
  setShowLateral,
  dataIva,
  addMore,
  dataClass,
  setShow,
  calculateIva,
  showLateral,
  isEdit,
  DeleteAll,
  handleFileChange,
  show,
  Disable,
  dataProducts,
  dataOneSupplier,
  handleMenu
}) => {
  return (
    <div>
      <ContentList>
        <CustomTable>
          <table>
            <tr >
              <th></th>
              <th>#</th>
              <th>Account</th>
              {dataForm.tax !== 'NO_VAT' && <th>VAT</th>}
              <th>Description</th>
              <th>Products</th>
              <th>Class</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Sub Total</th>
              {dataForm.tax !== 'NO_VAT' && <th>Total VAT</th>}
              <th></th>
            </tr>
            {dataForm && filterLineItems?.map((x, i) => {
              return (
                <tr key={x.id} onClick={() => {
                  dispatch({ type: 'select', payload: i })
                }}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: i === state.selectedIndex ? `${SFVColor}2e` : 'transparent'
                  }}
                  aria-pressed={i === state.selectedIndex}
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      dispatch({ type: 'select', payload: i })
                      e.target.blur()
                    }
                  }}>
                  <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><BtnMore show={show === i} type='button' onClick={() => !Disable && addMore('items', 'id')}><AddPlusCircle color={PColor} size='30px' /></BtnMore><IconDrag color={`${SEGColor}80`} size='20px' /></Td>
                  <Td show={show === i} onClick={() => setShow(i === show ? false : i)}>{i + 1}</Td>
                  <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><NewSelect border='none' error={x.errorForm?.idAccount} heightBody='35px' required action width='100%' minWidth='115px' disabled={!dataAccount || Disable} search options={dataAccount || []} id='idAccount' name='idAccount' value={x?.idAccount} optionName='aName' onChange={(e, error) => onChange(e, error, { type: 'items', id: x.id })} secOptionName={'aType'} onClick={(x) => handleMenu(3)} /></Td>
                  {dataForm.tax !== 'NO_VAT' && <Td show={show === i} onClick={() => setShow(i === show ? false : i)} ><NewSelect border='none' error={x.errorForm?.dataIva} required heightBody='35px' action width='100%' minWidth='115px' disabled={!dataIva || Disable} search options={dataIva || []} id='iPercentage' name='iPercentage' value={x?.iPercentage} optionName={['IName']} onChange={(e, error) => onChange(e, error, { type: 'items', id: x.id })} sideLabel='% ' secOptionName={'iPercentage'} onClick={() => handleMenu(2)} /></Td>}
                  <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><InputHooks required border='none' width='100%' padding='0' paddingInput='10px' minWidth='115px' name='bDescription' disabled={Disable} value={x?.bDescription} onChange={(e, error) => onChange(e, error, { type: 'items', id: x.id })} type='text' /></Td>
                  <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><NewSelect border='none' heightBody='35px' action search secOptionName={''} width='100%' minWidth='115px' disabled={!dataProducts || Disable} options={dataProducts || []} id='idRef' name='idRef' value={x?.idRef || ''} optionName='pName' onChange={(e, error) => onChange(e, error, { type: 'items', key: 'items', id: x?.items ? x?.items : x.id })} type='text' onClick={(x) => handleMenu(4)} /></Td>
                  <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><NewSelect border='none' heightBody='35px' action search secOptionName={''} width='100%' minWidth='115px' disabled={!dataClass?.getClass || Disable} options={dataClass?.getClass || []} id='idClass' name='idClass' value={x?.idClass || ''} optionName={['className']} onChange={(e, error) => onChange(e, error, { type: 'items', key: 'items', id: x?.items ? x?.items : x.id })} type='text' onClick={(x) => handleMenu(7)} /></Td>
                  <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><InputHooks required error={x.errorForm?.quantity} type='number' border='none' width='100%' padding='0' paddingInput='10px' minWidth='115px' name='quantity' disabled={Disable} value={x?.quantity} onChange={(e, error) => onChange(e, error, { type: 'items', id: x.id })} /> </Td>
                  <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><InputHooks required error={x.errorForm?.rate} type='number' border='none' width='100%' padding='0' paddingInput='10px' minWidth='115px' name='rate' disabled={Disable} value={x?.rate} onChange={(e, error) => onChange(e, error, { type: 'items', id: x.id })} /> </Td>
                  <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><Text size='12px'>{currencyFormatter.format(CalculateAmount(x.quantity, x.rate), { code: dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD' })}</Text></Td>
                  {dataForm.tax !== 'NO_VAT' && <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><Text size='12px'>{currencyFormatter.format(numberFormat(calculateIva(x.quantity, x.rate, x.iPercentage)), { code: dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD' })} </Text></Td>}
                  <Td show={show === i} onClick={() => state?.selectedIndex > dataForm?.items?.length - 1 ? dispatch({ type: 'AddMore' }) : setShow(i === show ? false : i)} > <Button type='button' onClick={() => !Disable && deleteSlot({ id: x?.id, type: 'items', key: ['id'], DeleteItem: !!isEdit.state })} >
                    <IconDelete size='25px' color={Disable ? SFVColor : EColor} />
                  </Button></Td>
                </tr>
              )
            })}
          </table>
        </CustomTable>
      </ContentList>
    </div>
  )
}

ListBillsLateral.propTypes = {
  state: PropTypes.func,
  dataFiles: PropTypes.array,
  dataClass: PropTypes.object,
  dataOneSupplier: PropTypes.object,
  data: PropTypes.array,
  isEdit: PropTypes.bool,
  show: PropTypes.bool,
  errorForm: PropTypes.object,
  refs: PropTypes.element,
  onChange: PropTypes.func,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  dataForm: PropTypes.array,
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  setsize: PropTypes.number,
  setTotalIva: PropTypes.number,
  handleDelete: PropTypes.func,
  addTag: PropTypes.func,
  LinkMinio: PropTypes.string,
  HandleClickEdit: PropTypes.func,
  filterLineItems: PropTypes.array,
  reset: PropTypes.bool,
  calculateAmount: PropTypes.func,
  calculateIva: PropTypes.func,
  handleTag: PropTypes.func,
  setReset: PropTypes.func,
  total: PropTypes.number,
  size: PropTypes.number,
  billSubTotal: PropTypes.number,
  setShowLateral: PropTypes.bool,
  showLateral: PropTypes.func,
  selectedTags: PropTypes.string,
  setShow: PropTypes.func,
  tagValue: PropTypes.string,
  dataAccount: PropTypes.array,
  dataProducts: PropTypes.array,
  dataSupplier: PropTypes.array,
  dataIva: PropTypes.array,
  deleteSlot: PropTypes.func,
  setDataValue: PropTypes.func,
  addMore: PropTypes.func,
  DeleteAll: PropTypes.func,
  handleFileChange: PropTypes.func,
  Disable: PropTypes.bool,
  handleMenu: PropTypes.func,
  setTags: PropTypes.func,
  tags: PropTypes.array,
  getFileUrl: PropTypes.func
}

export default ListBillsLateral
