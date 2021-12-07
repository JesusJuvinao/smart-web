import { gql } from '@apollo/client'

export const CONFIRMATION_INVITATION = gql`

mutation ConfirmTeamCompany($idComp: ID, $uEmail: String, $uPassword: String, $uNewPassword: String, $companyName: String) {
  ConfirmTeamCompany(idComp: $idComp, uEmail: $uEmail, uPassword: $uPassword, uNewPassword: $uNewPassword, companyName: $companyName){
    message
    success
    
  }
}
`
