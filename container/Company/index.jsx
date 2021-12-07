import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useMutation, useQuery } from '@apollo/client'
import { Context } from '../../context'
import { ALL_COMPANIES_BY_USER, CREATE_ONE_COMPANY, DELETE_ONE_COMPANY } from './queries'
import { updateCacheMod } from '../../utils'
import { CHANGE_COMPANY_STATE } from '../Profile/queries'
import { useUser } from '../Profile'
import { useSetState } from '../../components/hooks/useState'
import { useRouter } from 'next/dist/client/router'
import { IconDelete, IconEdit, IconPromo } from '../../public/icons'
import { PColor } from '../../public/colors'
import InputHooks from '../../components/InputHooks/InputHooks'
import { AwesomeModal } from '../../components/AwesomeModal'
import { LoadEllipsis, Loading } from '../../components/Loading'
import { useFormTools } from '../../components/hooks/useForm'
import { RippleButton } from '../../components/Ripple'
import { Skeleton } from '../../components/Loading/skeleton'
import { ContainerCard, Form, Container, Text, CardCompany, ButtonCard, ActionName, Content, Click } from './styled'

export const CompanyC = ({ useCompany }) => {
  // State
  const HandleClickEdit = (item) => {
    setState(!state)
  }
  const router = useRouter()
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  useEffect(() => {
    setDataValue({
      companyName: router.query.companyName,
      registeredOfficeAddress: router.query.registeredOfficeAddress,
      companyLegalStatus: router.query.companyLegalStatus,
      accounts: router.query.accounts,
      natureOfBusiness: router.query.natureOfBusiness,
      dissolvedOn: router.query.dissolvedOn
    })
  }, [router?.query])

  const [newCompany, { loading }] = useMutation(CREATE_ONE_COMPANY)
  const [lastCompanyMutation, { loading: loadLastCompany }] = useMutation(CHANGE_COMPANY_STATE)
  const { data: dataCompany } = useQuery(ALL_COMPANIES_BY_USER)
  const { setAlertBox, handleMenu } = useContext(Context)
  const { state, setState } = useSetState(false)
  const [data] = useUser()
  const handleCompany = async index => {
    const { _id } = index
    const id = _id
    useCompany(id)
    router.push('/dashboard')
    await lastCompanyMutation({ variables: { lastCompany: _id } }).catch(err => setAlertBox({ message: `${err}`, duration: 300000 }))
  }
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
        return console.log(handleForm)
      }
    },
    actionAfterSuccess: () => {
      setDataValue({
      })
    }
  })

  const [color, setColor] = useState('')
  useEffect(() => {
    setColor(`#${parseInt(Math.random() * 999)}`)
  }, [])

  const DUMMY_DATA = [
    {
      companyName: 'test company',
      registeredOfficeAddress: 'test company',
      companyLegalStatus: 'test company',
      companyType: 'test company',
      accounts: 'test company',
      natureOfBusiness: 'test company',
      dissolvedOn: 'test company',
      incorporatedOn: 'test company'
    }
  ]
  const [deleteCompany, { loading: loadDeleteBills }] = useMutation(DELETE_ONE_COMPANY, {
    // onCompleted: () => setAlertBox({ message: `${dataDelete?.deleteCompany?.message}`, duration: 8000, color: 'success' }),
    update: (cache, { data: { getAllCompany } }) => updateCacheMod({
      cache,
      query: ALL_COMPANIES_BY_USER,
      nameFun: 'getAllCompanyById',
      dataNew: getAllCompany
    })
  })
  const handleDelete = async (_id, companyName) => {
    const results = await deleteCompany({
      variables: { id: _id, companyName: companyName },
      update (cache) {
        cache.modify({
          fields: {
            getAllCompanyById (dataOld = []) {
              return cache.writeQuery({ query: ALL_COMPANIES_BY_USER, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  return (
    <>
      <Container>
        {(loading || loadLastCompany || loadDeleteBills) && <Loading />}
        <RippleButton widthButton='200px' standard onClick={() => handleMenu(5)}>
          Add Company
        </RippleButton>
        <Content data={dataCompany?.getAllCompanyById > 0}>
          {<AwesomeModal show={state} backdrop onHide={() => { setState(false); router.replace(router.pathname) }} onCancel={() => true} btnCancel={false} btnConfirm={false} header={true} title={'Register New Company'} size="large" footer={false} >
            <ContainerCard>
              <div>
                <Form onSubmit={e => (handleForm(e))}>
                  <InputHooks title='Name Company' required name='companyName' error={errorForm?.companyName} value={dataForm?.companyName} onChange={handleChange} defaultValue={DUMMY_DATA[0]?.companyName} />
                  <InputHooks title='Registered Office Address' required name='registeredOfficeAddress' error={errorForm?.registeredOfficeAddress} value={dataForm?.registeredOfficeAddress} onChange={handleChange} />
                  <InputHooks title='Company Status' required name='companyLegalStatus' error={dataForm?.companyLegalStatus} value={dataForm?.companyLegalStatus} onChange={handleChange} />
                  {/* <InputHooks title='Company Type' required name='companyType' error={errorForm?.companyType} value={dataForm?.companyType} onChange={handleChange} /> */}
                  <InputHooks title='Accounts' required name='accounts' error={errorForm?.accounts} value={dataForm?.accounts} onChange={handleChange} />
                  <InputHooks title='Nature Of Business (SIC)' required name='natureOfBusiness' error={errorForm?.natureOfBusiness} value={dataForm?.natureOfBusiness} onChange={handleChange} />
                  {/* <InputHooks width='50%' title='Dissolved On' type='date' required name='dissolvedOn' error={errorForm?.dissolvedOn} value={dataForm?.dissolvedOn} onChange={handleChange} /> */}
                  <InputHooks width='50%' title='Incorporated On' type='date' required name='incorporatedOn' error={errorForm?.incorporatedOn} value={dataForm?.incorporatedOn} onChange={handleChange} />
                  <InputHooks width='10%' padding='0' type='color' required name='color' error={errorForm?.color} value={dataForm?.color} onChange={handleChange} />
                  <RippleButton padding='10px' widthButton={'100%'} type='submit' >{loading ? <LoadEllipsis /> : 'Save'}</RippleButton>
                </Form>
              </div>
            </ContainerCard>
          </AwesomeModal>}
          {dataCompany
            ? dataCompany.getAllCompanyById?.map((x) => (
              <CardCompany key={x._id} hover>
                <ButtonCard onClick={() => handleDelete(x._id, x.companyName)}>
                  <IconDelete size={20} color={PColor} />
                  <ActionName >
                    Delete
                  </ActionName>
                </ButtonCard>
                <Link href={{ pathname: 'new-company', query: { companyName: x.companyName, accounts: x.accounts, companyLegalStatus: x.companyLegalStatus, dissolvedOn: x.dissolvedOn, incorporatedOn: x.incorporatedOn, id: x._id, natureOfBusiness: x.natureOfBusiness, registeredOfficeAddress: x.registeredOfficeAddress, edit: true } }}>
                  <ButtonCard delay='.1s' top={'80px'} color={1} onClick={() => HandleClickEdit({ ...x, view: 2 })}>
                    <IconEdit size={20} color={PColor} />
                    <ActionName>
                      Edit
                    </ActionName>
                  </ButtonCard>
                </Link>
                <ButtonCard delay='.2s' top={'140px'}>
                  <IconPromo size={20} color={PColor} />
                  <ActionName>
                    Change State
                  </ActionName>
                </ButtonCard>
                {<Click style={{ backgroundColor: dataCompany ? x.color : color }} onClick={() => handleCompany({ ...x })} >{x.companyName.slice(0, 2).toUpperCase()}
                </Click>}
                <Text size='1em' >{x.incorporatedOn}</Text>
                <Text>{x.accounts}</Text>
                <Text>{x.companyLegalStatus}</Text>
                <Text>{x.dissolvedOn}</Text>
                <Text>{x.incorporatedOn}</Text>
                <Text>{x.natureOfBusiness}</Text>
                <Text>{x.registeredOfficeAddress}</Text>
              </CardCompany>
            ))
            : <Skeleton direction='row' />}
        </Content>
      </Container>
    </>
  )
}

CompanyC.propTypes = {
  useCompany: PropTypes.func
}
