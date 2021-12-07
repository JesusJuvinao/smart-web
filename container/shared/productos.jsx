/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { Context } from '../../context'
import { CREATE_PRODUCTS, EDIT_PRODUCTS, GET_ALL_PRODUCT_BY_ID } from '../Products/queries'
import { useFormTools } from '../../components/hooks/useForm'
import { Loading } from '../../components/Loading'
import { nanoid } from 'nanoid'
import { useUser } from '../Profile'
import InputHooks from '../../components/InputHooks/InputHooks'
import { ButtonStatus, Card, ContentImg, CtnImg, Form, Img, InputFile, Textarea, Text, ContainerInput } from './styled'
import { IconDelete, IconEdit, IconImg } from '../../public/icons'
import { EColor, WColor } from '../../public/colors'
import { useSetState } from '../../components/hooks/useState'
import { useRouter } from 'next/router'

export const Product = () => {
  // State
  const router = useRouter()
  const { setAlertBox, company, handleMenu } = useContext(Context)
  const [baseHandle, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const today = new Date()
  const dateNow = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  // queries
  const [dataUser] = useUser()
  const [newProductForCompany, { loading }] = useMutation(CREATE_PRODUCTS, {
    onError: (error) => {
      setAlertBox({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          getProductsForCompany(dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_PRODUCT_BY_ID, data: dataOld })
          }
        }
      })
    }
  })
  const [editOneProduct, { loading: LoadingUpdate }] = useMutation(EDIT_PRODUCTS, {
    onError: (error) => {
      setAlertBox({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          getProductsForCompany(dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_PRODUCT_BY_ID, data: dataOld })
          }
        }
      })
    }
  })
  const stateA = useSetState(false)
  const stateB = useSetState(false)
  const stateC = useSetState(false)
  // EFFECT
  useEffect(() => {
    if (router.query.pSellToOthers === 'false') {
      stateA.setState(false)
    } else {
      stateA.setState(true)
    }
  }, [router.query, router.query.pSellToOthers])
  useEffect(() => {
    setDataValue({
      pName: router.query.pName,
      pServiceCode: router.query.pServiceCode,
      pCategory: router.query.pCategory,
      pClass: router.query.pClass,
      pDescription: router.query.pDescription,
      pSellToOthers: router.query.state,
      pSalesPrice: router.query.pSalesPrice,
      pIncVAT: router.query.pIncVAT,
      refCode: router.query.idRef,
      pIncomeAccount: router.query.pIncomeAccount,
      pPurchasedOthers: router.query.pPurchasedOthers,
      pType: router.query.pType,
      pVATCode: router.query.pVATCode,
      pPhoto: router.query.pPhoto
    })
  }, [router?.query])
  const handleForm = (e) => handleSubmit({
    event: e,
    action: () => {
      if (!router.query.id) {
        return newProductForCompany({
          variables: {
            input: {
              idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany,
              pName: dataForm.pName,
              pServiceCode: dataForm.pServiceCode,
              pCategory: dataForm.pCategory,
              pClass: dataForm.pClass,
              pDescription: dataForm.pDescription,
              pSellToOthers: stateA.state,
              pSalesPrice: parseInt(dataForm.pSalesPrice),
              pIncVAT: stateB.state,
              idRef: `${nanoid()}`,
              pIncomeAccount: dataForm.pIncomeAccount,
              pPurchasedOthers: stateC.state,
              pType: dataForm.pType,
              pVATCode: dataForm.pVATCode,
              pPhoto: previewImg[0]
            }
          }
        })
      } else if (router.query.id) {
        return editOneProduct({
          variables: {
            input: {
              _id: router.query.id,
              idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany,
              pName: dataForm.pName,
              pServiceCode: dataForm.pServiceCode,
              pCategory: dataForm.pCategory,
              pClass: dataForm.pClass,
              pDescription: dataForm.pDescription,
              pSellToOthers: stateA.state,
              pSalesPrice: parseInt(dataForm.pSalesPrice),
              pIncVAT: stateB.state,
              idRef: router.query.idRef,
              pIncomeAccount: dataForm.pIncomeAccount,
              pPurchasedOthers: stateC.state,
              pType: dataForm.pType,
              pVATCode: dataForm.pVATCode,
              pPhoto: previewImg[0] ? previewImg[0] : router.query.pPhoto
            }
          }
        }
        )
      }
    },
    actionAfterSuccess: () => {
      setDataValue({})
      handleMenu(false)
    }
  })

  const fileInputRef = useRef(null)
  const [images, setImages] = useState([])
  const [previewImg, setPreviewImg] = useState(false)
  const onFileInputChange = event => {
    const { files } = event?.target
    setImages([files])
    setPreviewImg([!!files && URL?.createObjectURL(files[0])])
  }
  const onTargetClick = e => {
    e.preventDefault()
    !router.query.view && fileInputRef?.current?.click()
  }
  // Onchange for all
  const handleChange = (e, error, item = {}) => {
    setForcedError({ ...errorForm, [e.target.name]: error })

    const { type, key, id, obj } = item
    if (!type) {
      setDataValue({ ...dataForm, [e.target.name]: e.target.value })
    }
    if (obj) {
      setDataValue({ ...dataForm, [obj]: { ...dataForm[obj], [e.target.name]: e.target.value } })
    }
    if (type) {
      setDataValue({
        ...dataForm, [type]: dataForm?.[type].map(x => (x[key] === id || x.id === id) ? { ...x, [e.target.name]: e.target.value } : x)
      })
    }
  }
  useEffect(() => {
    setDataValue({
      refCode: `${nanoid()}`,
      dateNow: `${dateNow}`
    })
  }, [])
  if (loading || LoadingUpdate) return <Loading />
  return (
    <div>
      <Form onSubmit={e => (handleForm(e))}>
        <Card>
          <InputFile
            accept=".jpg, .png"
            onChange={onFileInputChange}
            ref={fileInputRef}
            id='iFile'
            type='file'
          />
          <Card responsive>
            <CtnImg>
              <InputHooks
                width='100%'
                title='Name Product'
                required
                disabled={router.query.view}
                errors={errorForm?.pName}
                value={dataForm?.pName}
                onChange={handleChange}
                name='pName' />

              <InputHooks
                disabled={router.query.view || router.query.edit}
                title='Bill ref'
                width='100%'
                required
                errors={errorForm?.refCode}
                value={dataForm?.refCode}
                onChange={handleChange}
                name='refCode'
                range={{ min: 0, max: 30 }} />

              <InputHooks
                width='100%'
                title='Service Code'
                required
                errors={errorForm?.pServiceCode}
                disabled={router.query.view}
                value={dataForm?.pServiceCode}
                onChange={handleChange}
                name='pServiceCode' />
            </CtnImg>

            <CtnImg>
              <ContentImg height='200px' margin='0 0 0 8px' onClick={!router.query.view && onTargetClick}>
                {previewImg ? <Img src={previewImg} alt={'img'} /> : <IconImg color='#ccc' size='200px' />}
              </ContentImg>

              <ContentImg>
                <button type='button' disabled={router.query.view} style={{ backgroundColor: '#fff' }} onClick={() => setPreviewImg(false)} setImages>
                  <IconDelete color={'#ccc'} size='20px' />
                </button>
                <button type='button' disabled={router.query.view} style={{ backgroundColor: '#fff' }} onClick={onTargetClick} setImages>
                  <IconEdit color={EColor} size='20px' />
                </button>
              </ContentImg>

              <ButtonStatus disabled={router.query.view} type='button' onClick={onTargetClick}>Upload</ButtonStatus>
            </CtnImg>
          </Card>
          {/* funciona  */}

          <Card responsive>
            <InputHooks
              width='100%'
              title='Category'
              required
              errors={errorForm?.pCategory}
              disabled={router.query.view}
              value={dataForm?.pCategory}
              onChange={handleChange}
              name='pCategory' />

            <InputHooks
              width='100%'
              title='Class'
              required
              errors={errorForm?.pClass}
              value={dataForm?.pClass}
              onChange={handleChange}
              disabled={router.query.view}
              name='pClass' />
            <Card >
              <Text margin='0 0 0 5px'> SellTo Others</Text>
              <ContainerInput margin='5px 0 10px 5px'>
                <label className="container">
                  <input disabled={router.query.view} type="checkbox" onChange={(e) => !router.query.view && stateA.setState(e.target.checked)} />
                  <span className="checkmark"></span>
                </label>
              </ContainerInput>
            </Card>

            <Text margin='20px 0 0 5px'> Description </Text>
            <Textarea
              onChange={handleChange}
              value={dataForm?.pDescription}
              disabled={router.query.view}
              name='pDescription'
              id='pDescription' />

            <InputHooks
              width='100%'
              title='Sales Price'
              required
              numeric
              errors={errorForm?.pSalesPrice}
              value={dataForm?.pSalesPrice}
              disabled={router.query.view}
              onChange={handleChange}
              name='pSalesPrice' />

            <Card >
              <Text margin='0 0 0 5px'> Inc VAT</Text>
              <ContainerInput margin='5px 0 20px 5px'>
                <label className="container">
                  <input disabled={router.query.view} type="checkbox" onChange={(e) => !router.query.view && stateB.setState(e.target.checked)} />
                  <span className="checkmark"></span>
                </label>
              </ContainerInput>
            </Card>
            <InputHooks
              width='100%'
              title='Income Account'
              disabled={router.query.view}
              required
              numeric
              errors={errorForm?.pIncomeAccount}
              value={dataForm?.pIncomeAccount}
              onChange={handleChange}
              name='pIncomeAccount' />

            <Card >
              <Text margin='0 0 0 5px'> Purchased Others</Text>
              <ContainerInput margin='5px 0 20px 5px'>
                <label className="container">
                  <input disabled={router.query.view} type="checkbox" onChange={(e) => !router.query.view && stateC.setState(e.target.checked)} />
                  <span className="checkmark"></span>
                </label>
              </ContainerInput>
            </Card>

            <InputHooks
              width='100%'
              disabled={router.query.view}
              title='Type'
              required
              errors={errorForm?.pType}
              value={dataForm?.pType}
              onChange={handleChange}
              name='pType' />

            <InputHooks
              width='100%'
              title='VAT Code'
              required
              errors={errorForm?.pVATCode}
              disabled={router.query.view}
              value={dataForm?.pVATCode}
              onChange={handleChange}
              name='pVATCode' />
          </Card>
        </Card>
        <ButtonStatus disabled={router.query.view} type='submit' >Save</ButtonStatus>

      </Form>
    </div>
  )
}

Product.propTypes = {

}
