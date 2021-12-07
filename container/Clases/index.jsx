import React, { useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Container, Content, Text, ContentTableItem, TableButton } from './styled'
import { Table } from '../../components/Table'
import Link from 'next/link'
import { Section } from '../../components/Table/styled'
import { Context } from '../../context'
import { ALL_CLASS_FOR_COMPANY, DELETE_ONE_CLASS } from './queries'
import { APColor, EColor, SEGColor } from '../../public/colors'

export const ClasesC = () => {
  const { setAlertBox, handleMenu, company } = useContext(Context)
  // const { state, setState } = useSetState(false)
  const { data } = useQuery(ALL_CLASS_FOR_COMPANY, {
    variables: { idComp: company.idLasComp ? company.idLasComp : null },
    fetchPolicy: 'cache-and-network'
  })
  const HandleClickEdit = (item) => {
    // create func
    if (item.view === 1) {
      handleMenu(7)
      // edit func
    } else if (item.view === 2) {
      handleMenu(7)
      // id = item._id
      // View func
    }
  }
  const [DeleteOneClass] = useMutation(DELETE_ONE_CLASS)
  const handleDelete = async (elem) => {
    const { _id } = elem
    const results = await DeleteOneClass({
      variables: { id: _id },
      update (cache) {
        cache.modify({
          fields: {
            getClass (dataOld = []) {
              return cache.writeQuery({ query: ALL_CLASS_FOR_COMPANY, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  return (
    <Container>
    {/* {loading && <Loading />} */}
    <Text margin='30px 0px 30px' size='20px'>Register Class</Text>
    <Table
      titles={[
        { name: '#', width: '1fr' },
        { name: 'Class Name', width: '1fr' },
        { name: 'Sub Class', width: '1fr' },
        { name: 'Class Active', width: '1fr' },
        { name: 'Action', width: '1fr', justify: 'center' }
      ]}
      bgRow={2}
      pointer
      entryPerView
      buttonAdd={true}
      handleAdd={() => handleMenu(7)}
      data={data?.getClass}
      labelBtn='Class'
      renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section columnWidth={titles} key={i}>
        <Content>
          <Text> {i + 1}</Text>
        </Content>
        <Content>
          <Text> {elem.className}</Text>
        </Content>
        <Content>
          <Text> {elem.SubClass}</Text>
        </Content>
        <Content>
          <Text>{elem.classActive} </Text>
        </Content>
        <Content>
        <ContentTableItem padding='0px' direction='row'>
            <Link href={{ pathname: 'clases', query: { className: elem.className, SubClass: elem.SubClass, id: elem._id, view: true } }}>
              <TableButton color={SEGColor} onClick={() => HandleClickEdit({ ...elem, view: 1 })}>
                View
              </TableButton>
            </Link>
              <TableButton backgroundColor={'#f800001e'} color={EColor} onClick={() => handleDelete({ ...elem })}>
                Delete
              </TableButton>
              <Link href={{  pathname: 'clases', query: { className: elem.className, SubClass: elem.SubClass, id: elem._id, edit: true } }}>
              <TableButton color={APColor} onClick={() => HandleClickEdit({ ...elem, view: 2 })}>
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
