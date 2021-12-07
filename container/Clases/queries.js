import { gql } from '@apollo/client'

export const ALL_CLASS_FOR_COMPANY = gql`
query getClass($idComp: ID, $idUser: ID) {
  getClass(idComp: $idComp, idUser: $idUser) {
    _id
    idComp
    className
    SubClass
    idClass
    classActive
  }
}
`
export const CREATE_ONE_CLASS_FOR_COMPANY = gql`
   mutation createClassMutation($input: IClass) {
    createClassMutation(input: $input) {
        idComp
        className
        SubClass
        classActive
    }
}
`
export const UPDATE_ONE_CLASS_FOR_COMPANY = gql`
   mutation EditClass($input: IClass) {
    EditClass(input: $input) {
        _id
        idComp
        className
        SubClass
        classActive
    }
}
`
export const DELETE_ONE_CLASS = gql`
mutation DeleteOneClass($id: ID) {
  DeleteOneClass(id: $id)
}
`
