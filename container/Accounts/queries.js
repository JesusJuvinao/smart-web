import { gql } from '@apollo/client'

export const DELETE_ONE_ACCOUNT = gql`
mutation DeleteOneAccounts($id: ID) {
    DeleteOneAccounts(id: $id)
}
`
export const EDIT_ONE_ACCOUNT = gql`
mutation  EditAccounts($input: IAccount){
  EditAccounts(input: $input){
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
