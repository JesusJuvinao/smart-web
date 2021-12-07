import { gql } from '@apollo/client'

export const GET_ALL_ATTACHMENTS = gql`
query getAllAttachment($idComp: ID!) {
  getAllAttachment(idComp: $idComp) {
    _id
    idUser
    idComp
    uploaded
    IdBills
    IdSales
    updatedAt
    SalesLink
    mimetype
    BillLink
    Notes
    createdAt
    encoding
    aSize
    filename
    BillLink
  }
}
`
// Delete one in database mongo
export const DELETE_ONE_FILE = gql`
mutation  DeleteOneFile($id: ID!){
  DeleteOneFile(id: $id)
}
`
// MINIO CLIEN FILES
export const GET_ALL_FILE_MINIO = gql`
query getAllFilesToBills($IdBills: ID) {
  getAllFilesToBills(IdBills:$IdBills ){
    _id
    idUser
    idComp
    IdSales
    SalesLink
    BillLink
    filename
    mimetype
    uploaded
    createdAt
    updatedAt
    encoding
    aSize
  }
}
`
export const DELETE_ONE_FILE_MINIO_CLIENT = gql`
mutation deleteOneFileMinio($fileName: String) {
  deleteOneFileMinio(fileName: $fileName) {
    success
    message
  }
}
`
export const GET_ONE_OBJECT_URL = gql`
query getOneObjectMinioClient($fileName: String) {
  getOneObjectMinioClient(fileName: $fileName){
    success
    message
    
  }
}
`

export const UPDATE_ONE_ATTACHMENTS = gql`
mutation  setAttachment($input: IFilesData){
  setAttachment(input: $input) {
    _id
    idUser
    idComp
    IdBills
    IdSales
    SalesLink
    BillLink
    filename
    Notes
    mimetype
    encoding
    aSize
  }
}
`
export const EDIT_ONE_ATTACHMENTS = gql`
mutation  EditOneFile($input: IFile){
  EditOneFile(input: $input) {
    _id
    idUser
    idComp
    IdBills
    IdSales
    SalesLink
    BillLink
    Notes
    filename
    Notes
    mimetype
    encoding
    aSize
  }
}
`
