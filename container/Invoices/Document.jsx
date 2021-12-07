/* eslint-disable react/prop-types */
/* eslint-disable indent */
import { Document as PdfDocument, Page, PDFDownloadLink, Text as PdfText, View as PdfView, StyleSheet } from '@react-pdf/renderer'

import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { InputSelect } from '.'
import { compose, EditableInput } from '../../components/common/EditableInput'
import { EColor, BGColor, BColor } from '../../public/colors'
import { IconDelete, IconPDF, IconShowEye } from '../../public/icons'

export const DocumentPdf = ({ invoice, handleLineChange, setInvoice, dataForm, calculateAmount, handleRemove, handleAdd, dataIva, dataClass, dataProducts, CleanLines, handleMenu, dataAccount }) => {
  const Menu = () => (
    <Container style={{ display: 'flex', borderBottom: '1px solid black', paddingBottom: '5px', justifyContent: 'space-around' }} >
      <PDFDownloadLink document={<PDF handleLineChange={handleLineChange} pdfMode={true} invoice={invoice} handleRemove={handleRemove} setInvoice={setInvoice} dataForm={dataForm} calculateAmount={calculateAmount} />} fileName="poema.pdf" >
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <div> <Link href={url}><IconShowEye size='80px' color='' /></Link> <Button type="button"><IconPDF size='80px' /></Button></div>)}
      </PDFDownloadLink>
    </Container>
  )

  return (
    <div>
      <Menu />
      {invoice
        ? (
          <>
            {/* <PDFViewer style={{ width: '100%', height: '90vh' }}> */}
            <PDF invoice={invoice} dataClass={dataClass} dataProducts={dataProducts} handleMenu={handleMenu} dataAccount={dataAccount} dataIva={dataIva} CleanLines={CleanLines} setInvoice={setInvoice} dataForm={dataForm} handleAdd={handleAdd} calculateAmount={calculateAmount} handleRemove={handleRemove} handleLineChange={handleLineChange} />
            {/* </PDFViewer> */}
          </>
        )
        : null}
    </div>
  )
}

