import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { Table } from '../../components/Table'
import { Section } from '../../components/Table/styled'
import { Loading } from '../../components/Loading/index'
import { Context } from '../../context'
import { GET_ALL_ACCOUNT } from '../graphql/queries'
import { DELETE_ONE_ACCOUNT, GET_ALL_TAXES } from './queries'
import Link from 'next/link'
import { Button, Container, Content, Text } from './styled'
export const Taxes = () => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  const [getAllTax, { data, loading }] = useLazyQuery(GET_ALL_TAXES, { variables: { idComp: company.idLasComp && company.idLasComp }, fetchPolicy: 'cache-and-network' })
  const [DeleteOneAccounts] = useMutation(DELETE_ONE_ACCOUNT)
  // Handles
  const handleDelete = async (elem) => {
    const { _id } = elem
    const results = await DeleteOneAccounts({
      variables: { id: _id },
      update (cache) {
        cache.modify({
          fields: {
            getAllTax (dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_ACCOUNT, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  // Effects
  useEffect(() => getAllTax(), [company.idLasComp])
  const HandleClickEdit = (item) => {
    // create func
    if (item.view === 1) {
      handleMenu(3)
      // edit func
    } else if (item.view === 2) {
      handleMenu(3)
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
        { name: 'Type', width: '1fr' },
        { name: 'Description', width: '1fr' },
        { name: 'Balance', width: '1fr' },
        { name: 'Action', width: '1fr' }
      ]}
      bgRow={2}
      pointer
      labelBtn='Account'
      entryPerView
      buttonAdd={true}
      handleAdd={() => handleMenu(3)}
      data={data?.getAllTax}
      renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section columnWidth={titles} key={i}>
        <Content>
          <Text>{i + 1}</Text>
        </Content>
        <Content>
          <Text>{elem.aName}</Text>
        </Content>
        <Content>
          <Text> {elem.aType}</Text>
        </Content>
        <Content>
          <Text> {elem.aDescription}</Text>
        </Content>
        <Content>
          <Text> {elem.aBalance}</Text>
        </Content>
        <Content>
          <div padding='0px' direction='row'>
            <Link href={{ pathname: 'accounts', query: { ...elem, edit: true } }}>
              <Button color={1} onClick={() => HandleClickEdit({ ...elem, view: 1 })}>
                <a>Edit</a>
              </Button>
            </Link>
            <Button color={2} onClick={() => handleDelete({ ...elem })}>
              Delete
            </Button>
            <Link href={{ pathname: 'accounts', query: { ...elem, edit: true } }}>
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
