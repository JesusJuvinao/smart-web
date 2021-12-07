import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import InputHooks from '../InputHooks/InputHooks'
import styled, { css } from 'styled-components'
import { AwesomeModal } from '../AwesomeModal'
import NewSelect from '../NewSelectHooks'
import { Loading } from '../Loading'
import { BColor, BGColor, EColor, PColor, PLColor, SEGColor, SFVColor } from '../../public/colors'
import { AddPlusCircle, IconArrowRight, IconCancel, IconDelete, IconDrag } from '../../public/icons'
import { dateFormat, numberFormat } from '../../utils'
// import { InputTags } from '../InputTags'
import { Table, useKeyPress } from '../Table'
import { Section } from '../Table/styled'
import { InputFiles } from '../InputFilesPrev'
import { Overline } from '../common/Reusable'
import { useRouter } from 'next/router'
import { useSetState } from '../hooks/useState'
import currencyFormatter from 'currency-formatter'
import { Container, Content, Form, ModalBody, Text, Card, Button, ContentAction, Tooltip, ContentList, CustomTable, Td, BtnMore, ModalLateral, Header, FooterModal, LinkFile, Select, ComponentLinkMinio, ProgressBarContainer, ProgressBar, Box } from './styled'
import ListBills from './ListBills'
import ListBillsLateral from './lateralMenu'
import AttachmentsList from './AttachmentsList'
import ActiveLink from '../common/Link'
export const Bills = ({
  dataForm,
  tagValue,
  onChange,
  handleSubmit,
  isEdit,
  data,
  dataClass,
  modal,
  addTag,
  dataOneSupplier,
  setModal,
  setsize,
  setTotalIva,
  handleDelete,
  LinkMinio,
  HandleClickEdit,
  reset,
  loading,
  calculateAmount,
  calculateIva,
  setReset,
  total,
  size,
  billSubTotal,
  setShowLateral,
  showLateral,
  selectedTags,
  dataAccount,
  dataProducts,
  errorForm,
  dataSupplier,
  dataIva,
  handleTag,
  deleteSlot,
  setDataValue,
  width,
  setWidth,
  addMore,
  DeleteAll,
  handleFileChange,
  Disable,
  handleMenu,
  refs,
  setTags,
  tags,
  dataFiles,
  getFileUrl
}) => {
  const [show, setShow] = useState(false)
  const isSettingModal = () => {
    setModal(true)
  }
  const initialState = { selectedIndex: 0 }
  const location = useRouter()
  function reducer(state, action) {
    switch (action.type) {
      case 'arrowUp':
        return {
          selectedIndex:
            state.selectedIndex !== 0 ? state.selectedIndex - 1 : dataForm?.items.length - 1
        }
      case 'arrowDown':
        return {
          selectedIndex:
            state.selectedIndex !== dataForm?.items.length - 1 ? state.selectedIndex + 1 : 0
        }
      /*  case 'Backspace':
         return {
           selectedIndex:
             deleteSlot({ id: state.selectedIndex, type: 'items', key: ['_id'] })
         } */
      case 'select':
        return { selectedIndex: action.payload }
      default: return null
    }
  }
  const refBox = useRef()
  const arrowUpPressed = useKeyPress('ArrowUp')
  const arrowDownPressed = useKeyPress('ArrowDown')
  const backSpace = useKeyPress('Backspace')
  const openConfirm = useSetState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: 'arrowUp' })
    }
    if (arrowDownPressed) {
      dispatch({ type: 'arrowDown' })
    }
    /*   if (backSpace) {
        dispatch({ type: 'Backspace' })
      } */
  }, [arrowUpPressed, arrowDownPressed, backSpace])
  const showTooltip = useSetState(false)
  const handleDeleteOption = ({ _id }) => {
    handleDelete({ _id: _id })
    setDataValue({})
    showTooltip.setState(!showTooltip.state)
    openConfirm.setState(!openConfirm.state)
    setModal(!modal)
    isEdit.setState(!isEdit)
    DeleteAll()
    location.replace(location.pathname)
  }
  const handleCancel = () => {
    showTooltip.setState(!showTooltip.state)
    openConfirm.setState(!openConfirm.state)
  }
  const [search, setSearch] = useState({ rate: '', bDescription: '', quantity: '' })
  const filterLineItems = useMemo(() =>
    dataForm && dataForm?.items?.filter((data) => {
      if (search.bDescription) {
        return data?.bDescription?.toLowerCase().includes(search?.bDescription?.toLowerCase())
      } else {
        return dataForm?.items
      }
    }), [search, dataForm]
  )
  return (
    <Container>
      {loading && <Loading />}
      <AwesomeModal zIndex='99999' padding='20px' height='200px' show={openConfirm.state} onHide={() => { openConfirm.setState(!openConfirm.state); showTooltip.setState(!showTooltip.state) }} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
        <Text lineHeight='1.2rem' margin='0' size='1rem'>This invoice may be linked to others. Are you sure you want to delete it?</Text>
        <FooterModal style={{ display: 'flex', backgroundColor: 'transparent', width: '100%' }}>
          <Button bgColor={BGColor} disabled={Disable} border height='min-content' onClick={() => handleDeleteOption({ _id: dataForm.idBill })}>{isEdit.state ? 'Delete' : 'Save'}</Button>
          <Button bgColor={BGColor} disabled={Disable} border height='min-content' onClick={handleCancel}>{isEdit.state ? 'Cancel' : 'Save'}</Button>
        </FooterModal>
      </AwesomeModal>
      <Content>
        <Card justify='flex-end'>
          <ActiveLink activeClassName="active" href='/bills/invite'>
            <a>
              <Button radius={'0'} padding='5px' border='1px solid'>Access employees</Button>
            </a>
          </ActiveLink>
        </Card>
        <AwesomeModal useScroll={true} height='100vh' show={!!modal} hideOnConfirm={false} title={` Bill ${dataForm?.refCode} `} onHide={() => { setDataValue({}); setModal(!modal); isEdit.setState(!isEdit); location.replace(location.pathname) }} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
          <Overline show={showLateral || showTooltip.state} onClick={() => setShowLateral(false) || showTooltip.setState(!showTooltip.state)} />
          <div style={{ display: 'flex', backgroundColor: 'transparent', width: '100%', flexWrap: 'wrap' }}>
            <Form width={width} onSubmit={(e) => (handleSubmit(e, isEdit.state ? 2 : 1))}>
              <Card>
                <Card width='100%' justify='flex-start' responsive>
                  <NewSelect action top='88%' icon title='Choose a supplier.' width='20%' secOptionName={''} error={errorForm?._id} required search disabled={!dataSupplier || Disable} options={dataSupplier || []} id='_id' name='_id' value={dataForm?._id || ''} optionName={['sName']} onChange={onChange} onClick={(x) => handleMenu(1)} />
                  <InputHooks title='Bill ref.' width='15%' required error={errorForm?.refCode} value={dataForm?.refCode} disabled={Disable || isEdit.state} onChange={onChange} name='refCode' />
                  <InputHooks title='Current date.' width='10%' type='date' required disabled={Disable || isEdit.state} error={errorForm?.dateNow} value={dataForm?.dateNow} onChange={onChange} name='dateNow' />
                  <InputHooks title='Due date.' width='10%' required type='date' error={errorForm?.bDueDate} disabled={Disable} value={dataForm?.bDueDate} onChange={onChange} name='bDueDate' />
                  <InputHooks title='Bill no.' width='10%' required error={errorForm?.billNo} disabled={Disable || isEdit.state} value={dataForm?.billNo} onChange={onChange} numeric name='billNo' range={{ min: 0, max: 50 }} />
                  <Card justify='flex-start'>
                    {isEdit.state && <div>
                      <Text lineHeight='1.2rem' size='.6rem' margin='0'>PAYMENT STATUS:</Text>
                      <Text lineHeight='1.2rem' margin='0' size='1.8rem'> NO PAID </Text>
                    </div>}
                  </Card>
                </Card>
                <Card justify='flex-end'>
                  <Text margin='0' size='30px'>{dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD'}</Text>
                </Card>
                <Card justify='flex-end'>
                  <Box onClick={() => refBox.current.focus()}>
                    <InputTag>
                      {dataForm?.tags?.map((tag, index) => (
                        <Tags key={index.id}>
                          <Text size='10px'>{tag.tName}</Text>
                          <IconContent type='button' onClick={() => deleteSlot({ id: tag.id, type: 'tags', key: ['id'], Delete: !!isEdit.state })}><IconCancel size='7px' /></IconContent>
                        </Tags>
                      ))}
                      <InputText ref={refBox} onKeyPress={e => addTag('tags', 'id', e)} type="text" name="tName" value={tagValue?.tName || ''} placeholder="Add tags" onChange={handleTag} />
                    </InputTag>
                  </Box>
                  {isEdit.state &&
                    <div>
                      <Input width='100%' placeholder='Filter characteristic.' value={search.bDescription} onChange={(e) => setSearch({ ...search, bDescription: e.target.value })} name='bDescription' />
                    </div>}
                  <Select disabled={Disable} onChange={onChange} name='tax' id='tax'>
                    <option value='INCLUSIVE' selected={dataForm.tax === 'INCLUSIVE'} > Inclusive of VAT</option>
                    <option value='EXCLUSIVE' selected={dataForm.tax === 'EXCLUSIVE'}>Exclusive of VAT</option>
                    <option value='NO_VAT' selected={dataForm.tax === 'NO_VAT'}>No VAT</option>
                  </Select>
                </Card>
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
                          <tr key={x.id} onClick={() => { dispatch({ type: 'select', payload: i }) }} style={{ cursor: 'pointer', backgroundColor: i === state.selectedIndex ? `${SFVColor}2e` : 'transparent' }} aria-pressed={i === state.selectedIndex} tabIndex={0} onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              dispatch({ type: 'select', payload: i })
                              e.target.blur()
                            }
                          }}>
                            <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><BtnMore show={show === i} type='button' onClick={() => !Disable && addMore('items', 'id')}><AddPlusCircle color={PColor} size='30px' /></BtnMore><IconDrag color={`${SEGColor}80`} size='20px' /></Td>
                            <Td show={show === i} onClick={() => setShow(i === show ? false : i)}>{i + 1}</Td>
                            <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><NewSelect border='none' heightBody='35px' required action width='100%' minWidth='115px' disabled={!dataAccount || Disable} search options={dataAccount || []} id='idAccount' name='idAccount' value={x?.idAccount} optionName='aName' onChange={(e, error) => onChange(e, error, { type: 'items', id: x.id })} secOptionName={'aType'} onClick={(x) => handleMenu(3)} /></Td>
                            {dataForm.tax !== 'NO_VAT' && <Td show={show === i} onClick={() => setShow(i === show ? false : i)} ><NewSelect border='none' error={x.errorForm?.dataIva} required heightBody='35px' action width='100%' minWidth='115px' disabled={!dataIva || Disable} search options={dataIva || []} id='iPercentage' name='iPercentage' value={x?.iPercentage} optionName={['IName']} onChange={(e, error) => onChange(e, error, { type: 'items', id: x.id })} sideLabel='% ' secOptionName={'iPercentage'} onClick={() => handleMenu(2)} /></Td>}
                            <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><InputHooks required border='none' width='100%' padding='0' paddingInput='10px' minWidth='115px' name='bDescription' disabled={Disable} value={x?.bDescription} onChange={(e, error) => onChange(e, error, { type: 'items', id: x.id })} type='text' /></Td>
                            <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><NewSelect border='none' heightBody='35px' action search secOptionName={''} width='100%' minWidth='115px' disabled={!dataProducts || Disable} options={dataProducts || []} id='idRef' name='idRef' value={x?.idRef || ''} optionName='pName' onChange={(e, error) => onChange(e, error, { type: 'items', key: 'items', id: x?.items ? x?.items : x.id })} type='text' onClick={(x) => handleMenu(4)} /></Td>
                            <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><NewSelect border='none' heightBody='35px' action search secOptionName={''} width='100%' minWidth='115px' disabled={!dataClass?.getClass || Disable} options={dataClass?.getClass || []} id='idClass' name='idClass' value={x?.idClass || ''} optionName={['className']} onChange={(e, error) => onChange(e, error, { type: 'items', key: 'items', id: x?.items ? x?.items : x.id })} type='text' onClick={(x) => handleMenu(7)} /></Td>
                            <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><InputHooks required error={x.errorForm?.quantity} type='number' border='none' width='100%' padding='0' paddingInput='10px' minWidth='115px' name='quantity' disabled={Disable} value={x?.quantity} onChange={(e, error) => onChange(e, error, { type: 'items', id: x.id })} /> </Td>
                            <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><InputHooks required error={x.errorForm?.rate} type='number' border='none' width='100%' padding='0' paddingInput='10px' minWidth='115px' name='rate' disabled={Disable} value={x?.rate} onChange={(e, error) => onChange(e, error, { type: 'items', id: x.id })} /> </Td>
                            <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><Text size='12px'>{currencyFormatter.format(calculateAmount(x.quantity, x.rate), { code: dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD' })}</Text></Td>
                            {dataForm.tax !== 'NO_VAT' && <Td show={show === i} onClick={() => setShow(i === show ? false : i)}><Text ref={refs.current[i]} size='12px'>{currencyFormatter.format(numberFormat(calculateIva(x.quantity, x.rate, x.iPercentage)), { code: dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD' })} </Text></Td>}
                            <Td show={show === i} onClick={() => state?.selectedIndex > dataForm?.items?.length - 1 ? dispatch({ type: 'AddMore' }) : setShow(i === show ? false : i)} > <Button type='button' onClick={() => !Disable && deleteSlot({ id: x?.id, type: 'items', key: ['id'], DeleteItem: !!isEdit.state })} >
                              <IconDelete size='25px' color={Disable ? SFVColor : EColor} />
                            </Button></Td>
                          </tr>
                        )
                      })}
                    </table>
                  </CustomTable>
                </ContentList>
                <ContentAction direction='flex-start' width='100%'>
                  <Button disabled={Disable} border height='min-content' type='button' onClick={() => !Disable && addMore('items', 'id')}>
                    <span>Add Line Item</span>
                  </Button>
                  {!isEdit.state && <Button disabled={Disable} border height='min-content' type='button' onClick={!Disable && DeleteAll}>
                    Clean All Lines
                  </Button>}
                </ContentAction>
                <Card>
                  <Card width='40%' border={`1px solid ${`${SEGColor}1F`}`}>
                    <InputHooks border='none' disabled={Disable} value={dataForm?.bDescription} name='bDescription' TypeTextarea required title='Memo' minWidth='100%' maxWidth='100%' onChange={onChange} />
                  </Card>
                  <Card padding='1%' border={`1px solid ${`${SEGColor}1F`}`} width='40%' >
                    <Card margin='0' wrap='no-wrap'>
                      <Text size='17px' margin='0' >Sub Total</Text>
                      <Text margin='0' size='20px' font='PFont-Medium'>
                        {currencyFormatter.format(numberFormat(billSubTotal), { code: dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD' })}
                      </Text>
                    </Card>
                    <Card margin='0' wrap='no-wrap'>
                      <Text margin='0' size='17px' >Total</Text>
                      <Text margin='0' font='PFont-Medium' size='17px'>
                        {currencyFormatter.format(numberFormat(total), { code: dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD' })}
                      </Text>
                    </Card>
                    <Card margin='0' wrap='no-wrap'>
                      <Text margin='0' size='17px' >Total  VAT</Text>
                      <Text margin='0' size='17px' font='PFont-Medium'>
                        {currencyFormatter.format(numberFormat(setTotalIva), { code: dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD' })}
                      </Text>
                    </Card>
                  </Card>
                </Card>
                <Card width='40%' >
                  {!!dataFiles?.length > 0 && dataFiles?.map(x => (
                    <div style={{ display: 'flex' }} key={x._id}>
                      <ComponentLinkMinio >
                        <a className='link' target="_blank" onClick={() => getFileUrl({ BillLink: x.BillLink })} >{x.BillLink}</a>
                        &nbsp;&nbsp; &nbsp;
                      </ComponentLinkMinio>
                      {dataFiles && <Button bgColor={'#ffffff'} type="button" display='inline-grid' onClick={() => getFileUrl({ BillLink: x.BillLink, Delete: true, idFile: x._id })} >
                        <IconDelete color={EColor} size='15px' />
                      </Button>}
                    </div>
                  ))}
                  <InputFiles Disable={Disable} onChange={handleFileChange} reset={reset} MaximumSizeFiles={20971520} ShowMessage={'25M'} />
                  {/* {isUpload && <i id="status">uploads</i>} */}
                </Card>
              </Card>
              <FooterModal position='fixed'>
                <div style={{ display: 'flex' }}>
                  <Button bgColor={BGColor} disabled={Disable} border height='min-content' type='button' onClick={() => !Disable && addMore('items', 'id')}>
                    <span>Add Line Item</span>
                  </Button>
                  {!isEdit.state && <Button bgColor={BGColor} disabled={Disable} border height='min-content' type='button' onClick={!Disable && DeleteAll}>
                    Clean All Lines
                  </Button>}
                </div>
                {isEdit.state && <Button bgColor={BGColor} disabled={Disable} type='button' onClick={() => showTooltip.setState(!showTooltip.state)} border height='min-content'>
                  <Tooltip onClick={(e) => e.stopPropagation()} showTooltip={showTooltip.state}>
                    <ul>
                      {/* <li><Button width='100%' radius='0' type='submit' height='min-content' onClick={() => isEdit.setState(!isEdit.state)}>Copy</Button></li> */}
                      <li onClick={(e) => openConfirm.setState(!openConfirm.state)}>Delete</li>
                    </ul>
                  </Tooltip>
                  More</Button>}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button bgColor={BGColor} type='button' border height='min-content' onClick={() => setModal(false)} color={PLColor} >Cancel</Button>
                  <Button bgColor={BGColor} disabled={Disable} type='submit' border height='min-content'>{isEdit.state ? 'Edit' : 'Save'}</Button>
                </div>
              </FooterModal>
            </Form>
            <AttachmentsList
              width={width}
              dataFiles={dataFiles}
              getFileUrl={getFileUrl}
            />
          </div>

        </AwesomeModal>
        <ModalLateral show={showLateral}>
          <Header>Edit Lines  <Button onClick={() => setShowLateral(false)} ><IconCancel size='25px' /></Button></Header>
          <ModalBody onSubmit={(e) => (handleSubmit(e, isEdit.state ? 2 : 1))} >
            <CustomTable>
              <ListBillsLateral
                isSettingModal={isSettingModal}
                DeleteAll={DeleteAll}
                handleDelete={handleDelete}
                onChange={onChange}
                dataProducts={dataProducts}
                dataForm={dataForm}
                dataIva={dataIva}
                Disable={Disable}
                setShow={setShow}
                isEdit={isEdit}
                dataClass={dataClass}
                addMore={addMore}
                handleMenu={handleMenu}
                dataAccount={dataAccount}
                show={show}
                HandleClickEdit={HandleClickEdit}
                deleteSlot={deleteSlot}
                state={state}
                dispatch={dispatch}
                calculateIva={calculateIva}
                filterLineItems={filterLineItems}
                dataOneSupplier={dataOneSupplier}
                data={data}
              />
              <Card justify='flex-end'>
                <Card padding='1%' border={`1px solid ${`${SEGColor}1F`}`} width='40%' >
                  <Card margin='0' wrap='no-wrap'>
                    <Text size='17px' margin='0' >Sub Total</Text>
                    <Text margin='0' size='20px' font='PFont-Medium'>
                      {currencyFormatter.format(numberFormat(billSubTotal), { code: dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD' })}
                    </Text>
                  </Card>
                  <Card margin='0' wrap='no-wrap'>
                    <Text margin='0' size='17px' >Total</Text>
                    <Text margin='0' font='PFont-Medium' size='17px'>
                      {currencyFormatter.format(numberFormat(total), { code: dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD' })}
                    </Text>
                  </Card>
                  <Card margin='0' wrap='no-wrap'>
                    <Text margin='0' size='17px' >Total  VAT</Text>
                    <Text margin='0' size='17px' font='PFont-Medium'>
                      {currencyFormatter.format(numberFormat(setTotalIva), { code: dataOneSupplier?.sCurrency?.cName ? dataOneSupplier?.sCurrency?.cName : 'USD' })}
                    </Text>
                  </Card>
                </Card>
              </Card>
              <FooterModal >
                <div style={{ display: 'flex' }}>
                  <Button bgColor={BGColor} disabled={Disable} border height='min-content' type='button' onClick={() => !Disable && addMore('items', 'id')}> Add Line Item</Button>
                  <Button bgColor={BGColor} disabled={Disable} border height='min-content' type='button' onClick={!Disable && DeleteAll}> Clean All Lines</Button>
                  <Button bgColor={BGColor} type='button' border height='min-content' onClick={() => setShowLateral(false)} color={PLColor} >Cancel</Button>
                </div>
                <div>
                  {isEdit.state && <Button bgColor={BGColor} disabled={Disable} type='button' onClick={() => showTooltip.setState(!showTooltip.state)} border height='min-content'>
                    <Tooltip onClick={(e) => e.stopPropagation()} showTooltip={showTooltip.state}>
                      <ul>
                        <li onClick={(e) => openConfirm.setState(!openConfirm.state)}>Delete</li>
                      </ul>
                    </Tooltip>
                    More</Button>}
                </div>
                <Button bgColor={BGColor} disabled={Disable} type='submit' border height='min-content'>{isEdit.state ? 'Edit' : 'Save'}</Button>
              </FooterModal>
            </CustomTable>
          </ModalBody>
        </ModalLateral>
        <Text margin='30px 0px 30px' size='20px'>Register Bill</Text>
        <ListBills
          isSettingModal={isSettingModal}
          DeleteAll={DeleteAll}
          handleDelete={handleDelete}
          HandleClickEdit={HandleClickEdit}
          data={data}
        />
      </Content>
    </Container >
  )
}

export const ContentInfo = styled.div`
    display: flex;
    flex-direction: row;
    ${({ margin }) => margin && css`margin: ${margin};`};
    ${({ mLeft }) => mLeft && css`
        margin-left: ${({ marginLeft }) => marginLeft || 'auto'};
    `}
    ${({ Action }) => Action && css`
        cursor: pointer;
    `}
    @media(max-width: 768px){
        flex-direction: column;
    }
`
export const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    width: ${({ width }) => width || '50%'};
    margin: ${({ margin }) => margin || '0 20px'};

    @media (max-width: 767.98px) {
        width: 100%;
        margin: 0;
        margin-top: 12px;
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
const Input = styled.input`
  padding: 10px;
  width: ${({ width }) => width || 'auto'};
  color: ${BColor};
`
const IconContent = styled.button`
    cursor: pointer;
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
Bills.propTypes = {
  dataFiles: PropTypes.array,
  dataClass: PropTypes.object,
  dataOneSupplier: PropTypes.object,
  data: PropTypes.array,
  isEdit: PropTypes.bool,
  width: PropTypes.bool,
  loading: PropTypes.bool,
  errorForm: PropTypes.object,
  refs: PropTypes.element,
  setWidth: PropTypes.func,
  onChange: PropTypes.func,
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
