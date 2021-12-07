import { gql } from '@apollo/client'

export const GET_COUNTRY = gql`
query  countries{
  countries{
    c_id
    c_name
    c_calCod
  }
}
`

export const GET_ONE_COUNTRIES = gql`
query getOneCountry($c_calCod: String, $c_id: ID){
 getOneCountry(c_calCod: $c_calCod, c_id: $c_id ){
  c_name
  c_calCod
  c_state
  c_id
  
}
}
`
// Obtiene los departments
// Obtiene los departments
export const GET_DEPARTMENT = gql`
query  departments{
  departments{
    d_id
    c_id
    d_name
    d_state
  }
}
`
// Obtiene los Municipios || Cuidades
export const GET_MUNICIPALITIES = gql`
query getMunicipalities{
  getMunicipalities{
    m_id
    d_id
    m_name
    m_state
  }
}
`
