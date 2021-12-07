import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../../context'
import { useMutation, useQuery } from '@apollo/client'
import { CHANGE_INFO_USER, GET_USER, SEND_EMAIL_CONFIRMATION } from './queries'
import { useSetState } from '../../components/hooks/useState'
import { IconFacebook, IconInstagram, IconTwitter } from '@/public/icons'
import InputHooks from '@/components/InputHooks/InputHooks'
import { RippleButton } from '@/components/Ripple'
import { HorizontalBarChart } from '@/components/Chart'
import { ShadowCard } from '@/components/ShadowCard'
import { LateralMenu } from '@/components/common/LateralMenu'
import { PColor, PVColor } from '@/public/colors'
import { useFormTools } from '@/components/hooks/useForm'
import { AwesomeModal } from '../../components/AwesomeModal'
import { SpinnerColorJust, Loading } from '@/components/Loading'
import { Avatar, CardPrimary, Container, Content, ContentInfo, CtnIcon, Text, Card, InputDate, ImgUser, Form } from './styled'
import CountdownApp from '@/components/hooks/useSetInterval'
import { useRouter } from 'next/router'
import { useCompanyHook } from '../../container/dashboard'

export const ProfileC = ({ login, token }) => {
  // State
  const router = useRouter()
  const [status, component, handleStart] = CountdownApp()
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const [step, setStep] = useState(0)
  const { setAlertBox, isSession } = useContext(Context)
  const [UpdateUser, { loading: loadingUpdate }] = useMutation(CHANGE_INFO_USER)
  const { state, setState } = useSetState(false)
  const [baseImage, setBaseImage] = useState('')
  const fileInputRef = useRef(null)
  const [data, { loading }] = useUser()
  const [openModal, setOpenModal] = useState(data?.userConfirmEmail === 0)
  // EFFECT
  useEffect(() => {
    for (let i = 0; i < data?.role?.length; i++) {
      // eslint-disable-next-line no-constant-condition
      if (data?.role[i].name === 'admin') {
        router.push('/dashboard/admin')
        console.log(data?.role[i].name)
      }
    }
  }, [data])
  // useEffect(() => data?.role?.name !== 1 && router.push('/dashboard/admin'), [data])
  const [sendEmailConfirmation, { loading: loadingSendEmail }] = useMutation(SEND_EMAIL_CONFIRMATION)

  const onTargetClick = () => {
    fileInputRef?.current?.click()
  }
  const HandleSendEmail = async () => {
    await sendEmailConfirmation({
      variables: { uEmail: data.uEmail, userName: data.uEmail }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    handleStart()
  }
  const uploadImage = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    const array = base64.split(',')
    setBaseImage(array[1])
    setBaseImage(base64)
  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader?.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  const handleForm = (e, show) => handleSubmit({
    event: e,
    action: () => UpdateUser({
      variables: {
        input: {
          step: step
        }
      }
    }),
    actionAfterSuccess: () => {
      setDataValue({})
    }
  })
  if (loading || loadingUpdate) return <Loading />
  return (
    <Container>
      <AwesomeModal padding={'20px'} show={openModal} title='Verify email' onHide={() => setOpenModal(false)} onCancel={() => false} size='small' btnCancel={false} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
        <div style={{ display: 'grid', portalContent: 'center', padding: '20px' }}>
          <RippleButton bgColor={PVColor} minHeight='50px' disabled={status === 'Started'} border='3px' margin='30px 0px' type='submit' onClick={() => status !== 'Started' && HandleSendEmail()}>{status === 'Started' ? component : 'Send Email'}</RippleButton>
        </div>
      </AwesomeModal>
      <Container>
        <Content><Card width='30%'>
          <ShadowCard>
            <CardPrimary bgColor='#d4dbf9' padding='15px 10px 40px'>
              <Text>Welcome Back ! </Text>
              <Text size='12px'>{data?.userName} </Text>
            </CardPrimary>
            <CardPrimary padding='15px 10px'>
              <Avatar src={data?.uAvatar} onClick={() => isSession && setState(!state)} />
              <Text margin='25px 0px' size='12px'>Link to the useContext hook when authentication is working! </Text>
            </CardPrimary>
          </ShadowCard>
          <ShadowCard>
            <CardPrimary padding='15px 10px'>
              <Text>Social Source </Text>
              <Text size='12px'>Get the name from the JWT token.....when use is logged in </Text>
              <ContentInfo gap='10px'>
                <div><IconFacebook size='30px' color={PColor} /> </div>
                <div><IconTwitter size='30px' color={PColor} /> </div>
                <div><IconInstagram size='30px' color={PColor} /> </div>
              </ContentInfo>
            </CardPrimary>
          </ShadowCard>
          <ShadowCard>
            <CardPrimary padding='15px 10px'>
              <span>
              </span>
              <form onSubmit={e => (handleForm(e))}>
                <Text>Change password </Text>
                <InputHooks width='100%' title='currentPassword' required error={errorForm?.currentPassword} value={dataForm?.currentPassword} onChange={handleChange} name='currentPassword' />
                <InputHooks width='100%' title='currentPassword' required error={dataForm?.newPassword} value={dataForm?.newPassword} onChange={handleChange} name='newPassword' />
                <RippleButton widthButton='100%' type='submit'>Save</RippleButton>
              </form>
              <form onSubmit={e => (handleForm(e))}>
                <Text>Change LastName  </Text>
                <InputHooks width='100%' title='lastName' required error={errorForm?.lastName} value={dataForm?.lastName} onChange={handleChange} name='lastName' />
                <InputHooks width='100%' title='Address' required error={dataForm?.uAddress} defaultValue={`${data?.uEmail}`} value={data?.uAddress || dataForm?.uAddress} onChange={handleChange} name='uAddress' />
                <RippleButton widthButton='100%' type='submit' onClick={() => setStep(3)}>Save</RippleButton>
              </form>
              <form onSubmit={e => (handleForm(e))}>
                <Text>Change Number </Text>
                <InputHooks width='100%' type='date' title='uBirthday' required error={errorForm?.uBirthday} value={dataForm?.uBirthday} onChange={handleChange} name='uBirthday' defaultValue={data?.uBirthday} />
                <RippleButton widthButton='100%' type='submit' onClick={() => setStep(4)}>Save</RippleButton>
              </form>
              <HorizontalBarChart />
            </CardPrimary>
          </ShadowCard>
        </Card>
          <Card width='65%'>
            <ContentInfo gap={'10px'}>
              <ShadowCard>
                <CardPrimary direction='row' padding='0.5rem'>
                  <Text size='12px'>Last 30 Days Total Bills </Text>
                  <Text size='12px'>Number of bills entered: </Text>
                  <Text size='12px'>Total Amount of Bills entered: £</Text>
                  <CtnIcon></CtnIcon>
                </CardPrimary>
              </ShadowCard>
              <ShadowCard>
                <CardPrimary direction='row' padding='0.5rem'>
                  <Text size='12px'>Last 30 Days Total Sales </Text>
                  <Text size='12px'>Number of sales entered: </Text>
                  <Text size='12px'>Total Amount of Sales entered: £</Text>
                  <CtnIcon></CtnIcon>
                </CardPrimary>
              </ShadowCard>
              <ShadowCard>
                <CardPrimary direction='row' padding='0.5rem'>
                  <Text size='12px'>Top 10 Customers </Text>
                  <Text size='12px'>Top 10 Suppliers</Text>
                  <CtnIcon></CtnIcon>
                </CardPrimary>
              </ShadowCard>
            </ContentInfo>
            {/* <TableBilling /> */}
          </Card>
          <LateralMenu show={state} title={'Change photo'} onCancel={() => setState(false)} onHide={() => setState(false)} backdrop btnConfirm={false} header={false} footer={false} padding='20px'>
            <Form onSubmit={e => (handleForm(e))}>
              <InputDate
                img
                type="file"
                ref={fileInputRef}
                onClick={onTargetClick}
                accept="image/*"
                onChange={(e) => {
                  uploadImage(e)
                }}
              />
              {/* <IconImg color='#ccc' size='200px'/> */}
              <ImgUser
                src={`${data?.uAvatar}`}
                objectFit="cover"
                alt="Picture of the author"
                width={500}
                onClick={onTargetClick}
                height={100}
                onChange={(e) => {
                  uploadImage(e)
                }}
              />
              <RippleButton widthButton='100%' type='submit' onClick={() => setStep(5)}>Save</RippleButton>
            </Form>
            <Card width='100%' padding='20px'>
            </Card>
          </LateralMenu>
        </Content>
      </Container >
    </Container>
  )
}

export const useUser = () => {
  const { setAlertBox, setSessionActive } = useContext(Context)
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_USER, {
    onCompleted: () => {
      const dataUser = data.getUser
      setSessionActive(true)
      setSessionActive({ data: dataUser })
    },
    onError: (err) => setAlertBox({ message: `${err}`, duration: 8000 })
  })
  return [data?.getUser, { loading, error }]
}

ProfileC.propTypes = {
  login: PropTypes.string,
  token: PropTypes.string
}
