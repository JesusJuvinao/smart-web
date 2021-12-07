import { gql } from '@apollo/client'

export const ALL_PRODUCTS = gql`
query GET_ALL_PRODUCTS{
  getProducts{
    id
    name
    
  }
}
`
