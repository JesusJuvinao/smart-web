/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Form } from './styled'
import NewSelect from '../../components/NewSelectHooks'
import { useFormTools } from '../../components/hooks/useForm'
import { updateCacheMod } from '../../utils'
import { ALL_CURRENCY, CREATE_ONE_SUPPLIER_FOR_COMPANY, SUPPLIER_FOR_COMPANY, EDIT_SUPPLIER_FOR_COMPANY } from '../Supplier/queries'
import { RippleButton } from '../../components/Ripple'
import { LoadEllipsis, Loading } from '../../components/Loading'
import { Context } from '../../context'
import { useRouter } from 'next/router'
import { useUser } from '../Profile'
import { WColor } from '../../public/colors'

export const Supplier = () => {
  const router = useRouter()

  const { company, setAlertBox, handleMenu } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm }] = useFormTools()
  const [dataUser] = useUser()
  useEffect(() => {
    setDataValue({
      sName: router.query.sName,
      _id: router.query.cID
    })
  }, [router?.query])
  const [newSupplierForCompany, { loading }] = useMutation(CREATE_ONE_SUPPLIER_FOR_COMPANY, {
    update (cache) {
      cache.modify({
        fields: {
          getSuppliersForCompany (dataOld = []) {
            return cache.writeQuery({ query: SUPPLIER_FOR_COMPANY, data: dataOld })
          }
        }
      })
    }
  })
  const [editSupplierForCompany, { loading: LoadingUpdate }] = useMutation(EDIT_SUPPLIER_FOR_COMPANY, {
    onError: (error) => {
      setAlertBox({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update (cache) {
      cache.modify({
        fields: {
          getSuppliersForCompany (dataOld = []) {
            return cache.writeQuery({ query: SUPPLIER_FOR_COMPANY, data: dataOld })
          }
        }
      })
    }
  })
  const { data: datCurrency } = useQuery(ALL_CURRENCY)
  // const [newSupplierForCompany, { loading }] = useMutation(CREATE_ONE_SUPPLIER_FOR_COMPANY)
  const [getSuppliersForCompany] = useLazyQuery(SUPPLIER_FOR_COMPANY, {
    variables: { idC: company.idLasComp ? company.idLasComp : dataUser?.lastCompany },
    fetchPolicy: 'cache-and-network'
  })
  useEffect(() => getSuppliersForCompany(), [company.idLasComp])
  const handleForm = (e) => handleSubmit({
    event: e,
    action: () => {
      if (!router.query.id) {
        return newSupplierForCompany({
          variables: { input: { sName: dataForm.sName, sCurrency: dataForm._id, idComp: company.idLasComp } }
        })
      } else if (router.query.id) {
        return editSupplierForCompany({
          variables: { input: { _id: router.query.id, sName: dataForm.sName, sCurrency: dataForm._id, idComp: company.idLasComp } }
        })
      }
    },
    actionAfterSuccess: () => {
      setDataValue({})
      handleMenu(false)
      router.replace(router.pathname)
    }
  })
  if (LoadingUpdate) return <Loading />
  return (
        <div>
            <Form onSubmit={e => (handleForm(e))}>
                <InputHooks
                    title='Supplier Name'
                    required
                    disabled={router.query.view}
                    errors={dataForm?.sName}
                    value={dataForm?.sName}
                    onChange={handleChange}
                    name='sName'
                    padding='15px 0px'
                />
                <NewSelect
                    disabled={!datCurrency?.getCurrencies || router.query.view }
                    options={datCurrency?.getCurrencies || []}
                    id='_id'
                    search
                    name='_id'
                    topTitle='11px'
                    secOptionName='cDescription'
                    errors={dataForm?._id}
                    value={dataForm?._id || ''}
                    optionName='cName'
                    title='Select One Currency'
                    onChange={handleChange}
                />
                <RippleButton disabled={router.query.view} padding='10px' margin="20px 0 0" width={'100%'} type='submit' >{loading ? <LoadEllipsis /> : router.query.edit ? 'Edit' : 'Save'}</RippleButton>
            </Form>
        </div>
  )
}

Supplier.propTypes = {

}
