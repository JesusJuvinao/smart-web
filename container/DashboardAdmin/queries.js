import { gql } from '@apollo/client'

export const GET_MODULES = gql`
query getAllModules {
  getAllModules {
    _id
    mPath
    mName
    mPriority
    mIcon
    lineItemsModules {
      _id
      smName
      smPath
      smState
    }
  }
}
`
export const CREATE_ONE_MODULE = gql`
mutation registerModule($input: IModules, $inputLineItemsMod: InputLineItemsSubModules) {
  registerModule(input: $input, inputLineItemsMod: $inputLineItemsMod ){
    _id
    mPath
    mName
    mPriority
    mIcon
  }
}
`
