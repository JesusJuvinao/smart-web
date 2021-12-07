import { gql } from '@apollo/client'

export const CREATE_ONE_TEAM = gql`
mutation RegisterOneTeam($idC: ID, $uEmail: String, $companyName: String, $uEmailMaster: String, $lineItemTeamComp: ILineItemsFinalTeam ) {
  RegisterOneTeam(idC: $idC, uEmail: $uEmail,  companyName: $companyName, lineItemTeamComp: $lineItemTeamComp, uEmailMaster: $uEmailMaster){
    success
    message
  }
}
`
export const CHANGE_STATE_COMPANY = gql`
mutation ActiveCompany($idComp: ID) {
  ActiveCompany(idComp: $idComp){
    message
    success
  }
}
`
export const LEAVE_TEAM_COMPANY = gql`
mutation LeaveCompany($idUser: ID, $Email: String, $idTeamComp: ID, $companyName: String ) {
  LeaveCompany(idUser: $idUser, Email: $Email, idTeamComp: $idTeamComp, companyName: $companyName ) {
    success
    message
  }
}
`
