/* eslint-disable multiline-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import { Container, FooterComponent, From, Text } from './styled'
import { RippleButton } from '../Ripple'
import InputHooks from '../InputHooks/InputHooks'
import OTPInput from '../Otp/Otp'
import { PColor, SCColor } from '../../public/colors'
import { LoadEllipsis } from '../Loading'
import Link from 'next/link'
import { IconLogo } from '../../public/icons'

export const ForgotPassword = ({ setState, handleSubmit, state, dataForm, onChange, handleFormValidation, setOtp, handleResetPassword, loadingValidate, loadingEmail, loadingChange }) => {
  return (
    <>
      <Container>
        {state === 1 ? <From width='380px' onSubmit={(e) => handleSubmit(e)}>
          <Text margin='0px auto  30px auto' size='24px'><span>Write your email</span></Text>
          <Text align='center' margin='0' size='12px'><span>Let's get you signed in Enter your phone number, email, or user ID and we'll find your account.</span></Text> &nbsp;
          <Text align='start' margin='0 0 20px 0 ' size='12px'><span>Phone number, email or user ID</span></Text>
          <InputHooks width='100%' title='Enter Your Email' required errors={dataForm?.uEmail} value={dataForm?.uEmail} onChange={onChange} name='uEmail' />
          <RippleButton bgColor={SCColor} margin='20px 0px' type='submit'>{loadingEmail ? <LoadEllipsis /> : 'Send Email'}</RippleButton>
        </From>
          : state === 2 ? <From onSubmit={(e) => handleFormValidation(e)}>
            <Text margin ='20px auto'size='25px'>Enter the 5-digit code we sent</Text>
            <OTPInput
              autoFocus
              isNumberInput
              length={5}
              inputClassName="otpInput" // send css
              onChangeOTP={(otp) => setOtp(otp)}
            />
            <RippleButton bgColor={SCColor} margin='20px 0px' type='submit'>{loadingValidate ? <LoadEllipsis /> : 'Validate Code'}</RippleButton>
            <Text onClick={() => setState(1)}>I did not receive my code</Text>
          </From> : state === 3 ? <From onSubmit={(e) => handleResetPassword(e)}>
            <Text size='30px'>Change your password </Text>
            <InputHooks
              title='New Password'
              name='uPassword'
              type='password'
              pass
              required

              errors={dataForm?.uPassword}
              value={dataForm?.uPassword}
              onChange={onChange}
            />
            <InputHooks name="ConfirmPassword"
              title="Confirm Password"
              type="password"
              required
              pass
              range={{ min: 0, max: 180 }}
              passConfirm={{ validate: true, passValue: dataForm?.uPassword }}
              value={dataForm?.ConfirmPassword}
              errors={dataForm?.ConfirmPassword}
              onChange={onChange}
            />
            <RippleButton bgColor={SCColor} margin='20px 0px' type='submit'>{loadingValidate ? <LoadEllipsis /> : 'Update'}</RippleButton>
          </From> : <>
            <Text color={PColor}>¿No recibiste el código?</Text>
            <Text>Revisa si ingresaste el correo correctamente. Quizá el código esta en tu bandeja de spam.</Text>
            <Text></Text>
            <RippleButton margin='20px 0' >Reenviar codigo</RippleButton>
          </>}
        <FooterComponent>
          <Link href='/'>
            <a>
              <IconLogo size='100px' />
            </a>
          </Link>
        </FooterComponent>
      </Container>
    </>
  )
}

ForgotPassword.propTypes = {
  map: PropTypes.array,
  otp: PropTypes.array,
  component: PropTypes.element,
  handleChange: PropTypes.func,
  onChange: PropTypes.func,
  dataForm: PropTypes.string,
  state: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleFormValidation: PropTypes.func,
  setState: PropTypes.func,
  setOtp: PropTypes.func,
  handleResetPassword: PropTypes.func,
  loadingValidate: PropTypes.bool,
  loadingEmail: PropTypes.bool,
  loadingChange: PropTypes.bool
}
