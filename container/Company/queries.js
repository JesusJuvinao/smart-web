import { gql } from '@apollo/client'

export const CREATE_ONE_COMPANY = gql`
    mutation newCompany($input: ICompany) {
        newCompany(input: $input) {
            companyName
            registeredOfficeAddress
            companyLegalStatus
            companyType
            accounts
            color
            natureOfBusiness
            dissolvedOn
            incorporatedOn
            idUser
        }
    }
`

export const ALL_COMPANIES = gql`
    query getCompanies {
        getCompanies {
            _id
            companyName
            registeredOfficeAddress
            companyLegalStatus
            companyType
            accounts
            natureOfBusiness
            dissolvedOn
            incorporatedOn
        }
    }
`
export const ALL_COMPANIES_USER = gql`
    query getAllCompanyUser {
        getAllCompanyUser {
            _id
            companyName
            registeredOfficeAddress
            companyLegalStatus
            companyType
            accounts
            natureOfBusiness
            color
            dissolvedOn
            incorporatedOn
            idUser
            lineItemsTeam{
              _id
              description
              Username
              uEmail
              status
              dateAdded
              idUser
              authorization
              idUser
          }
        }
    }      
`
export const ALL_COMPANIES_BY_USER = gql`
   query getAllCompanyById($idUser: ID, $search: String, $min: Int, $max: Int) {
    getAllCompanyById(idUser: $idUser, search: $search, min: $min, max: $max) {
        _id
        companyName
        registeredOfficeAddress
        companyLegalStatus
        companyType
        accounts
        natureOfBusiness
        color
      	cState
        dissolvedOn
        incorporatedOn
        idUser
        lineItemsTeam{
            _id
            description
            Username
            uEmail
            status
            dateAdded
            idUser
            authorization
            idUser
        }
    }
        
}    
`

export const DELETE_ONE_COMPANY = gql`
mutation deleteCompany($id: ID!, $companyName: String) {
    deleteCompany(id: $id, companyName: $companyName) {
    success
    message
  }
}
`
export const GET_ALL_TEAM_COMPANY = gql`
   query getAllTeamCompany($idUser: ID, $search: String, $min: Int, $max: Int) {
    getAllTeamCompany(idUser: $idUser, search: $search, min: $min, max: $max) {
        _id
        companyName
        registeredOfficeAddress
        companyLegalStatus
        companyType
        accounts
        natureOfBusiness
        color
      	cState
        dissolvedOn
        incorporatedOn
        idUser
        lineItemsTeam{
            _id
            description
            Username
            uEmail
            status
            dateAdded
            idUser
            authorization
            idUser
        }
    }
        
} 
`
