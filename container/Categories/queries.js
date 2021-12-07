import { gql } from '@apollo/client'

export const DELETE_ONE_CATEGORIES = gql`
mutation DeleteOneCategories($id: ID) {
  DeleteOneCategories(id: $id)
}
`
export const EDIT_ONE_CATEGORIES = gql`
mutation  EditCategoriesForCompany($input: ICategory){
  EditCategoriesForCompany(input: $input){
    _id
    idUser
    idComp
    cDescription
    __typename
  }
}
`
