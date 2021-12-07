import React, { useContext, useEffect } from 'react'
import { SupplierCo } from '../../components/Supplier'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { ALL_CURRENCY, CREATE_ONE_SUPPLIER_FOR_COMPANY, GET_SUPPLIERS_SALES, SUPPLIER_FOR_COMPANY, DELETE_ONE_SUPPLIER } from './queries'
import { useFormTools } from '../../components/hooks/useForm'
import { useSetState } from '../../components/hooks/useState'
import { updateCache } from '../../utils'
import { Context } from '../../context'

export const SupplierC = ({ dataUser, company }) => {
  const { setAlertBox, handleMenu } = useContext(Context)

  // Hooks
  const { state, setState } = useSetState(false)
  const [getSuppliersForCompany, { data }] = useLazyQuery(SUPPLIER_FOR_COMPANY, {
    variables: { idC: company.idLasComp ? company.idLasComp : dataUser?.lastCompany },
    fetchPolicy: 'cache-and-network'
  })
  const { data: datCurrency } = useQuery(ALL_CURRENCY)
  const [newSupplierForCompany, { loading }] = useMutation(CREATE_ONE_SUPPLIER_FOR_COMPANY)
  const [handleChange, handleSubmit, setDataValue, { dataForm }] = useFormTools()
  useEffect(() => getSuppliersForCompany(), [company])
  const handleForm = e => handleSubmit({
    event: e,
    action: () => newSupplierForCompany({
      variables: { input: { sName: dataForm.sName, sCurrency: dataForm._id, idComp: company.idLasComp } }
    }),
    update: (cache, { data: { getSuppliersAtSales } }) => updateCache({
      cache,
      query: GET_SUPPLIERS_SALES,
      nameFun: 'getSuppliersAtSales',
      dataNew: getSuppliersAtSales
    }),
    actionAfterSuccess: () => {
      setDataValue({})
      getSuppliersForCompany()
    }
  })
  const [DeleteOneSupplier] = useMutation(DELETE_ONE_SUPPLIER)
  const handleDelete = async (elem) => {
    const { _id } = elem
    const results = await DeleteOneSupplier({
      variables: { id: _id },
      update (cache) {
        cache.modify({
          fields: {
            getSuppliersForCompany (dataOld = []) {
              return cache.writeQuery({ query: SUPPLIER_FOR_COMPANY, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  const HandleClickEdit = (item) => {
    handleMenu(1)
    setDataValue({
      sName: item.sName
    })
  }
  return (
    <SupplierCo
      HandleClickEdit={HandleClickEdit}
      setAlertBox={setAlertBox}
      handleDelete={handleDelete}
      onChange={handleChange}
      handleSubmit={handleForm}
      dataForm={dataForm}
      loading={loading}
      getSuppliersForCompany={getSuppliersForCompany}
      modal={state}
      setModal={setState}
      dataRes={data?.getSuppliersForCompany}
      datCurrency={datCurrency?.getCurrencies}
    />
  )
}
SupplierC.propTypes = {
  id: PropTypes.string,
  setCompanyLink: PropTypes.func,
  isCompany: PropTypes.string,
  dataUser: PropTypes.array,
  company: PropTypes.array
}
