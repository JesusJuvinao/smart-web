import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Content, ContentImg, FooterModal, Img, Text } from './styled'
import { dateFormat } from '../../utils'
import Link from 'next/link'
import { BColor, BGColor, SEGColor } from '../../public/colors'
import { Section } from '../../components/Table/styled'
import { Table } from '../../components/Table'
import { useFormTools } from '../../components/hooks/useForm'
import { IconImg } from '../../public/icons'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_ALL_ATTACHMENTS, DELETE_ONE_FILE, UPDATE_ONE_ATTACHMENTS, EDIT_ONE_ATTACHMENTS, DELETE_ONE_FILE_MINIO_CLIENT, GET_ALL_FILE_MINIO } from './queries'
import { Context } from '../../context'
import { useUser } from '../Profile'
import { Loading } from '../../components/Loading'
import { InputFiles } from '../../components/InputFilesPrev'
import { useSetState } from '../../components/hooks/useState'
import { RippleButton } from '../../components/Ripple'
import { AwesomeModal } from '../../components/AwesomeModal'
import InputHooks from '../../components/InputHooks/InputHooks'
import { GET_ALL_LINKS_FILES, UPLOAD_FILE } from '../Bills/queries'
import { icons } from '../../components/common/mimetype'

export const AttachmentsC = () => {
  // States
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const { setAlertBox, company } = useContext(Context)
  const Files = useSetState([])
  const Reset = useSetState(false)
  const stateModal = useSetState(false)
  const isEdit = useSetState(false)
  const FileNameLink = useSetState()

  // query's
  const [dataUser] = useUser()
  const [getAllFilesLinkToBills, { data: dataLink }] = useLazyQuery(GET_ALL_LINKS_FILES, { variables: { fileName: FileNameLink.state ? FileNameLink.state : null }, fetchPolicy: 'cache-and-network' })
  const [deleteOneFileMinio] = useMutation(DELETE_ONE_FILE_MINIO_CLIENT)
  const [DeleteOneFile] = useMutation(DELETE_ONE_FILE)
  const [uploadFileMultiple] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => setAlertBox({ message: 'Files uploaded successfully', duration: 8000 }),
    onError: (data) => setAlertBox({ message: 'Error uploading files', duration: 8000 }),
    update(cache) {
      cache.modify({
        fields: {
          getAllAttachment(dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_ATTACHMENTS, data: dataOld })
          }
        }
      })
    }
  })
  const [setAttachment] = useMutation(UPDATE_ONE_ATTACHMENTS, {
    onError: () => setAlertBox({ message: 'Error show files', duration: 8000 }),
    update(cache) {
      cache.modify({
        fields: {
          getAllAttachment(dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_ATTACHMENTS, data: dataOld })
          }
        }
      })
    }
  })
  const HandleClickEdit = (item) => {
    // create func
    if (item.view === 1) {
      // edit func
    } else if (item.view === 2) {
      stateModal.setState(!stateModal.state)
      isEdit.setState(!isEdit.state)
      setDataValue({
        id: item.id,
        filename: item.filename,
        Notes: item.Notes
      })
      // id = item._id
    }
  }
  const [getAllAttachment, { data, loading }] = useLazyQuery(GET_ALL_ATTACHMENTS, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  // EFFECT
  useEffect(() => getAllAttachment(), [company.idLasComp])
  useEffect(() => getAllFilesLinkToBills(), [company.idLasComp])
  // Handles
  const handleDelete = async (elem) => {
    const { _id, filename } = elem
    const results = await DeleteOneFile({
      variables: { id: _id },
      update(cache) {
        cache.modify({
          fields: {
            getAllAttachment(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_ATTACHMENTS, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    await deleteOneFileMinio({
      variables: { fileName: filename },
      update(cache) {
        cache.modify({
          fields: {
            getAllFilesToBills(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_FILE_MINIO, data: dataOld })
            }
          }
        })
      }
    })
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }

  const newFiles = Array.from(Files.state).map(x => ({ filename: x.name, aSize: x.size, mimetype: x.type }))
  const handleForm = (e, show) => handleSubmit({
    event: e,
    action: () => {
      console.log(show)
      if (show === 1) {
        return setAttachment({
          variables: {
            input: {
              filesData: newFiles
            }
          }
        })
      }
    },
    actionAfterSuccess: () => {
      setDataValue({})
    }
  })
  const handleFileChange = async (paramFiles) => {
    Files.setState(paramFiles)
  }
  const handleSubmitFile = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    for (let i = 0; i < Files.state.length; i++) {
      Reset.setState(true)
      try {
        const res = await uploadFileMultiple({ variables: { file: Files.state[i], input: { aSize: Files.state[i].size } } })
        Reset.setState(!Reset)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const getFileUrl = async (data) => {
    const { filename } = data
    FileNameLink.setState(filename)
    getAllFilesLinkToBills()
    if (dataLink) {
      const link = !!dataLink && await dataLink?.getAllFilesLinkToBills?.message
      setTimeout(() => { window.open(link) }, 300)
    }
  }
  useEffect(() => {
    getAllFilesLinkToBills()
  }, [data, dataLink])
  if (loading) return <Loading />
  return (
    <Container>
      <form onSubmit={handleSubmitFile}>
        <InputFiles Disable={null} onChange={handleFileChange} reset={Reset.state} />
        <RippleButton type="submit" margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular'>Upload</RippleButton>
      </form>
      <Table
        titles={[
          { name: '#', width: '.1fr' },
          { name: 'THUMBNAIL', width: '12.5%', arrow: true, key: 'mimetype' },
          { name: 'TYPE', width: '12.5%', arrow: true, key: 'mimetype' },
          { name: 'NAME', width: '12.5%', arrow: true, key: 'mimetype' },
          { name: 'SIZE', width: '12.5%', arrow: true, key: 'mimetype' },
          { name: 'UPLOADED', width: '12.5%', arrow: true, key: 'mimetype' },
          { name: 'LINKS', width: '12.5%', arrow: true, key: 'mimetype' },
          { name: 'ACTION', width: '1fr', arrow: true, key: 'mimetype' }
        ]}
        bgRow={2}
        pointer
        labelBtn='Bills'
        entryPerView
        data={data?.getAllAttachment}
        renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section columnWidth={titles} key={i}>
          <Content>
            <Text>{i + 1}</Text>
          </Content>
          <Content>
            <ContentImg>
              <Options icon={icons.find(j => j?.ext == elem?.mimetype)?.icon} ></Options>
            </ContentImg>
            <Text width='fit-content'> {elem.bDescription}</Text>
          </Content>
          <Content>
            <Text> {elem.mimetype}</Text>
          </Content>
          <Content onClick={() => getFileUrl({ filename: elem.filename })} onMouseOver={() => getAllFilesLinkToBills()} >
            <Text cursor >  {elem.filename}</Text>
          </Content>
          <Content>
            <Text> {elem.aSize}</Text>
          </Content>
          <Content>
            <Text>{dateFormat(elem.createdAt)}</Text>
          </Content>
          <Content>
            <Link href={{ pathname: 'bills', query: { IdBills: elem.IdBills, view: true } }}>
              <Button color={SEGColor} >
                {elem.IdBills ? <a>Bill</a> : elem.SalesLink ? <a>Sales</a> : <a></a>}
              </Button>
            </Link>
          </Content>
          <Content>
            <div padding='0px' direction='row'>
              <Link href={{ pathname: 'attachments', query: { IdBills: elem.IdBills, view: true } }}>
                <Button border color={SEGColor} onClick={() => getFileUrl({ filename: elem.filename })}>
                  Download
                </Button>
              </Link>
              <Button border color={2} onClick={() => handleDelete({ ...elem })}>
                Delete
              </Button>
            </div>
          </Content>

        </Section>)}
      />
      <AwesomeModal hideOnConfirm={false} backdrop padding='35px 20px' show={stateModal.state} title={'Edit Attachments'} onHide={() => { stateModal.setState(!stateModal.state); Reset.setState(true); isEdit.setState(!isEdit.state) }} onCancel={() => false} submit={true} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='5px' >
        <form onSubmit={e => (handleForm(e, 2))}>
          <InputHooks title='Bill ref.' required errors={errorForm?.filename} value={dataForm?.filename} onChange={handleChange} name='filename' />
          <InputHooks title='Notes.' TypeTextarea required errors={errorForm?.Notes} maxWidth='200px' minWidth='200px' minHeight='200px' value={dataForm?.Notes} onChange={handleChange} name='Notes' />
          <FooterModal>
            <Button bgColor={BGColor} border type='button' onClick={() => stateModal.setState(!stateModal.state)}>
              Cancel
            </Button>
            <Button bgColor={BGColor} border type='submit'>
              Update
            </Button>
          </FooterModal>
        </form>
      </AwesomeModal>
    </Container>
  )
}

const Options = ({ icon, name }) => {
  return (
    <React.Fragment>
      <div>
        {icon}
      </div>
    </React.Fragment>
  )
}
Options.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string

}
AttachmentsC.propTypes = {
  rows: PropTypes.array

}
