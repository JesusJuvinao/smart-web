import React, { useContext } from 'react'
import { AwesomeModal } from '@/components/AwesomeModal'
import { useFormTools } from '@/components/hooks/useForm'
import InputHooks from '@/components/InputHooks/InputHooks'
import { useMutation } from '@apollo/client'
import { ALL_COMPANIES_BY_USER, CREATE_ONE_COMPANY } from 'container/Company/queries'
import { updateCacheMod } from '@/utils/index'
import { useRouter } from 'next/router'
import { Loading, LoadEllipsis } from '@/components/Loading'
import { useSetState } from '@/components/hooks/useState'
import { RippleButton } from '@/components/Ripple'
import { Context } from 'context'

export const RegisterCompanyModal = () => {
  // STATE
  const { handleMenu, menu } = useContext(Context)
  const { state, setState } = useSetState(true)
  const router = useRouter()
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  // QUERIES
  const [newCompany, { loading }] = useMutation(CREATE_ONE_COMPANY)
  const handleForm = (e) => handleSubmit({
    event: e,
    action: () => {
      if (!router.query.id) {
        return newCompany({
          variables: {
            input: {
              companyName: dataForm.companyName,
              registeredOfficeAddress: dataForm.registeredOfficeAddress,
              companyLegalStatus: dataForm.companyLegalStatus,
              companyType: dataForm.companyType,
              accounts: dataForm.accounts,
              natureOfBusiness: dataForm.accounts,
              dissolvedOn: dataForm.dissolvedOn,
              incorporatedOn: dataForm.incorporatedOn
            }
          },
          update: (cache, { data: { getAllCompany } }) => updateCacheMod({
            cache,
            query: ALL_COMPANIES_BY_USER,
            nameFun: 'getAllCompanyById',
            dataNew: getAllCompany
          })
        })
      } else if (router.query.id) {
        return null
      }
    },
    actionAfterSuccess: () => {
      setDataValue({
      })
    }
  })
  if (loading) return <Loading />
  return (
        <div>
            {<AwesomeModal zIndex='999999' show={menu === 'MenuCompany' } height='100vh' onHide={() => { handleMenu(false); router.replace(router.pathname) }} onCancel={() => true} btnCancel={false} btnConfirm={false} header={true} title={'Register New Company'} size="large" footer={false} >
                <form onSubmit={e => (handleForm(e))}>
                    <InputHooks title='Name Company' required name='companyName' error={errorForm?.companyName} value={dataForm?.companyName} onChange={handleChange} />
                    <InputHooks title='Registered Office Address' required name='registeredOfficeAddress' error={errorForm?.registeredOfficeAddress} value={dataForm?.registeredOfficeAddress} onChange={handleChange} />
                    <InputHooks title='Company Status' required name='companyLegalStatus' error={dataForm?.companyLegalStatus} value={dataForm?.companyLegalStatus} onChange={handleChange} />
                    <InputHooks title='Accounts' required name='accounts' error={errorForm?.accounts} value={dataForm?.accounts} onChange={handleChange} />
                    <InputHooks title='Nature Of Business (SIC)' required name='natureOfBusiness' error={errorForm?.natureOfBusiness} value={dataForm?.natureOfBusiness} onChange={handleChange} />
                    <InputHooks width='50%' title='Incorporated On' type='date' required name='incorporatedOn' error={errorForm?.incorporatedOn} value={dataForm?.incorporatedOn} onChange={handleChange} />
                    <InputHooks width='10%' padding='0' type='color' required name='color' error={errorForm?.color} value={dataForm?.color} onChange={handleChange} />
                    <RippleButton padding='10px' widthButton={'100%'} type='submit' >{loading ? <LoadEllipsis /> : 'Save'}</RippleButton>
                </form>
            </AwesomeModal>}
        </div>
  )
}
