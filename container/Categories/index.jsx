import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { Table } from '../../components/Table'
import { Section } from '../../components/Table/styled'
import { Loading } from '../../components/Loading/index'
import { Context } from '../../context'
import { GET_ALL_CATEGORIES } from '../graphql/queries'
import { DELETE_ONE_CATEGORIES } from './queries'
import { Button, Container, Content, Text } from './styled'
export const Categories = () => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  const [getCategoryForCompany, { data, loading }] = useLazyQuery(GET_ALL_CATEGORIES, { variables: { idComp: company.idLasComp && company.idLasComp }, fetchPolicy: 'cache-and-network' })
  const [DeleteOneCategories] = useMutation(DELETE_ONE_CATEGORIES)
  // Handles
  const handleDelete = async (elem) => {
    const { _id } = elem
    console.log(_id)
    const results = await DeleteOneCategories({
      variables: { id: _id },
      update (cache) {
        cache.modify({
          fields: {
            getCategoryForCompany (dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_CATEGORIES, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  // Effects
  useEffect(() => getCategoryForCompany(), [company.idLasComp])
  const HandleClickEdit = (item) => {
    // create func
    if (item.view === 1) {
      handleMenu(6)
      // edit func
    } else if (item.view === 2) {
      handleMenu(6)
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
        { name: 'Description', width: '1fr' },
        { name: 'Action', width: '1fr' }
      ]}
      bgRow={2}
      pointer
      labelBtn='Categories'
      entryPerView
      buttonAdd={true}
      handleAdd={() => handleMenu(6)}
      data={data?.getCategoryForCompany}
      renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section columnWidth={titles} key={i}>
        <Content>
          <Text>{i + 1}</Text>
        </Content>
        <Content>
          <Text>{elem.cName}</Text>
        </Content>
        <Content>
          <Text> {elem.cDescription}</Text>
        </Content>
        <Content>
          <div padding='0px' direction='row'>
            <Link href={{ pathname: 'categories', query: { ...elem, view: true } }}>
              <Button color={1} onClick={() => HandleClickEdit({ ...elem, view: 1 })}>
                <a>View</a>
              </Button>
            </Link>
            <Button color={2} onClick={() => handleDelete({ ...elem })}>
              Delete
            </Button>
            <Link href={{ pathname: 'categories', query: { ...elem, edit: true } }}>
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