const PDF = ({ invoice, setInvoice, pdfMode, dataProducts, dataForm, dataIva, dataClass, calculateAmount, handleLineChange, handleRemove, handleAdd, CleanLines, handleMenu, dataAccount }) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      color: '#000',
      padding: '30px'
    },
    section: { color: 'white', textAlign: 'center', margin: 30 },
    row: {
      display: 'flex',
      flexDirection: 'row'
    },
    column: {
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      width: '100px'
    },
    header: {
      backgroundColor: '#0e8900',
      height: '100px',
      width: '100%'
    },
    text: {
      fontSize: '11px'
    },
    title: {
      color: '#000',
      fontSize: '25px'
    }
  })
  return (
    <Document pdfMode={pdfMode}>
      <Page style={styles.page} >
        <View pdfMode={pdfMode} style={styles.header} >
          {!pdfMode && (
            <Header className="link" onClick={handleAdd}>
              <Text style={styles.text} pdfMode={pdfMode} color={BGColor} size="30px">{invoice.title}</Text>
            </Header>
          )}
        </View>
        <View pdfMode={pdfMode} >
          {!pdfMode && <Card direction='row' display='flex'>
            <Card>
              <Text style={styles.text} bold='700' pdfMode={pdfMode}> Invoice number </Text>
              <Text style={styles.text} bold='400' pdfMode={pdfMode}> {invoice ? dataForm.salesNo : null} </Text>
            </Card>
            <Card>
              <Text style={styles.text} bold='700' pdfMode={pdfMode}> Invoice number </Text>
              <Text style={styles.text} bold='400' pdfMode={pdfMode}> {invoice ? dataForm.salesNo : null} </Text>
            </Card>
          </Card>}
          {!pdfMode && <Card direction='row' display='flex'>
            <Card>
              <Text style={styles.text} bold='700' pdfMode={pdfMode}> Invoice Date  </Text>
              <Text style={styles.text} bold='400' pdfMode={pdfMode}> {invoice ? dataForm.dateNow : null} </Text>
            </Card>
            <Card>
              <Text style={styles.text} bold='700' pdfMode={pdfMode}> Invoice type of tax </Text>
              <Text style={styles.text} bold='400' pdfMode={pdfMode}> {invoice ? dataForm.tax : null} </Text>
            </Card>
          </Card>}
        </View>
        {!pdfMode && (
          <Card display='flex' direction='row' justify='space-between'>
            <Line direction='row' display='flex'>
              <Text style={styles.text} size='13px' bold='100' pdfMode={pdfMode}> Account  </Text>
              <Text style={styles.text} size='13px' bold='100' pdfMode={pdfMode}> Vat  </Text>
              <Text style={styles.text} size='13px' bold='100' pdfMode={pdfMode}> Product  </Text>
              <Text style={styles.text} size='13px' bold='100' pdfMode={pdfMode}> Class  </Text>
              <Text style={styles.text} size='13px' bold='100' pdfMode={pdfMode}> Description  </Text>
              <Text style={styles.text} size='13px' bold='100' pdfMode={pdfMode}> Rate  </Text>
              <Text style={styles.text} size='13px' bold='100' pdfMode={pdfMode}> Quantity  </Text>
              <Text style={styles.text} size='13px' bold='100' pdfMode={pdfMode}> Total </Text>
              <Text style={styles.text} size='13px' bold='100' pdfMode={pdfMode}> Total Vat </Text>
            </Line>
          </Card>
        )}
        <View style={styles.row} pdfMode={pdfMode}>
          {invoice.productLines.map((salesLine, i) => {
            return pdfMode && salesLine.description === ''
              ? (
                <Text pdfMode={pdfMode} key={i}></Text>
              )
              : (
                <View style={styles.column} key={i} pdfMode={pdfMode}>
                  <View pdfMode={pdfMode}>
                    <InputSelect
                      options={dataAccount?.getAllAccount || []}
                      value={salesLine.idAccount}
                      onChange={(value) => handleLineChange(i, 'idAccount', value)}
                      onClick={() => handleMenu(3)}
                      border='none'
                      id='idAccount'
                      name='idAccount'
                      search
                      required
                      action
                      show={true}
                      minWidth='115px'
                      optionName={['aName', 'aType']}
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View pdfMode={pdfMode}>
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
                      disabled={!dataAccount}
                      search
                      name='vat'
                      sideLabel='%'
                      optionName={['IName', 'iPercentage']}
                    />
                  </View>
                  <View pdfMode={pdfMode}>
                    <InputSelect
                      options={dataProducts?.getProductsForCompany || []}
                      value={invoice._id}
                      onChange={(value) => handleLineChange(i, 'idPro', value)}
                      pdfMode={pdfMode}
                      onClick={() => handleMenu(4)}
                      border='none'
                      heightBody='35px'
                      required action
                      minWidth='115px'
                      disabled={!dataAccount}
                      search
                      name='idPro'
                      optionName={['pName']}
                    />
                  </View>
                  <View pdfMode={pdfMode}>
                    <InputSelect
                      options={dataClass?.getClass || []}
                      value={invoice._id}
                      onChange={(value) => handleLineChange(i, 'idPro', value)}
                      pdfMode={pdfMode}
                      onClick={() => handleMenu(2)}
                      border='none'
                      heightBody='35px'
                      required action
                      minWidth='115px'
                      disabled={!dataAccount}
                      search
                      name='idPro'
                      optionName={['className']}
                    />
                  </View>
                  <View pdfMode={pdfMode}>
                    <EditableInput
                      value={salesLine.description}
                      onChange={(value) => handleLineChange(i, 'description', value)}
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View pdfMode={pdfMode}>
                    <EditableInput
                      value={salesLine.quantity}
                      onChange={(value) => handleLineChange(i, 'quantity', value)}
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View pdfMode={pdfMode}>
                    <EditableInput
                      value={salesLine.rate}
                      onChange={(value) => handleLineChange(i, 'rate', value)}
                      pdfMode={pdfMode}
                    />
                  </View>
                  <View className="w-18 p-4-8 pb-10" pdfMode={pdfMode}>
                    <Text className="dark right" pdfMode={pdfMode}>
                      {calculateAmount(salesLine.quantity, salesLine.rate)}
                    </Text>
                  </View>
                  {!pdfMode && (
                    <button
                      aria-label="Remove Row"
                      title="Remove Row"
                      onClick={() => handleRemove(i)}
                    >
                      <IconDelete color={EColor} size='30px' />
                    </button>
                  )}
                </View>
              )
          })}
          <View className="w-50 mt-10" pdfMode={pdfMode}>
            {!pdfMode && (
              <div>
                <Button className="link" onClick={handleAdd}>
                  <span className="icon icon-add bg-green mr-10"></span>
                  Add Line Item
                </Button>
                <Button className="link" onClick={CleanLines}>
                  <span className="icon icon-add bg-green mr-10"></span>
                  Add Line Item
                </Button>
              </div>
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
}

const Document = ({ pdfMode, children }) => {
  return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : <>{children}</>}</>
}

const View = ({ className, pdfMode, children, style }) => {
  return (
    <>
      {pdfMode
        ? (
          <PdfView style={style}>{children}</PdfView>
        )
        : (
          <div className={'view ' + (className || '')}>{children}</div>
        )}
    </>
  )
}

const Text = ({ className, pdfMode, children, style, color, size, bold }) => {
  return (
    <>
      {pdfMode
        ? (
          <PdfText>{children}</PdfText>
        )
        : (
          <TextSpan bold={bold} color={color} size={size} className={'span ' + (className || '')}>{children}</TextSpan>
        )}
    </>
  )
}

const Card = styled.div`
  margin-bottom: 20px;
  width: ${({ width }) => width || '100%'};
  display: ${({ display }) => display || 'flex'};
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  `
const Line = styled.div`
  border-bottom: 2px solid;
  padding-bottom: 5px ;
  direction: flex;
  `
const TextSpan = styled.span`
  width: ${({ width }) => width || '100%'};
  font-family: PFont-Light;
  font-weight: ${({ bold }) => bold || 'inherit'};
  color: ${({ color }) => color || `${BColor}`};
  font-size: ${({ size }) => size || '16px'};
`
const Header = styled.div`
  background-color: #0e8900;
  height: 50px;
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 0 1.5cm;
  left: 0;
`
const Container = styled.div`
    position: fixed;
    top: 100px;
    margin-left: -200px;
    width: 40px;
    height: 40px;
`
const Button = styled.button`
  background-color: transparent;
  position: relative;
  border: 1px solid #cccccc;
  border-radius: 20px;
  `
const Link = styled.a`
  background-color: transparent;
`
DocumentPdf.propTypes = {
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
PDF.propTypes = {
  onChange: PropTypes.func,
  invoice: PropTypes.array,
  className: PropTypes.string,
  optionName: PropTypes.string,
  width: PropTypes.string,
  options: PropTypes.array,
  accessor: PropTypes.array,
  dataForm: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  pdfMode: PropTypes.bool
}
