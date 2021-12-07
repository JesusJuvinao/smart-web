import { gql } from '@apollo/client'

export const DELETE_ONE_IVA = gql`
mutation DeleteOneIva($id: ID) {
  DeleteOneIva(id: $id)
}
`
export const EDIT_ONE_IVA = gql`
mutation  EditIva($input: IIVA){
  EditIva(input: $input){
    _id
    idUser
    idRefIva
    IName
    iPercentage
    IName
    __typename
    idComp
    
  }
}
`
export const GET_ONE_VAT = gql`
query getOneVat($id: ID) {
  getOneVat(id: $id){
  _id
    idUser
    idRefIva
    iPercentage
    IName
    idComp
  }
  
}
`
