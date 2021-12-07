import { gql } from '@apollo/client'

export const DELETE_ONE_ACCOUNT = gql`
mutation DeleteOneAccounts($id: ID) {
    DeleteOneAccounts(id: $id)
}
`
export const GET_ALL_TAXES = gql`
query getAllTax($idComp: ID){
  getAllTax(idComp:$idComp ){
    _id
    idUser
    idComp
    TaxName
    started
    vatDate
    status
    TaxBalance
    
  }
}
`
