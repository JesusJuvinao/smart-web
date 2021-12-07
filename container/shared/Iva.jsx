/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Form } from './styled'
import { useFormTools } from '../../components/hooks/useForm'
import { Context } from '../../context'
import { updateCacheMod } from '../../utils'
import { GET_ALL_IVA, REGISTER_ONE_IVA } from '../graphql/queries'
import { EDIT_ONE_IVA } from '../VAT/queries'
import { RippleButton } from '../../components/Ripple'
import { LoadEllipsis, Loading } from '../../components/Loading'
import { useRouter } from 'next/router'
import { WColor } from '../../public/colors'

export const Iva = () => {
  const router = useRouter()
  const { company, setAlertBox, handleMenu } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  useEffect(() => {
    setDataValue({
      IName: router.query.IName,
      iPercentage: router.query.iPercentage
    })
  }, [router?.query])
  const [registerIva, { loading }] = useMutation(REGISTER_ONE_IVA, {
    update (cache) {
      cache.modify({
        fields: {
          getAllIva (dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_IVA, data: dataOld })
          }
        }
      })
    }
  })
  const [EditIva, { loading: LoadingUpdate }] = useMutation(EDIT_ONE_IVA, {
    onError: (error) => {
      setAlertBox({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update (cache) {
      cache.modify({
        fields: {
          getAllIva (dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_IVA, data: dataOld })
          }
        }
      })
    }
  })
  const [getAllIva] = useLazyQuery(GET_ALL_IVA, {
    variables: { idComp: company.idLasComp ? company.idLasComp : null },
    fetchPolicy: 'cache-and-network'
  })
  useEffect(() => getAllIva(), [company.idLasComp])
  const handleForm = (e) => handleSubmit({
    event: e,
    action: () => {
      if (!router.query.id) {
        return registerIva({
          variables: { input: { IName: dataForm.IName, iPercentage: parseInt(dataForm.iPercentage), idComp: company.idLasComp } }
        })
      } else if (router.query.id) {
        return EditIva({
          variables: { input: { _id: router.query.id, IName: dataForm.IName, iPercentage: parseInt(dataForm.iPercentage), idComp: company.idLasComp } }
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
          title='Percentage %'
          required
          disabled={router.query.view}
          errors={errorForm?.iPercentage}
          value={dataForm?.iPercentage}
          onChange={handleChange}
          name='iPercentage'
          numeric
          range={{ min: 0, max: 15 }}
        />
        <InputHooks
          title='Iva Name'
          required
          disabled={router.query.view}
          errors={errorForm?.IName}
          value={dataForm?.IName}
          onChange={handleChange}
          name='IName'
          range={{ min: 0, max: 50 }}
        />

        <RippleButton disabled={router.query.view} padding='10px' width={'100%'} type='submit' >{loading ? <LoadEllipsis /> : router.query.edit ? 'Edit' : 'Save'}</RippleButton>
      </Form>
    </div>
  )
}

Iva.propTypes = {

}
