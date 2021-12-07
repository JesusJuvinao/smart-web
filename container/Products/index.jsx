import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context'
import { ALL_COMPANIES_BY_USER } from '../Company/queries'
import { CREATE_PRODUCTS, DELETE_ONE_PRODUCTS, GET_ALL_PRODUCT_BY_ID } from './queries'
import { ALL_CURRENCY, SUPPLIER_FOR_COMPANY } from '../Supplier/queries'
import { useFormTools } from '../../components/hooks/useForm'
import { updateCache } from '../../utils'
import { nanoid } from 'nanoid'
import { useUser } from '../Profile'
import { Products } from '../../components/Products'
import { GET_ALL_IVA } from '../graphql/queries'

export const ProductsC = () => {
  // State
  const { setAlertBox, company, handleClickMenu, menu, handleMenu } = useContext(Context)

  const [baseHandle, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [modal, setModal] = useState(true)
  const [check, setCheck] = useState(false)
  const [check2, setCheck2] = useState(false)
  const today = new Date()
  const dateNow = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  // queries
  const [dataUser] = useUser()
  const [getSuppliersForCompany, { data: dataSupplier }] = useLazyQuery(SUPPLIER_FOR_COMPANY, { variables: { idC: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const [newProductForCompany, { loading }] = useMutation(CREATE_PRODUCTS)
  const [getAllIva, { data: dataIva }] = useLazyQuery(GET_ALL_IVA, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })

  const [getProductsForCompany, { data: dataProducts }] = useLazyQuery(GET_ALL_PRODUCT_BY_ID, {
    variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany },
    fetchPolicy: navigator.onLine ? 'network-only' : 'cache-only'
  })
  const { data: datCurrency } = useQuery(ALL_CURRENCY)
  const { data: datCompany, loading: LoadingCompany } = useQuery(ALL_COMPANIES_BY_USER)
  const handleUpdate = async index => {
    const { id } = index
    const results = await newProductForCompany({
      variables: { input: { id: id } },
      update (cache) {
        cache.modify({
          fields: {
            getProductsForCompany (dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_PRODUCT_BY_ID, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  // EFFECT
  useEffect(() => getSuppliersForCompany(), [company])
  useEffect(() => getProductsForCompany(), [company])
  const selectedTags = (tags) => {
  }
  const handleForm = e => handleSubmit({
    event: e,
    action: () => newProductForCompany({
      variables: {
        input: {
          idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany,
          pName: dataForm.pName,
          pServiceCode: dataForm.pServiceCode,
          pCategory: dataForm.pCategory,
          pClass: dataForm.pClass,
          pDescription: dataForm.pDescription,
          pSellToOthers: check,
          pSalesPrice: parseInt(dataForm.pSalesPrice),
          pIncVAT: check2,
          idRef: `${nanoid()}`,
          pIncomeAccount: dataForm.pIncomeAccount,
          pPurchasedOthers: check2,
          pType: dataForm.pType,
          pVATCode: dataForm.pVATCode,
          pPhoto: previewImg[0]
        }
      }
    }),
    update: (cache, { data: { getDataAllById } }) => updateCache({
      cache,
      query: GET_ALL_PRODUCT_BY_ID,
      nameFun: 'getProductsForCompany',
      dataNew: getDataAllById
    }),
    actionAfterSuccess: () => {
      setDataValue({})
    }
  })

  const fileInputRef = useRef(null)
  const [images, setImages] = useState([])
  const [previewImg, setPreviewImg] = useState(false)
  useEffect(() => getAllIva(), [company])

  const onFileInputChange = event => {
    const { files } = event?.target
    setImages([files])
    setPreviewImg([URL.createObjectURL(files[0])])
  }
  const onTargetClick = e => {
    e.preventDefault()
    fileInputRef?.current?.click()
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
  const HandleClickEdit = (item) => {
    handleMenu(4)
  }
  const [DeleteOneProducts] = useMutation(DELETE_ONE_PRODUCTS)

  const handleDelete = async (elem) => {
    const { _id } = elem
    const results = await DeleteOneProducts({
      variables: { id: _id },
      update(cache) {
        cache.modify({
          fields: {
            getProductsForCompany(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_PRODUCT_BY_ID, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  useEffect(() => {
    setDataValue({
      refCode: `${nanoid()}`,
      dateNow: `${dateNow}`
    })
  }, [])
  return (
    <Products
      handleDelete={handleDelete}
      HandleClickEdit={HandleClickEdit}
      handleSubmit={handleForm}
      setAlertBox={setAlertBox}
      onChange={handleChange}
      menu={menu}
      dataForm={dataForm}
      loading={loading || LoadingCompany}
      handleUpdate={handleUpdate}
      modal={modal}
      dateNow={dateNow}
      setModal={setModal}
      handleClickMenu={handleClickMenu}
      datCurrency={datCurrency?.getCurrencies}
      datCompany={datCompany?.getAllCompanyById}
      dataIva={dataIva?.getAllIva}
      data={dataProducts?.getProductsForCompany}
      selectedTags={selectedTags}
      dataSupplier={dataSupplier?.getSuppliersForCompany}
      errorForm={errorForm}
      setCheck={setCheck}
      setCheck2={setCheck2}
      // View Image
      onTargetClick={onTargetClick}
      onFileInputChange={onFileInputChange}
      images={images}
      previewImg={previewImg}
      fileInputRef={fileInputRef}
      setImages={setImages}
    />
  )
}
