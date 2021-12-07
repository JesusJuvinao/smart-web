
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { DocumentPdf } from './Document'
import { IconPDF, IconShowEye } from '../../public/icons'
import styled from 'styled-components'

export const PdfRenderDownload = ({ data }) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(false)
    const timeout = setTimeout(() => {
      setShow(true)
    }, 500)
    return () => clearTimeout(timeout)
  }, [data])
  return (
    <Container className={'download-pdf ' + (!show ? 'loading' : '')} title="Save PDF">
      {show && (
        <PDFDownloadLink
          document={<DocumentPdf pdfMode={true} data={data} />} fileName={`${data.invoiceTitle ? data.invoiceTitle.toLowerCase() : 'invoice'}.pdf`} aria-label="Save PDF" >
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <div> <Link href={url}><IconShowEye size='80px' color='' /></Link> <Button type="button"><IconPDF size='80px' /></Button></div>)}
        </PDFDownloadLink>
      )}
    </Container>
  )
}
// export const Document = ({ pdfMode, children }) => { return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : <div>{children}</div>}</> }
// export const Page = ({ pdfMode, children, className }) => { return <>{pdfMode ? <PdfPage size="A4" style={compose('page ' + (className || ''))} >{children}</PdfPage> : <div className={'page ' + (className || '')}>{children}</div>}</> }
// export const Text = ({ pdfMode, children }) => { return <>{pdfMode ? <PdfText>{children}</PdfText> : <div>{children}</div>}</> }
// export const View = ({ pdfMode, children, className }) => { return <>{pdfMode ? <PdfView style={compose('view ' + (className || ''))}>{children}</PdfView> : <div>{children}</div>}</> }

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
  `
const Link = styled.a`
  background-color: transparent;
`

PdfRenderDownload.propTypes = {
  data: PropTypes.array,
  pdfMode: PropTypes.bool

}
