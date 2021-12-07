import React from 'react'
import PropTypes from 'prop-types'
import { Form, Container, Text } from './styled'

export const ContactUs = ({ values, handleChange, handleRegister, browser, loading }) => {
  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <Text>Hola</Text>
      </Form>
    </Container>
  )
}

ContactUs.propTypes = {
  name: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleRegister: PropTypes.func,
  values: PropTypes.object,
  browser: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.object

}
