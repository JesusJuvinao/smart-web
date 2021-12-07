import { gql } from '@apollo/client'

export const CREATE_INVOICES = gql`
mutation createSalesInvoicesMutation($input: ISalesInvoices, $inputLineItems: ILineItemsFinal!, $setTagsInput: ITgasItemsFinal, $setFilesInput: IFilesData) {
createSalesInvoicesMutation(input: $input, inputLineItems: $inputLineItems, setTagsInput: $setTagsInput, setFilesInput: $setFilesInput) {
    _id
    idUser
    idComp  
    bInvoiceDate
    bDueDate
    VatType
    bInvoiceRef
    currencySalesInvoices
    idFiles
    salesTotal
    bDescription
    idSupplier
    SalesSubtotal
    salesNo
    bAccount
    bVATOption
    idClass
    bVATTotal

}
}
`
export const GET_ALL_INVOICES = gql`
query getAllSalesInvoices($idComp: ID, $idUser: ID){
  getAllSalesInvoices(idComp: $idComp,  idUser: $idUser ){
    _id
    idUser
    idComp  
    bInvoiceDate
    bDueDate
    VatType
    bInvoiceRef
    currencySalesInvoices
    salesTotal
    bDescription
    SalesSubtotal
    salesNo
    bAccount
    idClass
    tags{
      TName
    }
    lineItems{
_id
lineItemsDescription
lineItemsQuantity
lineItemsRate
lineItemsTotalVAT
lineItemsSubTotal
lineItemsIdVAT
lineItemsIdClass
lineItemsIdPro
lineItemsIdAccount
      iva {
        _id
        idRefIva
        idUser
        idComp
        iPercentage
        IName
        
      }
    }
    idSupplier{
      _id
      idUser
      
      sName
      idComp
      sCurrency
      currency {
        _id
        cName
        cDescription
        __typename
      }
      sName
    }
    idFiles {
      _id
      idUser
      idComp
      IdSales
      idFiles
      SalesLink
      BillLink
      IdBills
      filename
      mimetype
      uploaded
      createdAt
      updatedAt
      encoding
      aSize
    }
    products{
      _id
      idUser
      idComp      
    }
    
  }
}
`

// Admin
// export const GET_ALL_BILL_BY_ID = gql`
// query  getAllById {
//   getAllById{
//     id
//     idUser
//     supplierName
//     bCurrency
//     bInvoiceDate
//     bDueDate
//     bInvoiceRef
//     bAccount
//     bDescription
//   }
// }
// `
