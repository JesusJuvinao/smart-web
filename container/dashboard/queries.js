import { gql } from '@apollo/client'

export const CREATE_CURRENT_SESSION = gql`
mutation loginUser($uEmail: String!, $uPassword: String!) {
  loginUser(uEmail: $uEmail, uPassword: $uPassword){
    user{
      id
      firstName
      lastName
      userName
      uEmail
      uAvatar
    }
    token
    admin
    success
    message
  }
}
`
export const GET_ONE_COMPANY_BY_ID = gql`

query getOneCompanyById($idC: ID){
  getOneCompanyById(idC: $idC){
    _id
    companyName
    registeredOfficeAddress
    companyLegalStatus
    companyType
    accounts
    natureOfBusiness
    dissolvedOn
    incorporatedOn
    idUser
    lineItemsTeam {
      _id
      description
      uEmail
      Username
      authorization
      idUser
      dateAdded
      status
      
    }
  }
}
`
