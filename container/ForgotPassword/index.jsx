import { useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'
import React, { useContext, useEffect, useState } from 'react'
import { ForgotPassword } from '../../components/ForgotPassword'
import { useFormTools } from '../../components/hooks/useForm'
import CountdownApp from '../../components/hooks/useSetInterval'
import { useSetState } from '../../components/hooks/useState'
import { Context } from '../../context'
import { CHANGE_PASSWORD, RECOVER_ACCOUNT, VALIDATE_TOKEN } from './queries'

export const ForgotPasswordC = () => {
  const [handleChange, handleSubmit, setDataValue, { dataForm }] = useFormTools()
  const [status, component, handleStart] = CountdownApp()
  const { state, setState } = useSetState(1)
  const [Otp, setOtp] = useState({})
  const { setAlertBox } = useContext(Context)
  const router = useRouter()

  const handleShow = index => {
    setState(index === state ? false : index)
  }
  const [CreateRecoverAccount, { data, loading }] = useMutation(RECOVER_ACCOUNT)
  const [changePassword, { data: dataChange, loading: loadingChange }] = useMutation(CHANGE_PASSWORD)
  const [validateToken, { data: dataValidateToken, loading: loadingValidate }] = useLazyQuery(VALIDATE_TOKEN, {
    variables: { uEmail: dataForm.uEmail, uToken: Otp }
  })

  const handleForm = e => handleSubmit({
    event: e,
    action: () => CreateRecoverAccount({
      variables: { input: { uEmail: dataForm.uEmail } }
    }),
    msgSuccess: '',
    actionAfterSuccess: () => {
      setState(2)
      handleStart()
    }
  })

  const handleFormValidation = async e => {
    e.preventDefault()
    await validateToken()
  }

  const handleResetPassword = e => handleSubmit({
    event: e,
    action: () => changePassword({
      variables: {
        input: {
          uEmail: dataForm.uEmail,
          uPassword: dataForm.uPassword,
          uToken: Otp
        }
      }
    })
  }, setAlertBox({ message: `${dataChange?.changePassword?.message}`, duration: 8000 }), router.push('/login'))

  useEffect(() => {
    if (data) {
      setAlertBox({ message: `${data?.CreateRecoverAccount?.message}`, duration: 8000 })
    }
  }, [data])

  useEffect(() => {
    if (dataValidateToken) {
      setAlertBox({ message: `${dataValidateToken?.validateToken?.message}`, duration: 8000 })
      setState(3)
    }
  }, [dataValidateToken])

  return (
    <ForgotPassword
      status={status}
      component={component}
      handleShow={handleShow}
      setOtp={setOtp}
      handleSubmit={handleForm}
      state={state}
      loadingValidate={loadingValidate}
      loadingEmali={loading}
      loadingChange={loadingChange}
      handleFormValidation={handleFormValidation}
      handleResetPassword={handleResetPassword}
      onChange={handleChange}
      setState={setState}
      dataForm={dataForm}
    />
  )
}
