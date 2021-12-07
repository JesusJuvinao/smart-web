import { gql } from '@apollo/client'

export const CREATE_ONE_CATEGORIES = gql`
mutation  newCategoriesForCompany($input: ICategory){
  newCategoriesForCompany(input: $input){
    idUser
    idComp
    cName
    cDescription
  }
}
`
export const GET_ALL_CATEGORIES = gql`
query getCategoryForCompany($idComp: ID, $idUser: ID){
  getCategoryForCompany(idComp: $idComp,  idUser: $idUser ){
    _id
    idUser
    idComp
    cName
    cDescription
  }
}
`
export const GET_ALL_IVA = gql`
query getAllIva($idComp: ID){
  getAllIva(idComp: $idComp){
    _id
    idUser
    idRefIva
    idComp
    iPercentage
    IName
  }
}
`

export const REGISTER_ONE_IVA = gql`
mutation  registerIva($input: IIVA){
  registerIva(input: $input){
    idUser
    idComp
    iPercentage
    IName
  }
}
`
export const GET_ALL_ACCOUNT = gql`
query getAllAccount($idComp: ID){
  getAllAccount(idComp: $idComp ){
    _id
    idAccount
    idComp
    aBalance
    aDescription
    aType
    aName
  }
}
`
export const REGISTER_ONE_ACCOUNT = gql`
mutation  registerAccount($input: IAccount){
  registerAccount(input: $input){
    _id
    idUser
    idComp
    aName
    aBalance
    aDescription
    aType
  }
}
`
