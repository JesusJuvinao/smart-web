import ActiveLink from '@/components/common/Link'
import { useFormTools } from '@/components/hooks/useForm'
import InputHooks from '@/components/InputHooks/InputHooks'
import { RippleButton } from '@/components/Ripple'
import { SCColor } from '@/public/colors'
import { IconCancel, IconLogo } from '@/public/icons'
import { hiddenEmail } from '@/utils/index'
import { useMutation } from '@apollo/client'
import { Context } from 'context'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import Link from 'next/link'
import { Anchor, BoxEmail, Button, FooterComponent, Form, Text, Tooltip } from './styled'
import { CONFIRMATION_INVITATION } from './queries'

export const AcceptInvitation = ({ data }) => {
    const router = useRouter()
    const { setAlertBox } = useContext(Context)
    const [sendEmail, setEmail] = useState(false)
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  
    // Queries
    const [ConfirmTeamCompany, { loading }] = useMutation(CONFIRMATION_INVITATION, {
      onCompleted: (data) => {
        if (data.success === true) {
          setAlertBox({ message: `${data?.ConfirmTeamCompany?.message}` }); router.push('/login')
        } else {
          setAlertBox({ message: `${data?.ConfirmTeamCompany?.message}` });
        }
      }
    })
    const handleForm = (e, show) => handleSubmit({
      event: e,
      action: () => {
        return ConfirmTeamCompany({
          variables: {
            idComp: data.idComp,
            uEmail: data.uEmail,
            uPassword: data.code.toString(),
            uNewPassword: dataForm.currentPassword,
            companyName: ''
          }
        })
      },
      actionAfterSuccess: () => {
        setDataValue({})
      }
    })
    return (
        <div>
        <Form onSubmit={(e) => (handleForm(e))}>
          <Text size='14px'>Login to your account below</Text>
          <BoxEmail>
            <Text lineHeight='1.5' size='15px'>{hiddenEmail(data?.uEmail)}</Text>
            <Button type='button' onClick={() => setEmail(!sendEmail)}><IconCancel size='10px' color='rgb(91, 105, 135)' />
              <Tooltip >
                <span>Login with another email</span>
              </Tooltip>
            </Button>
          </BoxEmail>
          {sendEmail
            ? <InputHooks
              title='Email'
              required
              email
              error={errorForm?.uEmail}
              value={dataForm?.uEmail}
              onChange={handleChange}
              name='uEmail'
              padding='15px 0px'
            />
            : null}
          <InputHooks
            title='Password'
            required
            pass
            type='password'
            errors={errorForm?.currentPassword}
            value={dataForm?.currentPassword}
            onChange={handleChange}
            name='currentPassword'
            padding='15px 0px'
          />
          <RippleButton bgColor={SCColor} padding='10px' width={'100%'} type='submit' >{!loading ? 'Login' : <SpinnerColorJust />}</RippleButton>
          <Text size='13px'><ActiveLink activeClassName="active" href="/forgotpassword"><Anchor>Forgot Password?</Anchor></ActiveLink></Text>
          <Text size='15px'>Not you?</Text>
          <Text size='13px'><ActiveLink activeClassName="active" href="/login"><Anchor>Login with a different account</Anchor></ActiveLink></Text>
        </Form>
        <FooterComponent>
          <Link href='/'>
            <a>
              <IconLogo size='100px' />
            </a>
          </Link>
        </FooterComponent>
      </div>
    )
  }
  
  AcceptInvitation.propTypes = {
    data: PropTypes.object || PropTypes.array,
    setAlertBox: PropTypes.func
  }