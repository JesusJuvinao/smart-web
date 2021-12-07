import { gql } from '@apollo/client'

export const CREATE_PRODUCTS = gql`
mutation  newProductForCompany($input: IProduct){
  newProductForCompany(input: $input){
    _id
    idUser
    idComp
    pName
    pServiceCode
    pCategory
    idRef
    pClass
    pDescription
    pSalesPrice
    pIncVAT
    pIncomeAccount
    pPurchasedOthers
    pType
    pSellToOthers
    pVATCode
    pPhoto
  }
}
`

export const EDIT_PRODUCTS = gql`
mutation  editOneProduct($input: IProduct){
  editOneProduct(input: $input){
    _id
    idUser
    idComp
    pName
    pServiceCode
    pCategory
    idRef
    pClass
    pDescription
    pSalesPrice
    pIncVAT
    pIncomeAccount
    pPurchasedOthers
    pType
    pSellToOthers
    pVATCode
    pPhoto
  }
}
`
export const GET_ALL_PRODUCT_BY_ID = gql`
query getProductsForCompany($idComp: ID){
  getProductsForCompany(idComp: $idComp){
    _id
    idUser
    idComp
    pName
    pServiceCode
    pCategory
    pClass
    idRef
    pDescription
    pSalesPrice
    pIncVAT
    pIncomeAccount
    pPurchasedOthers
    pType
    pSellToOthers
    pVATCode
    pPhoto
  }
}
`

export const DELETE_ONE_PRODUCTS = gql`
mutation DeleteOneProducts($id: ID) {
  DeleteOneProducts(id: $id)
}
`
