import { gql } from '@apollo/client'

export const CREATE_BILL = gql`
mutation createBillMutation($input: IBill, $inputLineItems: ILineItemsFinal!, $setTagsInput: ITgasItemsFinal, $setFilesInput: IFilesData) {
createBillMutation(input: $input, inputLineItems: $inputLineItems, setTagsInput: $setTagsInput, setFilesInput: $setFilesInput) {
      _id
      idUser
      idComp  
      bInvoiceDate
      bDueDate
  		VatType
      bInvoiceRef
  		currencyBill
      billNo
      idFiles
      bDescription
      idSupplier
      bTotal
  		bSubtotal
  		bAccount
  		bVATOption
 	 		bSubtotal
  		idClass
	  	bVATTotal
  
}
}
`
export const EDIT_BILL = gql`
mutation updateBill($input: IBill, $inputLineItems: ILineItemsFinal!, $setTagsInput: ITgasItemsFinal, $setFilesInput: IFilesData) {
  updateBill(input: $input, inputLineItems: $inputLineItems, setTagsInput: $setTagsInput, setFilesInput: $setFilesInput) {
    _id
      idUser
      idComp  
      bInvoiceDate
      bDueDate
  		VatType
      bInvoiceRef
  		currencyBill
      billNo
      idFiles
      bDescription
      idSupplier
      bTotal
  		bSubtotal
  		bAccount
  		bVATOption
 	 		bSubtotal
  		idClass
	  	bVATTotal
}
}
`
export const DELETE_ONE_BILL = gql`
mutation DeleteOneBill($id: ID!) {
  DeleteOneBill(id: $id)
}
`
export const GET_ALL_LINKS_FILES = gql`
query getAllFilesLinkToBills($fileName: String, $idComp: ID ) {
  getAllFilesLinkToBills(fileName: $fileName, idComp: $idComp){
    success
    message
  }
}
`
export const GET_ALL_BILL = gql`
query getAllBill($idComp: ID, $idUser: ID,$search: String, $min: Int, $max: Int){
  getAllBill(idComp: $idComp,  idUser: $idUser, search: $search, min: $min, max: $max){
_id
idUser
idComp
totalVAT
VatType
bInvoiceDate
bDueDate
bInvoiceRef
currencyBill
bDescription
bVATCode
idClass
billNo
billVATTotal
billTotal
    tags{
      _id
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
export const UPLOAD_FILE = gql`
mutation uploadFile($file: Upload!, $idComp: ID, $input: IFile) {
  uploadFile(file: $file, idComp: $idComp, input:  $input){
    _id
    idComp
    idUser
    BillLink
    SalesLink
    filename
    mimetype
    aSize
  }
}
 `
export const DELETE_ONE_LINE_ITEMS = gql`
mutation deleteOneLineItem($id: ID!, $idLine: ID!) {
  deleteOneLineItem(id: $id, idLine: $idLine)
}
 `
//  DELETE THE TAGS
export const DELETE_ONE_TAG = gql`
mutation deleteOneTagLineItem($id: ID!, $idLine: ID!) {
  deleteOneTagLineItem(id: $id, idLine: $idLine)
}
 `
export const FIND_ONE_BILLS = gql`
query getOneBillById($id: ID!) {
  getOneBillById(id: $id) {
  _id
idUser
idComp
totalVAT
VatType
bInvoiceDate
bDueDate
bInvoiceRef
currencyBill
bDescription
bVATCode
idClass
billNo
billVATTotal
billTotal
    tags{
      _id
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

export const INVITE_EMPLOYEE_TO_ACCESS_BILL = gql`
mutation setAccessBills($idBill: ID!, $idUserEmployee: ID!, $typeAccess: String, $idComp: ID, $uEmailEmployee: String ) {
  setAccessBills(idBill: $idBill, idUserEmployee: $idUserEmployee, typeAccess: $typeAccess, idComp: $idComp, uEmailEmployee: $uEmailEmployee ) {
    success
    message
  }
}	
`
