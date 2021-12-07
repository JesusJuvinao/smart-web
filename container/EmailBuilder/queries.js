import { gql } from '@apollo/client'

export const DELETE_ONE_TEMPLATE = gql`
   mutation registerEmailsTemplate($input: IEmailsTemplate) {
    registerEmailsTemplate(input: $input) {
        _id
        idComp
        TempEmailName
        TemStatus
    }
}
`
export const GET_ALL_TEMPLATE = gql`
query getAllEmailsTemplate($idComp: ID) {
  getAllEmailsTemplate(idComp: $idComp){
  _id
    idUser
    TempEmailName
    TemStatus
  }
}
`
