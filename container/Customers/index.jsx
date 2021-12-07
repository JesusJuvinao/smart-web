import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { Table } from '../../components/Table'
import { Section } from '../../components/Table/styled'
import { Loading } from '../../components/Loading/index'
import { Context } from '../../context'
import { GET_ALL_IVA } from '../graphql/queries'
import { DELETE_ONE_IVA } from './queries'
import Link from 'next/link'
import { Button, Container, Content, Text } from './styled'
export const Customers = () => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  const [getAllIva, { data, loading }] = useLazyQuery(GET_ALL_IVA, { variables: { idComp: company.idLasComp && company.idLasComp }, fetchPolicy: 'cache-and-network' })
  const [DeleteOneIva] = useMutation(DELETE_ONE_IVA)
  // Handles
  const handleDelete = async (elem) => {
    const { _id } = elem
    const results = await DeleteOneIva({
      variables: { id: _id },
      update (cache) {
        cache.modify({
          fields: {
            getAllIva (dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_IVA, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  // Effects
  useEffect(() => getAllIva(), [company.idLasComp])
  const HandleClickEdit = (item) => {
    // create func
    if (item.view === 1) {
      handleMenu(2)
      // edit func
    } else if (item.view === 2) {
      handleMenu(2)
      // id = item._id
      // View func
    }
  }
  if (loading) return <Loading />
  return (<Container>
    <Table
      titles={[
        { name: '#', width: '1fr' },
        { name: 'Name', width: '1fr' },
        { name: 'Percentage', width: '1fr' },
        { name: 'Ref', width: '1fr' },
        { name: '', width: '1fr' }
      ]}
      bgRow={2}
      pointer
      labelBtn='Vat'
      entryPerView
      buttonAdd={true}
      handleAdd={() => handleMenu(2)}
      data={data?.getAllIva}
      renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section columnWidth={titles} key={i}>
        <Content>
          <Text>{i + 1}</Text>
        </Content>
        <Content>
          <Text>{elem.IName}</Text>
        </Content>
        <Content>
          <Text> {elem.iPercentage}</Text>
        </Content>
        <Content>
          <Text> {elem.idRefIva}</Text>
        </Content>
        <Content>
          <div padding='0px' direction='row'>
            <Link href={{ pathname: 'vat', query: { IName: elem.IName, iPercentage: elem.iPercentage, id: elem._id, view: true } }}>
              <Button color={1} onClick={() => HandleClickEdit({ ...elem, view: 1 })}>
                <a>View</a>
              </Button>
            </Link>
            <Button color={2} onClick={() => handleDelete({ ...elem })}>
              Delete
            </Button>
            <Link href={{ pathname: 'vat', query: { IName: elem.IName, iPercentage: elem.iPercentage, id: elem._id, edit: true } }}>
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
