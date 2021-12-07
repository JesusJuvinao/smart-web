import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Document as PdfDocument, View as PdfView, PDFDownloadLink, Page as PdfPage, Text as PdfText } from '@react-pdf/renderer'
import BillInvoice from '../../companies-dashboard'
import styled from 'styled-components'
import { IconPDF } from '../../../public/icons'

export const Download = ({ data }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(false)

    const timeout = setTimeout(() => {
      setShow(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Container>
      {show && (
        <PDFDownloadLink
          document={<BillInvoice pdfMode={true} data={data} />}
          fileName={`${data?.title ? data?.title.toLowerCase() : 'invoice'}.pdf`}
          aria-label="Save PDF"><IconPDF size='80px' /></PDFDownloadLink>
      )}
    </Container>
  )
}
export const Document = ({ pdfMode, children }) => { return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : <>{children}</>}</> }
export const Page = ({ pdfMode, children }) => { return <>{pdfMode ? <PdfPage>{children}</PdfPage> : <>{children}</>}</> }
export const Text = ({ pdfMode, children }) => { return <>{pdfMode ? <PdfText>{children}</PdfText> : <>{children}</>}</> }
export const View = ({ pdfMode, children }) => { return <>{pdfMode ? <PdfView>{children}</PdfView> : <>{children}</>}</> }
const Container = styled.div`
    position: fixed;
    top: 100px;
    margin-left: -140px;
    width: 40px;
    height: 40px;
`
Document.propTypes = {
  children: PropTypes.element,
  pdfMode: PropTypes.bool

}
View.propTypes = {
  children: PropTypes.element,
  pdfMode: PropTypes.bool

}
Download.propTypes = {
  data: PropTypes.element
}
Page.propTypes = {
  children: PropTypes.element,
  pdfMode: PropTypes.bool,
  style: PropTypes.bool

}
Text.propTypes = {
  children: PropTypes.element,
  pdfMode: PropTypes.bool

}
