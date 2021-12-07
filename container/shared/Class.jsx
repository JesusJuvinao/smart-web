/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Form } from './styled'
import { useFormTools } from '../../components/hooks/useForm'
import { CREATE_ONE_CLASS_FOR_COMPANY, ALL_CLASS_FOR_COMPANY, UPDATE_ONE_CLASS_FOR_COMPANY } from '../Clases/queries'
import { RippleButton } from '../../components/Ripple'
import { Context } from '../../context'
import { useRouter } from 'next/router'
import { LoadEllipsis, Loading } from '../../components/Loading'
import { useUser } from '../Profile'
import { WColor } from '../../public/colors'

export const Class = () => {
  const router = useRouter()
  const { company, setAlertBox, handleMenu } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm }] = useFormTools()
  const [dataUser] = useUser()
  useEffect(() => {
    setDataValue({
      className: router.query.className,
      SubClass: router.query.SubClass
    })
  }, [router?.query])
  const [createClassMutation, { loading }] = useMutation(CREATE_ONE_CLASS_FOR_COMPANY, {
    update (cache) {
      cache.modify({
        fields: {
          getClass (dataOld = []) {
            return cache.writeQuery({ query: ALL_CLASS_FOR_COMPANY, data: dataOld })
          }
        }
      })
    }
  })
  const [EditClass, { loading: LoadingUpdate }] = useMutation(UPDATE_ONE_CLASS_FOR_COMPANY, {
    onError: (error) => {
      setAlertBox({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update (cache) {
      cache.modify({
        fields: {
          getClass (dataOld = []) {
            return cache.writeQuery({ query: ALL_CLASS_FOR_COMPANY, data: dataOld })
          }
        }
      })
    }
  })
  const handleForm = (e) => handleSubmit({
    event: e,
    action: () => {
      if (!router.query.id) {
        return createClassMutation({
          variables: { input: { className: dataForm.className, SubClass: dataForm.SubClass, idComp: company.idLasComp } }
        })
      } else if (router.query.id) {
        return EditClass({
          variables: { input: { _id: router.query.id, className: dataForm.className, SubClass: dataForm.SubClass, idComp: company.idLasComp } }
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
                    title='Class Name'
                    required
                    disabled={router.query.view}
                    errors={dataForm?.className}
                    value={dataForm?.className}
                    onChange={handleChange}
                    name='className'
                    padding='15px 0px'
                />
                <InputHooks
                    title='Sub Class'
                    required
                    disabled={router.query.view}
                    errors={dataForm?.SubClass}
                    value={dataForm?.SubClass}
                    onChange={handleChange}
                    name='SubClass'
                    padding='15px 0px'
                />
                <RippleButton disabled={router.query.view} padding='10px' margin="20px 0 0" width={'100%'} type='submit' >{loading ? <LoadEllipsis /> : router.query.edit ? 'Edit' : 'Save'}</RippleButton>
            </Form>
        </div>
  )
}

Class.propTypes = {

}
