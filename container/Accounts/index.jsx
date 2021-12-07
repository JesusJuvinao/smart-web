import { useLazyQuery, useMutation } from '@apollo/client'
import { useContext, useEffect } from 'react'
import { Table } from '../../components/Table'
import { Section } from '../../components/Table/styled'
import { Loading } from '../../components/Loading/index'
import { Context } from '../../context'
import { GET_ALL_ACCOUNT } from '../graphql/queries'
import { DELETE_ONE_ACCOUNT } from './queries'
import Link from 'next/link'
import { Button, Container, Content, Text } from './styled'
export const Accounts = () => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  const [getAllAccount, { data, loading }] = useLazyQuery(GET_ALL_ACCOUNT, { variables: { idComp: company.idLasComp && company.idLasComp }, fetchPolicy: 'cache-and-network' })
  const [DeleteOneAccounts] = useMutation(DELETE_ONE_ACCOUNT)
  // Handles
  const handleDelete = async (elem) => {
    const { _id } = elem
    const results = await DeleteOneAccounts({
      variables: { id: _id },
      update (cache) {
        cache.modify({
          fields: {
            getAllAccount (dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_ACCOUNT, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  // Effects
  useEffect(() => getAllAccount(), [company.idLasComp])
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
  console.log(data)
  if (loading) return <Loading />
  return (<Container>
    <Table
      titles={[
        { name: '#', width: '10%' },
        { name: 'Name', width: '16%' },
        { name: 'Type', width: '16%' },
        { name: 'Description', width: '16%' },
        { name: 'Balance', width: '16%' },
        { name: 'Action', width: '20%' }
      ]}
      bgRow={2}
      pointer
      labelBtn='Account'
      entryPerView
      buttonAdd={true}
      handleAdd={() => handleMenu(3)}
      data={data?.getAllAccount}
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
            <Link href={{ pathname: 'accounts', query: { aName: elem.aName, aDescription: elem.aDescription, aBalance: elem.aBalance, aType: elem.aType, view: true } }}>
              <Button color={1} onClick={() => HandleClickEdit({ ...elem, view: 1 })}>
                <a>Edit</a>
              </Button>
            </Link>
            <Button color={2} onClick={() => handleDelete({ ...elem })}>
              Delete
            </Button>
            <Link href={{ pathname: 'accounts', query: { aName: elem.aName, aDescription: elem.aDescription, aBalance: elem.aBalance, aType: elem.aType, id: elem._id, edit: true } }}>
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
