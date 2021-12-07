import { gql } from '@apollo/client'

export const CREATE_ONE_SUPPLIER_FOR_COMPANY = gql`
    mutation newSupplierForCompany($input: ISupplier) {
        newSupplierForCompany(input: $input) {
            sName
            sCurrency
            idComp
        }
    }
`

export const SUPPLIER_FOR_COMPANY = gql`
    query getSuppliersForCompany($idC:ID) {
        getSuppliersForCompany(idC:$idC) {
            _id
            sName
            sCurrency{
              _id
              cName
              cDescription
            }
        }
    }
`

export const GET_SUPPLIERS_SALES = gql`
    query getSuppliersAtSales($idC:ID) {
        getSuppliersAtSales(idC:$idC) {
            _id
            sName
        }
    }
`

export const ALL_CURRENCY = gql`
query getCurrencies {
  getCurrencies{
    _id
    cName
    cDescription
  }
}
`
export const GET_ONE_CURRENCY = gql`
query getOneSuppliers($id: ID) {
  getOneSuppliers(id: $id){
  _id
    idUser
    idComp
    sName
      sCurrency{
        _id
        cName
        cDescription
      }
  }
  
}
`
export const FIND_ONE_SUPPLIER = gql`
    query getSuppliersOne($idSupplier: ID) {
        getSuppliersOne(_id: $idSupplier) {
            sName
            sCurrency
        }
    }
`
export const DELETE_ONE_SUPPLIER = gql`
mutation DeleteOneSupplier($id: ID) {
  DeleteOneSupplier(id: $id)
}
`
export const EDIT_SUPPLIER_FOR_COMPANY = gql`
mutation  editSupplierForCompany($input: ISupplier){
    editSupplierForCompany(input: $input){
    _id
    idUser
    idComp
    sCurrency
    sName
    
  }
}
`
