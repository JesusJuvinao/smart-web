import React, { useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LoadEllipsis, Loading } from '../../components/Loading'
import { CREATE_ONE_MODULE, GET_MODULES } from './queries'
import { Context } from '../../context'
import { useUser } from '../Profile'
import { useFormTools } from '../../components/hooks/useForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Card, Container, ContainerCard } from './styled'
import { RippleButton } from '../../components/Ripple'
import { SCColor } from '../../public/colors'
export const DashboardAmin = () => {
  const { setAlertBox, company } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()

  const [dataUser] = useUser()
  const { data: dataHtml } = useQuery(GET_MODULES, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const [registerModule, { loading, data }] = useMutation(CREATE_ONE_MODULE, {
    onError: (error) => {
      setAlertBox({
        message: `${error}`,
        color: 'error'
      })
    },
    onCompleted: data => {
      setAlertBox({
        message: `${data}`,
        color: 'success'
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          getAllModules(dataOld = []) {
            return cache.writeQuery({ query: GET_MODULES, data: dataOld })
          }
        }
      })
    }
  })
  if (loading) return <Loading />
  // SUBMIT FUNC
  const handleForm = (e, show) => handleSubmit({
    event: e,
    action: () => {
      if (!show) {
        return registerModule({
          variables: {
            input: {
              mPath: dataForm?.mPath,
              mName: dataForm.mName,
              mPriority: parseInt(dataForm.mPriority),
              mIcon: parseInt(dataForm.mIcon)
            },
            //  Array
            inputLineItemsMod: {
              setDataModule: []
            }
          }
        })
      } else if (show === 2) {
        console.log('')
      } else if (show === 3) {
        return null
      }
    },
    actionAfterSuccess: () => {
      setDataValue({})
    }
  })
  return (<Container>
    <ContainerCard>
      <Card>
        <form onSubmit={(e) => (handleForm(e))}>
          <span> Add Module  </span>
          <InputHooks title='Path Name.' width='100%' required errors={errorForm?.mPath} value={dataForm?.mPath} disabled={false} onChange={handleChange} name='mPath' />
          <InputHooks title='Module Name.' width='100%' required errors={errorForm?.mName} value={dataForm?.mName} disabled={false} onChange={handleChange} name='mName' />
          <InputHooks title='Priority Module.' type='number' width='100%' required errors={errorForm?.mPriority} value={dataForm?.mPriority} disabled={false} onChange={handleChange} name='mPriority' />
          <InputHooks title='mIcon Module.' type='number' width='100%' required errors={errorForm?.mIcon} value={dataForm?.mIcon} disabled={false} onChange={handleChange} name='mIcon' />
          <RippleButton bgColor={SCColor} margin='20px 0px' widthButton='100%' type='submit'>{loading ? <LoadEllipsis /> : 'Submit'}</RippleButton>
        </form>
      </Card>
    </ContainerCard>
  </Container>
  )
}
