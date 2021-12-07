import React, { useContext, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useFormTools } from '../../components/hooks/useForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { ALL_COMPANIES, ALL_COMPANIES_BY_USER, ALL_COMPANIES_USER, CREATE_ONE_COMPANY } from '../Company/queries'
import { LoadEllipsis } from '../../components/Loading'
import { RippleButton } from '../../components/Ripple'
import { Form, Card } from './styled'
import { Context } from '../../context'
import styled from 'styled-components'

export const NewCompany = () => {
  const { company, handleMenu, setAlertBox } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const [newCompany, { loading }] = useMutation(CREATE_ONE_COMPANY)
  const handleForm = e => handleSubmit({
    event: e,
    action: () => {
      if (dataForm) {
        return newCompany({
          variables: {
            input: {
              companyName: dataForm.companyName,
              registeredOfficeAddress: dataForm.registeredOfficeAddress,
              companyLegalStatus: dataForm.companyLegalStatus,
              companyType: dataForm.typeCompany ? dataForm.typeCompany : 'NATURAL_PERSON',
              accounts: dataForm.accounts,
              natureOfBusiness: dataForm.accounts,
              dissolvedOn: dataForm.dissolvedOn,
              incorporatedOn: dataForm.incorporatedOn,
              color: dataForm.color
            }
          },
          update(cache) {
            cache.modify({
              fields: {
                getAllCompanyById(dataOld = []) {
                  return cache.writeQuery({ query: ALL_COMPANIES_BY_USER, data: dataOld })
                }
              }
            })
            cache.modify({
              fields: {
                getAllCompanyUser(dataOld = []) {
                  return cache.writeQuery({ query: ALL_COMPANIES_USER, data: dataOld })
                }
              }
            })
          }
        })
      }
    },
    actionAfterSuccess: () => {
      setDataValue({})
      getCompanies()
      handleMenu(false)
    }
  })
  const [getCompanies] = useLazyQuery(ALL_COMPANIES, {
    variables: { idComp: company.idLasComp ? company.idLasComp : null },
    fetchPolicy: 'cache-and-network'
  })
  useEffect(() => getCompanies(), [company.idLasComp])

  return (
    <div>
      <Form onSubmit={e => (handleForm(e))}>
        <Card>
          <InputHooks title='Name Company' required name='companyName' error={errorForm?.companyName} value={dataForm?.companyName} onChange={handleChange}  range={{ min: 2, max: 60 }} />
          <InputHooks title='Registered Office Address' required name='registeredOfficeAddress' error={errorForm?.registeredOfficeAddress} value={dataForm?.registeredOfficeAddress} onChange={handleChange} range={{ min: 2, max: 60 }} />
          <InputHooks title='Nature Of Business (SIC)' required name='natureOfBusiness' error={errorForm?.natureOfBusiness} value={dataForm?.natureOfBusiness} onChange={handleChange} range={{ min: 2, max: 60 }} />
          <label>type of company</label>
          <Select disabled={false} onChange={handleChange} name='typeCompany' id='typeCompany'>
            <option value='NATURAL_PERSON' selected >NATURAL_PERSON</option>
            <option value='LEGAL_PERSON'>LEGAL_PERSON</option>
          </Select>
          <InputHooks width='50%' title='Incorporated On' type='date' required name='incorporatedOn' error={errorForm?.incorporatedOn} value={dataForm?.incorporatedOn} onChange={handleChange} range={{ min: 2, max: 60 }} />
          <input width='10%' padding='0' type='color' required name='color' error={errorForm?.color} value={dataForm?.color} onChange={handleChange} range={{ min: 2, max: 60 }} />
          <RippleButton disabled={!dataForm} padding='10px' widthButton={'100%'} onClick={() =>  !dataForm.incorporatedOn || !dataForm.companyName && setAlertBox({ message: 'Llene todos los campos' })} type={ !dataForm.incorporatedOn || !dataForm.companyName ? 'button'  :'submit' } >{loading ? <LoadEllipsis /> : 'Save'}</RippleButton>
        </Card>
      </Form>
    </div>
  )
}
const Select = styled.select`
    padding: 10px;
    color: #272323;
    margin: 15px 0px;
    outline: 0;
    width: 100%;
    border: 1px solid #ccc;
    font-weight: 600;
    font-size: 13px;
    line-height: 32px;
    padding: 10 38px 0 8px;
    border-radius: 0px;
    & > option {
            padding: 10 38px 0 8px;
            border-radius: 0px;
    }
`
NewCompany.propTypes = {

}
