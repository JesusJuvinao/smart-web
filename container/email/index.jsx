import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CONFIRM_EMAIL } from 'container/Profile/queries'
import { useMutation } from '@apollo/client'
import { Context } from 'context'
import { decodeToken, getTokenState } from '@/utils/index'
import { SpinnerColorJust } from '@/components/Loading'
import styled from 'styled-components'
import { BGColor } from '@/public/colors'

export const EmailConfirm = () => {
    const router = useRouter()
    const { setAlertBox } = useContext(Context)
    const code = router.query.code
    const data = decodeToken(code)
    const tokenState = getTokenState(code)
    if (tokenState?.needRefresh === true) {
      return <span>The link has expired</span>
    } else if (!tokenState?.valid) {
      return <span>The link is not valid</span>
    } else if (!tokenState) {
      router.push('/')
      return <span />
    } else return <ConfirmValidation data={data} router={router} setAlertBox={setAlertBox} />
}


export const ConfirmValidation = ({ data, router, setAlertBox }) => {
    const [confirmEmail, { data: dataConfirm, loading }] = useMutation(CONFIRM_EMAIL, {
        onCompleted: (data) => setAlertBox({ message: `${data?.confirmEmail?.message}` }),
        onError: () => setAlertBox({ message: `${data?.confirmEmail?.message}` }),
        variables: { idUser: data.idUser }
    })
    useEffect(() => {
        confirmEmail()
    }, [router])
    return (
        <Container>
            {dataConfirm && dataConfirm.confirmEmail.success === true ? <i>Su cuenta ha sido activada</i> : loading ? <SpinnerColorJust /> : 'The account could not be activated or is already activated'}
        </Container>
    )
}
const Container = styled.div`
    display: grid;
    place-content: center;
    padding: 20%;
    background-color: ${BGColor};
`


EmailConfirm.propTypes = {

}
