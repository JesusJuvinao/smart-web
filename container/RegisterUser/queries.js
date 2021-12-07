import { gql } from '@apollo/client'

export const CREATE_ONE_USER = gql`
  mutation newRegisterUser( $userName: String! $uEmail: String! $uPassword: String! ) {
    newRegisterUser(userName: $userName, uEmail: $uEmail, uPassword: $uPassword) {
      user {
        uEmail
        uAvatar
        uAddress
        userName
      }
      token
      refreshToken
      userId
      success
      message
    }
  }
`
export const VALIDATE_EXISTING = gql`
query verifyRegistration($userName: String $uEmail: String!) {
  verifyRegistration(uEmail: $uEmail, userName: $userName) {
    success
    message
  }
}
`
