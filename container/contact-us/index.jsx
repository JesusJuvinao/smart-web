import React, { useEffect, useState } from 'react'
import { ContactUs } from '../../components/contact-us'
import { URL_BASE } from '../../apollo/urls'
import { validationSubmitHooks } from '../../utils'

export const ContactUsC = ({ setAlertBox }) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  // const [setMutation] = useMutation(CREATE_CURRENT_SESSION)
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  // State
  const [browser, setBrowser] = useState(false)
  const [loading, setLoading] = useState(false)

  //   Handles
  useEffect(() => {
    setBrowser(true)
  }, [])

  const handleRegister = async e => {
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
        duration: 8000,
        color: 'warning'
      })
    }

    if (!errorSubmit) {
      setLoading(true)
      window.fetch(`${URL_BASE}auth/`, {
        method: 'POST',
        body: JSON.stringify({
          uEmail: values.uEmail,
          uPassword: values.uPassword
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            setAlertBox({
              message: `Bienvenido ${values.uEmail}`,
              duration: 8000,
              color: 'success'
            })
            setMutation({ variables: { data: { usDevice: 'Ubuntu 20.04, ryzen 5, Microsoft Edge' } } }).then(response => {
              localStorage.setItem('vs1-tk', response.data.createUserSession)
            })
          }
          if (res.success === 0) {
            setAlertBox({
              message: 'Usuario o contraseña incorrectas',
              duration: 8000,
              color: 'error'
            })
            setLoading(false)
          }
        })
        .catch(e => {
          setAlertBox({
            message: `${e}`,
            duration: 8000,
            color: 'error'
          })
          setLoading(false)
        })
    }
  }
  return (
        <ContactUs
            handleChange={handleChange}
            handleRegister={handleRegister}
            browser={browser}
            values={values}
            loading={loading}
            errors={errors}
        />
  )
}
