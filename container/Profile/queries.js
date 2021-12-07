/* eslint-disable no-tabs */
import { gql } from '@apollo/client'

export const SEND_EMAIL_CONFIRMATION = gql`
mutation sendEmailConfirmation($uEmail: String!, $userName: String ) {
  sendEmailConfirmation(uEmail: $uEmail, userName: $userName){
    success
    message
  } 
} 
`
export const CONFIRM_EMAIL = gql`
mutation confirmEmail($idUser: ID) {
  confirmEmail(idUser: $idUser){
    success
    message
  } 
}  
`
export const GET_USER = gql`
    query getUser($id: ID, $userName: String) {
        getUser(id: $id, userName: $userName) {
            id
            lastCompany
            firstName
            lastName
            userConfirmEmail
            userName
            uAvatar
            uEmail
            uAddress
            uPhone
            landLine
            uBirthday
            lat
            long
            iP
            company {
                _id
                companyName
                registeredOfficeAddress
                companyType
                companyLegalStatus
                accounts
                natureOfBusiness
                dissolvedOn
                incorporatedOn
                idUser
            }
            role {
                id
                name
            }
        }
    }
`

// Change info User
// Cambia la contraseña del usuario
export const CHANGE_INFO_USER = gql`
    mutation UpdateUser($input: IUser) {
        UpdateUser(input: $input) {
            success
            message
        }
    }
`
export const CHANGE_COMPANY_STATE = gql`
    mutation lastCompanyMutation($lastCompany: ID) {
        lastCompanyMutation(lastCompany: $lastCompany) {
            success
        }
    }
`
export const GET_AUT_ROLES = gql`
    query getRoles {
        getRoles {
            id
            name
        }
    }
`
