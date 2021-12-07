import { gql } from '@apollo/client'

export const RECOVER_ACCOUNT = gql`
mutation CreateRecoverAccount($input: IResetPassword){
  CreateRecoverAccount(input: $input){
    success
    message
  }
}
`
export const CHANGE_PASSWORD = gql`
mutation ResetPassword($input: IResetPassword){
  ResetPassword(input: $input){
    success
    message
  }
}
`

export const VALIDATE_TOKEN = gql`
query validateToken($uEmail: String, $uToken: String){
  validateToken(uEmail: $uEmail, uToken: $uToken){
    success
    message
  }
}
`
