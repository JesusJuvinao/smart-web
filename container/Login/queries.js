import { gql } from '@apollo/client'

export const CREATE_CURRENT_SESSION = gql`
mutation loginUser($uEmail: String!, $uPassword: String!) {
  loginUser(uEmail: $uEmail, uPassword: $uPassword){
    user{
      id
      firstName
      lastName
      uPhone
      userName
      uEmail
      lastCompany
      uAddress
      uAvatar
      lastName
      role{
        id
        name
      }
    }
    token
    refreshToken
    admin
    success
    userId
    message
  }
}
`
