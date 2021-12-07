import React, { useContext, useRef, useState } from 'react'
import { Loading } from '../../components/Loading/index'
import { Context } from '../../context'
import { Button, Card, Container, ContainerCard, Content, FooterModal, Header, Text } from './styled'
import EmailEditor from 'react-email-editor'
import { AwesomeModal } from '../../components/AwesomeModal'
import { EColor, WColor } from '../../public/colors'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_ONE_TEMPLATE, GET_ALL_TEMPLATE } from './queries'
import { useUser } from '../Profile'
export const EmailBuilder = () => {
  const [dataUser] = useUser()
  const { setAlertBox, company } = useContext(Context)
  // QUERYS
  const { data: dataHtml } = useQuery(GET_ALL_TEMPLATE)
  // STATES
  const emailEditorRef = useRef(null)
  // Handles
  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { /* design, */ html } = data
      setModal(true)
      setHtml(html)
    })
  }
  const [modal, setModal] = useState(false)
  const [Html, setHtml] = useState('')
  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  }

  const onReady = () => {
    // editor is ready
    console.log('onReady')
  }
  const htmlFromCMS = `${Html}`
  const [registerEmailsTemplate, { loading }] = useMutation(DELETE_ONE_TEMPLATE, {
    onError: (error) => {
      setAlertBox({
        message: error.graphQLErrors[0].message,
        color: 'error'
      })
    },
    onCompleted: data => {
      setAlertBox({
        message: 'Success',
        color: 'success'
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          getAllEmailsTemplate(dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_TEMPLATE, data: dataOld })
          }
        }
      })
    }
  })

  const handleSubmit = async () => {
    return registerEmailsTemplate({ variables: { input: { TempEmailName: htmlFromCMS, TemStatus: 1, idComp: company.idLasComp } } }).catch(err => setAlertBox({ message: err?.message, color: WColor }))
  }
  if (loading) return <Loading />
  return (<Container>
    <Header>
      <Button bgColor={EColor} border onClick={exportHtml}>Export HTML</Button>
      <Button bgColor={EColor} border onClick={() => setHtml('')}>Reset HTML</Button>
    </Header>
    <Text>
    </Text>
    <Content>
      <EmailEditor style={{ height: '90vh' }} ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </Content>
    <AwesomeModal height='100vh' show={modal} title='HTML EMAIL BUILD' onHide={() => setModal(false)} onCancel={() => false} size='large' btnCancel={false} btnConfirm={false} header={true} footer={false} borderRadius='0' >
      <div contentEditable='false' dangerouslySetInnerHTML={{ __html: htmlFromCMS }} />
      <FooterModal>
        <Button bgColor={EColor} border onClick={() => setHtml('')}>Reset HTML</Button>
        <Button bgColor={EColor} border onClick={() => handleSubmit()}>Save Template</Button>
      </FooterModal>
    </AwesomeModal>
    <ContainerCard>
      {dataHtml && dataHtml?.getAllEmailsTemplate?.map((x, i) =>
        <div key={x._id}>
          <Card contentEditable='false' dangerouslySetInnerHTML={{ __html: x.TempEmailName }} />
        </div>
      )}
    </ContainerCard>
  </Container>
  )
}
