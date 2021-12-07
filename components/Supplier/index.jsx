import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../context'
import { Button, Container, Content, Text } from './styled'
import { Loading } from '../Loading'
import { Table } from '../Table'
import Link from 'next/link'
import { Section } from '../Table/styled'
import { DELETE_ONE_SUPPLIER, SUPPLIER_FOR_COMPANY } from '../../container/Supplier/queries'

export const SupplierCo = () => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  const [getSuppliersForCompany, { data, loading }] = useLazyQuery(SUPPLIER_FOR_COMPANY, { variables: { idC: company.idLasComp && company.idLasComp }, fetchPolicy: 'cache-and-network' })
  const [DeleteOneSupplier] = useMutation(DELETE_ONE_SUPPLIER)
  // Handles
  const handleDelete = async (elem) => {
    const { _id } = elem
    const results = await DeleteOneSupplier({
      variables: { id: _id },
      update (cache) {
        cache.modify({
          fields: {
            getSuppliersForCompany (dataOld = []) {
              return cache.writeQuery({ query: SUPPLIER_FOR_COMPANY, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  // Effects
  useEffect(() => getSuppliersForCompany(), [company.idLasComp])
  const HandleClickEdit = (item) => {
    // create func
    if (item.view === 1) {
      handleMenu(1)
      // edit func
    } else if (item.view === 2) {
      handleMenu(1)
      // id = item._id
      // View func
    }
  }
  if (loading) return <Loading />
  console.log(data)
  return (
    <Container>
      {loading && <Loading />}
      <Text margin='30px 0px 30px' size='20px'>Register Supplier</Text>
      <Table
        titles={[
          { name: '#', width: '1fr' },
          { name: 'Supplier', width: '1fr' },
          { name: 'Currency', width: '1fr' },
          { name: 'Action', width: '1fr', justify: 'center' }
        ]}
        bgRow={2}
        pointer
        entryPerView
        buttonAdd={true}
        handleAdd={() => handleMenu(1)}
        data={data?.getSuppliersForCompany}
        labelBtn='Supplier'
        renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section columnWidth={titles} key={i}>
          <Content>
            <Text> {i + 1}</Text>
          </Content>
          <Content>
            <Text> {elem.sName}</Text>
          </Content>
          <Content>
            <Text> {elem.sCurrency.cName}-{elem.sCurrency.cDescription}</Text>
          </Content>
          <Content>
            <div padding='0px' direction='row'>
            <Link href={{ pathname: 'supplier', query: { sName: elem.sName, cID: elem.sCurrency._id, id: elem._id, view: true } }}>
              <Button color={1} onClick={() => HandleClickEdit({ ...elem, view: 1 })}>
                <a>View</a>
              </Button>
            </Link>
            <Button color={2} onClick={() => handleDelete({ ...elem })}>
              Delete
            </Button>
            <Link href={{ pathname: 'supplier', query: { sName: elem.sName, cID: elem.sCurrency._id, id: elem._id, edit: true } }}>
              <Button color={1} onClick={() => HandleClickEdit({ ...elem, view: 2 })}>
                <a>Edit</a>
              </Button>
            </Link>
          </div>
          </Content>
        </Section>)}

      />
    </Container>
  )
}

SupplierCo.propTypes = {

}
