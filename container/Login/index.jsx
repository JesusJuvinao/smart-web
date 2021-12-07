import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { URL_BASE } from '../../apollo/urls'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'
import { CREATE_CURRENT_SESSION } from './queries'
import fetchJson from '../../pages/api/lib/hooks/fetchJson'
import { validationSubmitHooks } from '../../utils'
import InputHooks from '../../components/InputHooks/InputHooks'
import { ButtonHook } from '../../components/ButtonHook'
import { IconLogo } from '../../public/icons'
import { BGColor, SCColor } from '../../public/colors'
import Link from 'next/link'
import { LoadEllipsis } from '../../components/Loading'
import { Context } from 'context'
import { Loading } from '@/components/Loading'
import ActiveLink from '@/components/common/Link'
import { Container, Figure, Form, Logo, Text, FooterComponent, Anchor } from './styled'

export const LoginC = ({ setAlertBox }) => {
  const { error, authData, menu, handleMenu, isSession, setIsSession, company, setSessionActive } = useContext(Context)

  const [loginUser, { loading }] = useMutation(CREATE_CURRENT_SESSION, {
    onError: (error) => {
      console.log(error)
      setAlertBox({
        message: 'an internal error occurred',
        duration: 300000,
        color: 'error'
      })
    }
  })
  // State
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  const router = useRouter()
  const [browser, setBrowser] = useState(false)
  //   Handles
  const [confirmPhone, setConfirmPhone] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault()
    // Declarando variables
    let errorSubmit = false
    for (const x in errors) {
      if (errors[x]) errorSubmit = true
    }
    // Validando todos los campos que no sean nulos
    const errorForm = validationSubmitHooks(e.target.elements)
    for (const x in errorForm) {
      if (errorForm[x]) errorSubmit = true
    }
    setErrors({ ...errorForm })
    if (errorSubmit) {
      return setAlertBox({
        message: 'Please verify that the fields are correct.',
        duration: 300000,
        color: 'warning'
      })
    }
    const body = {
      uEmail: values.uEmail,
      uPassword: values.uPassword
    }
    if (!errorSubmit) {
      setSessionActive(true)
      await fetchJson(`${URL_BASE}auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(res => {
          if (res.success) {
            loginUser({ variables: { uEmail: values.uEmail, uPassword: values.uPassword } })
              .then(res => {
                const data = res && res.data.loginUser.user
                setSessionActive({ data })
                // if (!data.uPhone) {
                //   setConfirmPhone(true)
                // } else {
                //   router.push('/switch-options')
                // }
              })
          }
          if (res.success === 0) {
            setAlertBox({
              message: 'Usuario o contraseña incorrectas',
              duration: 300000,
              color: 'error'
            })
          }
        })
        .catch(e => {
          setAlertBox({
            message: `${e}`,
            duration: 300000,
            color: 'error'
          })
        }).finally(() => {
          router.push('/switch-options')
        })
    }
  }
  useEffect(() => {
    setBrowser(true)
  }, [])
  if (loading) return <Loading />
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Text id='title' style={{ textAlign: 'center' }}>{confirmPhone ? `Let's verify your number` : 'Login Form'}</Text>
        <Text id='Subtitle' size='12px' style={{ textAlign: 'center' }}>{confirmPhone && `Making sure your email is up to date helps us keep your account safe.`}</Text>
        {!confirmPhone ?
          <div>
            <InputHooks
              title='Email'
              autoComplete
              required
              email
              errors={errors?.uEmail}
              value={values?.uEmail}
              onChange={handleChange}
              name='uEmail'
              padding='15px 0px'
            />
            <InputHooks
              title='Password'
              required
              pass
              // autoComplete
              type='password'
              errors={errors?.uPassword}
              value={values?.uPassword}
              onChange={handleChange}
              name='uPassword'
              padding='15px 0px'

            />
          </div>
          : {/* <InputHooks
            title='Phone number'
            required
            numeric
            errors={errors?.uPhone}
            value={values?.uPhone}
            onChange={handleChange}
            name='uPhone'
            padding='15px 0px'

          /> */}}
        {/* {!confirmPhone ? <ButtonHook bgColor={SCColor} padding='10px' width={'100%'} type='submit' >{!loading ? 'Login' : <LoadEllipsis />}</ButtonHook> : <ButtonHook bgColor={SCColor} padding='10px' width={'100%'} type='submit' >{!loading ? 'Skip for now' : <LoadEllipsis />}</ButtonHook> } */}
        <ButtonHook bgColor={SCColor} padding='10px' width={'100%'} type='submit' >{!loading ? 'Login' : <LoadEllipsis />}</ButtonHook>
        <Text size='13px'><ActiveLink activeClassName="active" href="/forgotpassword"><Anchor>Forgot Password?</Anchor></ActiveLink></Text>
        <Text size='13px'><ActiveLink activeClassName="active" href="/register"><Anchor>Not a member?</Anchor></ActiveLink></Text>
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

LoginC.propTypes = {
  setAlertBox: PropTypes.func
}
