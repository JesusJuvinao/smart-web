import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { URL_BASE } from '../../apollo/urls'
import { ButtonHook } from '../../components/ButtonHook'
import InputHooks from '../../components/InputHooks/InputHooks'
import Link from 'next/link'
import { Context } from '../../context'
import fetchJson from '../../pages/api/lib/hooks/fetchJson'
import { IconInfo, IconLogo } from '../../public/icons'
import { VALIDATE_EXISTING } from './queries'
import { Anchor, Container, ContentInfo, ContentTerms, Form, ImgTaken, Info, InputDate, Line, Logo, Text, Tooltip, FooterComponent, DivInputs } from './styled'
import { BGColor, SCColor } from '../../public/colors'
import { LoadEllipsis } from '../../components/Loading'

export const RegisterUserC = () => {
  // State
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)
  const [result, setResult] = useState('')
  const [input, setInput] = useState([])
  const router = useRouter()
  const [baseImage, setBaseImage] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const { setAlertBox } = useContext(Context)
  //   Handles
  const handleChecked = (event) => {
    setIsChecked(event.target.checked)
  }
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  /**
   * function to show utl of the image and convert the file to Base 64
   * @param {*} e events
   */
  function treat(e) {
    const { files } = e.target
    const images = []
    const selected = [...[...files]]
    selected.forEach(i => images.push(URL.createObjectURL(i)))
    setInput(images)
    const reader = new FileReader()
    reader.addEventListener('load', () => setResult(reader.result))
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
  const onTargetClick = () => {
    fileInputRef?.current?.click()
  }
  // const uAvatar = baseImage.trim()
  const body = {
    userName: values.userName,
    uEmail: values.uEmail,
    uPassword: values.uPassword
  }
  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      await fetchJson(`${URL_BASE}auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(res => {
          if (res) {
            router.push('/switch-options')
          }
          setAlertBox({
            message: `${res?.message}`,
            duration: 300000,
            color: 'success'
          })
          if (res.success === 0) {
            setAlertBox({
              message: 'Incorrect username or password',
              duration: 300000,
              color: 'error'
            })
          }
        })
        .catch(e => {
          setAlertBox({
            message: 'Sorry, an internal error occurred',
            duration: 300000,
            color: 'error'
          })
        })
    } catch (error) {
      setAlertBox({
        message: `${error}`,
        duration: 30000,
        color: 'error'
      })
    }
  }
  const [verifyRegistration, { loading: loadingValidate, data: dataValidate }] = useLazyQuery(VALIDATE_EXISTING, { fetchPolicy: 'network-only' })
  const handleBlur = e => {
    e.target.value && verifyRegistration({ variables: { uEmail: e.target.value } })
  }
  const loading = loadingValidate
  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <InputDate
          img
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => {
            uploadImage(e)
          }}
        />
        <Text size='30px'>Sign in</Text>
        <ContentInfo>
          {baseImage.length
            ? <ImgTaken src={baseImage} atl='Img User' onClick={onTargetClick} />
            : <ImgTaken src={'/images/logo.png'} atl='Img User' onClick={onTargetClick} />}
          <Tooltip>
            <IconInfo size='20px' />
            <Info>upload profile picture</Info>
          </Tooltip>
        </ContentInfo>
        <Link href='/'><Anchor margin><Text size='12px'> What is Smart Accounting ?</Text> Learn more</Anchor>
        </Link>
        <Line>
        </Line>
        <DivInputs>
        <InputHooks
          title='Email'
          required
          error={errors?.uEmail}
          value={values?.uEmail}
          onBlur={handleBlur}
          onChange={handleChange}
          name='uEmail'
          width='50%'
        />
        <InputHooks
          title='username'
          error={errors?.userName}
          value={values?.userName}
          onChange={handleChange}
          name='userName'
          required
          width='50%'

        />
        <InputHooks
          title='Password'
          pass
          type='password'
          error={errors?.uPassword}
          value={values?.uPassword}
          onChange={handleChange}
          name='uPassword'
          width='50%'
        />
        <InputHooks name="ConfirmPassword"
          value={values?.ConfirmPassword}
          error={errors?.ConfirmPassword}
          onChange={handleChange}
          type="password"
          title="Confirm Password"
          required
          pass
          range={{ min: 0, max: 180 }}
          passConfirm={{ validate: true, passValue: values?.uPassword }}
          width='50%'
        />
        </DivInputs>
        <Line>
        </Line>
        <ContentTerms>
          <span> <Text size='12px'> By selecting Login with email I accept the </Text>{<Link href='/terms_and_conditions'>
            <Anchor>Terms and conditions of use </Anchor>
          </Link>}<Text size='12px'> and has read our</Text> <Link href='/terms_and_conditions'>
              <Anchor>Global Privacy Statement. </Anchor>
            </Link> </span>
        </ContentTerms>
        <ButtonHook bgColor={SCColor} disabled={!values?.ConfirmPassword} padding='10px' margin='15px 0px' width='100%' type='submit' >{loading ? <LoadEllipsis /> : 'Register'}</ButtonHook>
        <Text size='12px'> you already have a Smart account ?</Text>
        <Link href='/login'><Anchor>Log in</Anchor>
        </Link>
        <Line>
        </Line>
        <Link href='/forgotpassword'><Anchor>I forgot my user or password</Anchor>
        </Link>
      </Form>
      <FooterComponent>
          <Link href='/'>
            <a>
              <IconLogo size='100px' />
            </a>
          </Link>
        </FooterComponent>
    </Container>
  )
}
