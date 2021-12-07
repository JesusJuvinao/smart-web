import React, { useContext, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Form } from './styled'
import { useFormTools } from '../../components/hooks/useForm'
import { Context } from '../../context'
import { CREATE_ONE_CATEGORIES, GET_ALL_CATEGORIES } from '../graphql/queries'
import { RippleButton } from '../../components/Ripple'
import { LoadEllipsis, Loading } from '../../components/Loading'
import { useRouter } from 'next/router'
import { WColor } from '../../public/colors'
import { EDIT_ONE_CATEGORIES } from '../Categories/queries'

export const Categories = () => {
  const router = useRouter()
  const { company, setAlertBox, handleMenu } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  useEffect(() => {
    setDataValue({
      cDescription: router.query.cDescription,
      cName: router.query.cName
    })
  }, [router?.query?._id])
  const [newCategoriesForCompany, { loading }] = useMutation(CREATE_ONE_CATEGORIES, {
    onError: (error) => {
      setAlertBox({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          getCategoryForCompany (dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_CATEGORIES, data: dataOld })
          }
        }
      })
    }
  })
  const [EditCategoriesForCompany, { loading: LoadingUpdate }] = useMutation(EDIT_ONE_CATEGORIES, {
    onError: (error) => {
      setAlertBox({
        message: `${error}`,
        color: WColor
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          getCategoryForCompany(dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_CATEGORIES, data: dataOld })
          }
        }
      })
    }
  })
  const [getCategoryForCompany] = useLazyQuery(GET_ALL_CATEGORIES, {
    variables: { idComp: company.idLasComp ? company.idLasComp : null },
    fetchPolicy: 'cache-and-network'
  })
  useEffect(() => getCategoryForCompany(), [company.idLasComp])
  const handleForm = (e) => handleSubmit({
    event: e,
    action: () => {
      if (!router.query._id) {
        return newCategoriesForCompany({
          variables: { input: { cName: dataForm.cName, cDescription: dataForm.cDescription, idComp: company.idLasComp } }
        })
      } else if (router.query._id) {
        return EditCategoriesForCompany({
          variables: { input: { _id: router.query._id, cName: dataForm.cName, cDescription: dataForm.cDescription, idComp: company.idLasComp } }
        })
      }
    },
    actionAfterSuccess: () => {
      setDataValue({})
      handleMenu(false)
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
          errors={errorForm?.cName}
          value={dataForm?.cName}
          onChange={handleChange}
          name='cName'
          range={{ min: 0, max: 15 }}
        />
        <InputHooks
          title='Description'
          required
          disabled={router.query.view}
          errors={errorForm?.cDescription}
          value={dataForm?.cDescription}
          onChange={handleChange}
          name='cDescription'
          TypeTextarea
          range={{ min: 0, max: 500 }}
        />

        <RippleButton disabled={router.query.view} padding='10px' width={'100%'} type='submit' >{loading ? <LoadEllipsis /> : router.query.edit ? 'Edit' : 'Save'}</RippleButton>
      </Form>
    </div>
  )
}

Categories.propTypes = {

}
