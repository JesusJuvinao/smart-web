import { gql } from '@apollo/client'

// REGISTER_ONE_REPORTS--------------------------------
export const GET_REPORTS = gql`
    query getReports {
        getReports {
            _id
            idPro
            idComp
            idSupplier
            salesDate
            totalDay
            __typename
        }
    }
`
export const REGISTER_ONE_REPORTS = gql`
    mutation newReports($input: IReports!) {
        newReports(input: $input) {
            _id
            idPro
            idComp
            idSupplier
            salesDate
            totalDay
            __typename
        }
    }
`
export const GET_ALL_BILL = gql`
    query getAllBillsDemo($idComp: ID, $idUser: ID) {
        getAllBillsDemo(idComp: $idComp, idUser: $idUser) {
            _id
            lineItems {
                _id
                idPro
            }
        }
    }
`
