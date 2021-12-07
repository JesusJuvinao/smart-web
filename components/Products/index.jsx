/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Loading } from '../Loading'
import Link from 'next/link'
import { Container, Content, ContentTableItem, Text, TableButton } from './styled'
import { Context } from '../../context'
import { Table } from '../Table'
import { Section } from '../Table/styled'
import { SEGColor, EColor, APColor } from '../../public/colors'

export const Products = ({
  data,
  HandleClickEdit,
  handleDelete,
  loading
}) => {
  const { handleMenu } = useContext(Context)
  return (
    <Container>
      {loading && <Loading />}
      <Text margin='30px 0px 30px' size='20px'>Register product</Text>
      <Table
        titles={[
          { name: '#', key: '', justify: 'flex-start', width: '9%' },
          { name: 'Name', key: 'bDescription', justify: 'flex-start', width: '9%' },
          { name: 'Description', justify: 'flex-start', width: '9%' },
          { name: 'Sales Price', justify: 'flex-start', width: '9%' },
          { name: 'Service Code', justify: 'flex-start', width: '9%' },
          { name: 'Type', justify: 'flex-start', width: '9%' },
          { name: 'VAT Code', justify: 'flex-start', width: '9%' },
          { name: 'Income Account', justify: 'flex-start', width: '9%' },
          { name: 'Class', justify: 'flex-start', width: '9%' },
          { name: 'Category', justify: 'flex-start', width: '9%' },
          { name: 'Action', justify: 'center', width: '2fr' }
        ]}
        bgRow={2}
        pointer
        entryPerView
        buttonAdd={true}
        handleAdd={() => handleMenu(4)}
        labelBtn='Product'
        data={data?.filter(x => x.pName !== 0 && x)}
        renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section columnWidth={titles} key={i}>
          <Content>
            <Text> {i + 1}</Text>
          </Content>
          <Content>
            <Text> {elem.pName}</Text>
          </Content>
          <Content>
            <Text> {elem.pDescription}</Text>
          </Content>
          <Content>
            <Text> {elem.pSalesPrice}</Text>
          </Content>
          <Content>
            <Text> {elem.pServiceCode}</Text>
          </Content>
          <Content>
            <Text> {elem.pType}</Text>
          </Content>
          <Content>
            <Text> {elem.pVATCode}</Text>
          </Content>
          <Content>
            <Text> {elem.pIncomeAccount}</Text>
          </Content>
          <Content>
            <Text> {elem.pClass}</Text>
          </Content>
          <Content>
            <Text> {elem.pCategory}</Text>
          </Content>
          <Content>
            <ContentTableItem padding='0px' direction='row'>
            <Link href={{ pathname: 'product', query: { pName: elem.pName, pCategory: elem.pCategory, pClass: elem.pClass, pDescription: elem.pDescription, pSellToOthers: elem.pSellToOthers, pSalesPrice: elem.pSalesPrice, pIncVAT: elem.pIncVAT, idRef: elem.idRef, pIncomeAccount: elem.pIncomeAccount, pPurchasedOthers: elem.pPurchasedOthers, pType: elem.pType, pVATCode: elem.pVATCode, pPhoto: elem.pPhoto, pServiceCode: elem.pServiceCode, view: true } }}>
              <TableButton color={SEGColor} onClick={() => handleMenu(4)}>
                View
              </TableButton>
            </Link>
              <TableButton backgroundColor={'#f800001e'} color={EColor} onClick={() => handleDelete({ ...elem })} >
                Delete
              </TableButton>
              <Link href={{ pathname: 'product', query: { id: elem._id, pName: elem.pName, pCategory: elem.pCategory, pClass: elem.pClass, pDescription: elem.pDescription, pSellToOthers: elem.pSellToOthers, pSalesPrice: elem.pSalesPrice, pIncVAT: elem.pIncVAT, idRef: elem.idRef, pIncomeAccount: elem.pIncomeAccount, pPurchasedOthers: elem.pPurchasedOthers, pType: elem.pType, pVATCode: elem.pVATCode, pPhoto: elem.pPhoto, pServiceCode: elem.pServiceCode, edit: true } }}>
              <TableButton color={APColor} onClick={() => HandleClickEdit({ ...elem })}>
                <a>Edit</a>
              </TableButton>
            </Link>
            </ContentTableItem>
          </Content>
        </Section>)}

      />
    </Container>
  )
}

/**
 *  pName: router.query.pName,
      pServiceCode: router.query.pServiceCode,
      pCategory: router.query.pCategory,
      pClass: router.query.pClass,
      pDescription: router.query.pDescription,
      pSellToOthers: router.query.state,
      pSalesPrice: router.query.pSalesPrice,
      pIncVAT: router.query.pIncVAT,
      idRef: router.query.idRef,
      pIncomeAccount: router.query.pIncomeAccount,
      pPurchasedOthers: router.query.pPurchasedOthers,
      pType: router.query.pType,
      pVATCode: router.query.pVATCode,
      pPhoto: router.query.pPhoto
 */

Products.propTypes = {
  data: PropTypes.array
}
