import React, { useContext, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Form, Select } from './styled'
import { useFormTools } from '../../components/hooks/useForm'
import { Context } from '../../context'
import { GET_ALL_ACCOUNT, REGISTER_ONE_ACCOUNT } from '../graphql/queries'
import { RippleButton } from '../../components/Ripple'
import { LoadEllipsis, Loading } from '../../components/Loading'
import { useRouter } from 'next/router'
import { WColor } from '../../public/colors'
import { EDIT_ONE_ACCOUNT } from '../Accounts/queries'

export const Accounts = () => {
  const router = useRouter()
  const { company, setAlertBox, handleMenu } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, errorSubmit, setForcedError }] = useFormTools()
  useEffect(() => {
    setDataValue({
      aDescription: router.query.aDescription,
      aName: router.query.aName,
      aBalance: router.query.aBalance,
      aType: router.query.aType
    })
  }, [router?.query])
  const [registerAccount, { loading }] = useMutation(REGISTER_ONE_ACCOUNT, {
    onError: (error) => {
      setAlertBox({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          getAllAccount(dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_ACCOUNT, data: dataOld })
          }
        }
      })
    }
  })
  useEffect(() => {
    if (!dataForm) {
      setForcedError({
        aDescription: router.query.aDescription,
        aName: router.query.aName,
        aBalance: router.query.aBalance,
        aType: router.query.aType
      })
    }
  }, [dataForm])
  const [EditAccounts, { loading: LoadingUpdate }] = useMutation(EDIT_ONE_ACCOUNT, {
    onError: (error) => {
      setAlertBox({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          getAllAccount(dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_ACCOUNT, data: dataOld })
          }
        }
      })
    }
  })
  const [getAllAccount] = useLazyQuery(GET_ALL_ACCOUNT, {
    variables: { idComp: company.idLasComp ? company.idLasComp : null },
    fetchPolicy: 'cache-and-network'
  })
  useEffect(() => getAllAccount(), [company.idLasComp])
  const handleForm = (e, show) => handleSubmit({
    event: e,
    action: () => {
      if (!router.query.id || !errorSubmit) {
        return registerAccount({
          variables: { input: { aName: dataForm.aName, aBalance: parseInt(dataForm.aBalance), aDescription: dataForm.aDescription, idComp: company.idLasComp, aType: dataForm.aType } }
        })
      } else if (router.query.id || !errorSubmit) {
        return EditAccounts({
          variables: { input: { _id: router.query.id, aName: dataForm.aName, aBalance: parseInt(dataForm.aBalance), aDescription: dataForm.aDescription, idComp: company.idLasComp, aType: dataForm.aType } }
        })
      } else if (show === 3) {
        return null
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
          title='Name Account'
          required
          disabled={router.query.view}
          value={dataForm?.aName}
          error={errorForm?.aName}
          onChange={handleChange}
          name='aName'
          range={{ min: 0, max: 15 }}
        />
        <InputHooks
          title='Balance'
          disabled={router.query.view}
          required
          value={dataForm?.aBalance}
          error={errorForm?.aBalance}
          onChange={handleChange}
          name='aBalance'
          numeric
          range={{ min: 0, max: 50 }}
        />
        <InputHooks
          title='Description'
          disabled={router.query.view}
          required
          value={dataForm?.aDescription}
          error={errorForm?.aDescription}
          onChange={handleChange}
          name='aDescription'
          TypeTextarea
          range={{ min: 0, max: 500 }}
        />
        <Select onChange={handleChange} name='aType' id='Select1'>
          <option value='ASSETS'>ASSETS</option>
          <option value='INCOME'>INCOME</option>
          <option value='LIABILITY'>LIABILITY</option>
          <option value='EXPENSE'>EXPENSE</option>
        </Select>
        <RippleButton disabled={router.query.view} padding='10px' width={'100%'} type='submit' >{loading ? <LoadEllipsis /> : router.query.edit ? 'Edit' : 'Save'}</RippleButton>
      </Form>
    </div>
  )
}

Accounts.propTypes = {

}
