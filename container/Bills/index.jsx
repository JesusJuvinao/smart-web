/* eslint-disable array-callback-return */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../context'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Bills } from '../../components/Bills'
import { CREATE_BILL, DELETE_ONE_BILL, DELETE_ONE_LINE_ITEMS, DELETE_ONE_TAG, EDIT_BILL, FIND_ONE_BILLS, GET_ALL_BILL, GET_ALL_LINKS_FILES, UPLOAD_FILE } from './queries'
import { GET_ONE_CURRENCY, SUPPLIER_FOR_COMPANY } from '../Supplier/queries'
import { useFormTools } from '../../components/hooks/useForm'
import { CalculateAmount, CalculateIva, dateNow, mongoObjectId, updateCacheMod } from '../../utils'
import { nanoid } from 'nanoid'
import { useUser } from '../Profile'
import { GET_ALL_ACCOUNT, GET_ALL_IVA } from '../graphql/queries'
import { GET_ALL_PRODUCT_BY_ID } from '../Products/queries'
import { useSetState } from '../../components/hooks/useState'
import { useRouter } from 'next/dist/client/router'
import { DELETE_ONE_FILE, DELETE_ONE_FILE_MINIO_CLIENT, GET_ALL_FILE_MINIO } from '../Attachments/queries'
import { ALL_CLASS_FOR_COMPANY } from '../Clases/queries'
export const BillsC = () => {
  // State
  const [dataUser] = useUser()
  const { setAlertBox, handleMenu, menu, company } = useContext(Context)
  const [handleChangeStatics, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [modal, setModal] = useState(true)
  const refs = useRef([React.createRef(), React.createRef()])
  const [isUpload, setUpload] = useState(false)
  const [tags, setTags] = useState([])
  const [billSubTotal, setSubTotal] = useState(0)
  const [Disable, setDisable] = useState(false)
  const [fileBill, setFileBill] = useState([])
  const [reset, setReset] = useState(false)
  const [files, setFiles] = useState([])
  const ProgressUpload = useSetState(false)
  const countProgress = useSetState(0)
  const isEdit = useSetState(false)
  const location = useRouter()
  const [showLateral, setShowLateral] = useState(false)
  const router = useRouter()
  const IdMongo = useSetState()
  const LinkMinio = useSetState(null)
  const [setTotalIva, setCalTotalIva] = useState(0)
  const [total, setTotal] = useState(0)
  const FileNameLink = useSetState()
  const [size, setsize] = useState(0)
  const [width, setWidth] = useState(false)
  // queries

  const { data: dataOneSupplier } = useQuery(GET_ONE_CURRENCY, { variables: { id: dataForm && dataForm?._id }, fetchPolicy: 'cache-and-network' })
  const { data: dataOneBill } = useQuery(FIND_ONE_BILLS, { variables: { id: router.query.IdBills && router.query.IdBills }, fetchPolicy: 'cache-and-network' })
  const { data: dataSupplier } = useQuery(SUPPLIER_FOR_COMPANY, { variables: { idC: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const { data: dataAccount } = useQuery(GET_ALL_ACCOUNT, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const { data: dataProducts } = useQuery(GET_ALL_PRODUCT_BY_ID, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const { data: dataIva } = useQuery(GET_ALL_IVA, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const [createBillMutation, { loading, error }] = useMutation(CREATE_BILL)
  const [deleteOneLineItem] = useMutation(DELETE_ONE_LINE_ITEMS)
  const [DeleteOneBill, { loading: loadingDeleteBill }] = useMutation(DELETE_ONE_BILL)
  const [deleteOneFileMinio] = useMutation(DELETE_ONE_FILE_MINIO_CLIENT)
  const { data: dataClass } = useQuery(ALL_CLASS_FOR_COMPANY, { variables: { idComp: company.idLasComp ? company.idLasComp : null }, fetchPolicy: 'cache-and-network' })
  const [DeleteOneFile] = useMutation(DELETE_ONE_FILE, { update (cache) { cache.modify({ fields: { getAllFilesToBills (dataOld = []) { return cache.writeQuery({ query: GET_ALL_FILE_MINIO, data: dataOld }) } } }) } })
  const [updateBill, { loading: loadingUpdate, error: errorUpdate }] = useMutation(EDIT_BILL, { update (cache) { cache.modify({ fields: { getAllFilesToBills (dataOld = []) { return cache.writeQuery({ query: GET_ALL_FILE_MINIO, data: dataOld }) } } }) } })
  const [getAllFilesLinkToBills, { data: dataLink, loading: loadLink }] = useLazyQuery(GET_ALL_LINKS_FILES,
    {
      variables: { fileName: FileNameLink.state, idComp: company.idLasComp },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first' // Used for subsequent executions
    })
  const [deleteOneTagLineItem] = useMutation(DELETE_ONE_TAG)
  const { data: dataBill } = useQuery(GET_ALL_BILL, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: navigator.onLine ? 'network-only' : 'cache-only' })
  // console.log(dataBill)
  // const [dataBills, setData] = useState([])
  //
  // EFFECTS
  //   useEffect(() => {
  //     // dataProduct?.productsLogis && setData([...dataProduct?.productsLogis])
  //   }
  // , [dataProduct])
  // useEffect(() => {
  //   getAllBill()
  //   // dataBill({ variables: { max: 12 } })
  // }, [])
  const { data: dataFiles } = useQuery(GET_ALL_FILE_MINIO, {
    variables: { IdBills: dataBill ? dataForm.idBill : null },
    update (cache) {
      cache.modify({
        fields: {
          getAllBill (dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_BILL, data: dataOld })
          }
        }
      })
      cache.modify({
        fields: {
          getAllFilesToBills (dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_FILE_MINIO, data: dataOld })
          }
        }
      })
    }
  })

  // getOne Bills
  const getDataOneBill = dataOneBill?.getOneBillById
  useEffect(() => {
    if (getDataOneBill) {
      setDataValue({
        _id: getDataOneBill?.idSupplier?._id,
        idBill: getDataOneBill?._id,
        bDescription: getDataOneBill?.bDescription,
        billNo: getDataOneBill?.billNo,
        refCode: getDataOneBill?.bInvoiceRef,
        bDueDate: getDataOneBill?.bDueDate,
        items: getDataOneBill?.lineItems?.map(x => { return { id: x._id, bDescription: x.description, quantity: parseInt(x.quantity), idAccount: x.idAccount, idRef: x.idPro, rate: parseInt(x.rate), iPercentage: x.iva[0].iPercentage } })
      })
    }
  }, [router.query.id, getDataOneBill])

  useEffect(() => {
    refs.current = refs.current.splice(0, dataForm?.items?.length)
    for (let i = 0; i < dataForm?.items?.length; i++) {
      refs.current[i] = refs.current[i] || React.createRef()
    }
    refs.current = refs.current.map((item) => item || React.createRef())
  }, [dataForm])

  const selectedTags = (tags) => {
    setTags(tags)
  }
  // Change Files
  const handleFileChange = async (paramFiles) => {
    const files = paramFiles
    setFileBill(files)
    setFiles(paramFiles)
  }
  // HandleUpload
  const upload = () => {
    const files = fileBill
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setFileBill(file)
      // Retrieve a URL from our server.
      retrieveNewURL(file, (file, url) => {
        // Upload the file to the server.
        uploadFile(file, url)
      })
    }
  }
  function retrieveNewURL (file, cb) {
    fetch(`/api/presignedUrl?name=${file.name + dataForm?.refCode}&idPro=${company.idLasComp}`).then((response) => {
      response.text().then((url) => {
        cb(file, url)
      })
    }).catch((e) => {
      console.error(e)
    })
  }
  function uploadFile (file, url) {
    fetch(url, {
      method: 'PUT',
      body: file
    }).then((res) => {
      countProgress.setState(res)
      setUpload(true)
    }).catch((e) => {
      console.error(e)
    })
  }

  const newFiles = Array.from(fileBill).map(x => ({ filename: x.name, aSize: x.size, mimetype: x.type }))
  // const arrayData = newFiles.concat([1, 2, 3, 4, 5])
  const newTags = dataForm?.tags?.map(x => ({ _id: x.id, TName: x.tName }))
  // CALCULATE_VAT
  const calculateIva = useCallback((quantity, rate, iPercentage) => {
    if (iPercentage) {
      const PercentageNumber = parseInt(iPercentage)
      const quantityNumber = parseFloat(quantity)
      const rateNumber = parseFloat(rate)
      const dataIvaCalculator = CalculateIva(quantityNumber, rateNumber, PercentageNumber, dataForm.tax).toFixed(2)
      return dataIvaCalculator
    }
  }, [dataForm])
  const newData = dataForm?.items?.map(x => ({ _id: x.id, lineItemsDescription: x.bDescription, lineItemsQuantity: x.quantity ? parseFloat(x.quantity) : 0, lineItemsIdPro: x.idRef, lineItemsIdAccount: x.idAccount, lineItemsRate: x.rate ? parseFloat(x.rate) : 0, lineItemsIdClass: x.idClass, lineItemsIdVAT: x.idClass, lineItemsTotalVAT: dataForm.tax === 'NO_TAX' ? 0 : dataForm.tax === 'INCLUSIVE' ? (parseFloat(x.rate) * parseFloat(x.quantity)) / (100 + parseFloat(x.iPercentage && x.iPercentage)) * parseFloat(x.iPercentage) : dataForm.tax === 'EXCLUSIVE' ? ((parseFloat(x.rate) * parseFloat(x.quantity)) * parseFloat(x.iPercentage)) / 100 : 0, lineItemsSubTotal: (parseFloat(x.rate) * parseFloat(x.quantity)) ? (parseFloat(x.rate) * parseFloat(x.quantity)) : 0, setDataIva: [{ iPercentage: x.iPercentage }] }))
  const sumTotalVat = arr => arr && arr?.reduce((sum, { lineItemsTotalVAT }) => sum + lineItemsTotalVAT, 0)
  const sumSubTotal = arr => arr && arr?.reduce((sum, { lineItemsRate, lineItemsQuantity }) => sum + parseFloat(lineItemsRate) * parseFloat(lineItemsQuantity), 0)
  const newTotalVat = sumTotalVat(newData)
  useEffect(() => {
    let totalFinal = 0
    const newSubTotal = sumSubTotal(newData)
    setSubTotal(newSubTotal)
    if (dataForm.tax === 'NO_VAT') {
      setSubTotal(newSubTotal)
      setCalTotalIva(0)
      setTotal(newSubTotal)
    } else if (dataForm.tax === 'INCLUSIVE') {
      totalFinal = newSubTotal - newTotalVat
      setTotal(totalFinal)
      setCalTotalIva(newTotalVat)
    } else {
      // EXCLUSIVE
      totalFinal = newSubTotal + newTotalVat
      setTotal(totalFinal)
      setCalTotalIva(newTotalVat ? newTotalVat.toFixed(2) : 0)
    }
  }, [dataForm])
  // addMore LineItems
  const addMore = (type, key) => {
    setDataValue({
      ...dataForm,
      [type]: [...dataForm?.[type], { [key]: dataForm?.[type]?.length }]
    })
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
  const [tagValue, setTagValue] = useState({ tName: '' })
  const addTag = (type, key, event) => {
    const { name } = event.target
    if (event.which === 13) {
      tagValue[name] !== '' && setDataValue({
        ...dataForm,
        [type]: [...dataForm?.[type], { [key]: dataForm?.[type]?.length, [name]: tagValue[name] }]
      })
      setTagValue({ tName: '' })
      event.preventDefault()
    }
  }

  // Delete lineItems
  const DeleteAll = () => {
    setDataValue({
      items: [{
        id: 0,
        select: false,
        bDescription: '',
        idAccount: '',
        idClass: '',
        idRef: '',
        iPercentage: 0,
        quantity: '',
        rate: ''
      }],
      tax: 'INCLUSIVE',
      billNo: Math.round(Math.random() * (99999 - 10000) + 10000),
      refCode: `${nanoid()}`,
      dateNow: `${dateNow}`,
      tags: []

    })
  }
  const handleDelete = async ({ _id }) => {
    const results = await DeleteOneBill({
      variables: { id: _id },
      update (cache) {
        cache.modify({
          fields: {
            getAllBill (dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_BILL, data: dataOld })
            }
          }
        })
      }
    }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
  }
  const HandleClickEdit = (item) => {
    // create func
    setTotal(item.billTotal)
    if (item.view === 1) {
      setModal(true)
      setDisable(true)
      // edit func
    } else if (item.view === 2) {
      setModal(true)
      isEdit.setState(true)
      setDisable(false)
      // id = item._id
      // View func
    } else if (item.view === 3) {
      isEdit.setState(true)
      setShowLateral(true)
    }
    // const Tags = item?.tags?.map(x => x)
    // setTags([Tags.TName])
    setDataValue({
      idBill: item._id,
      dateNow: `${dateNow}`,
      // tags: item?.tags?.map(x => ({ TName: x.TName[] })),
      bDescription: item.bDescription,
      billNo: item.billNo,
      refCode: item.bInvoiceRef,
      tax: item.VatType,
      bDueDate: item.bDueDate,
      bInvoiceDate: item.bInvoiceDate,
      _id: item?.idSupplier?._id,
      items: item?.lineItems?.map(x => { return { id: x._id, bDescription: x.lineItemsDescription, quantity: parseInt(x.lineItemsQuantity), idAccount: x.lineItemsIdAccount, idClass: x.lineItemsIdClass, idRef: x.lineItemsIdPro, rate: parseInt(x.lineItemsRate), iPercentage: x.iva[0].iPercentage } }),
      tags: item?.tags?.map(x => { return { id: x._id, tName: x.TName } })
    })
  }
  // Calculate Total
  const calculateAmount = (quantity, rate) => {
    const data = CalculateAmount(quantity, rate)
    return data
  }
  function openLink (link) {
    setWidth(!width)
    if (typeof link !== 'undefined') {
      setWidth(!width)
      // openLink(link)
      const w = window.open('', '_blank')
      w.document.write('<html><head></head><body>Please wait while we redirect you</body></html>')
      w.document.close()
      const url = dataLink?.getAllFilesLinkToBills?.message
      w.location = url
    }
  }
  const getFileUrl = async (fileName) => {
    const { BillLink, Delete, idFile } = fileName
    FileNameLink.setState(BillLink)
    LinkMinio.setState(BillLink)
    getAllFilesLinkToBills()
    if (!Delete || !!loadLink || !!dataLink) {
      FileNameLink.setState(BillLink)
      const link = !loadLink && dataLink?.getAllFilesLinkToBills?.message
      openLink(link)
    } else {
      await deleteOneFileMinio({
        variables: { fileName: BillLink },
        update (cache) {
          cache.modify({
            fields: {
              getAllFilesToBills (dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_FILE_MINIO, data: dataOld })
              }
            }
          })
        }
      })
      await DeleteOneFile({
        variables: { id: idFile },
        update (cache) {
          cache.modify({
            fields: {
              getAllFilesToBills (dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_FILE_MINIO, data: dataOld })
              }
            }
          })
        }
      })
    }
  }
  // SUBMIT FUNC
  const handleForm = (e, show) => handleSubmit({
    event: e,
    action: () => {
      if (show === 1) {
        upload()
        location.replace(location.pathname)
        setReset(true)
        return createBillMutation({
          variables: {
            input: {
              bInvoiceRef: dataForm?.refCode,
              bDescription: dataForm.bDescription,
              idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany,
              bInvoiceDate: dateNow,
              idSupplier: dataForm._id,
              billNo: parseInt(dataForm.billNo),
              bDueDate: dataForm.bDueDate,
              billSubTotal: parseFloat(billSubTotal),
              billTotal: total,
              idFiles: IdMongo.state,
              VatType: dataForm.tax,
              currencyBill: dataOneSupplier.getOneSuppliers.sCurrency?.cName
            },
            //  Array
            inputLineItems: {
              setData: newData
            },
            //  Array Tags
            setTagsInput: {
              setTags: newTags
            },
            setFilesInput: {
              idFiles: IdMongo.state,
              filesData: newFiles
            }
          },
          update: (cache, { data: { getDataAllById } }) => updateCacheMod({
            cache,
            query: GET_ALL_BILL,
            nameFun: 'getAllBill',
            dataNew: getDataAllById,
            type: 2

          })
        })
      } else if (show === 2) {
        location.replace(location.pathname)
        setReset(true)
        upload()
        return updateBill({
          variables: {
            input: {
              _id: dataForm.idBill,
              bInvoiceRef: dataForm?.refCode,
              bDescription: dataForm.bDescription,
              idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany,
              bInvoiceDate: dataForm?.bInvoiceDate,
              idSupplier: dataForm._id,
              billNo: parseInt(dataForm.billNo),
              bDueDate: dataForm.bDueDate,
              billSubTotal: parseInt(billSubTotal),
              billTotal: total,
              idFiles: IdMongo.state,
              VatType: dataForm.tax,
              currencyBill: dataOneSupplier.getOneSuppliers.sCurrency?.cName
            },
            // Array
            inputLineItems: {
              setData: newData
            },
            //  Array Tags
            setTagsInput: {
              setTags: newTags
            },
            setFilesInput: {
              idFiles: IdMongo.state,
              filesData: newFiles
            }
          },
          update: (cache, { data: { getDataAllById } }) => updateCacheMod({
            cache,
            query: GET_ALL_BILL,
            nameFun: 'getAllBill',
            dataNew: getDataAllById,
            type: 2
          },
          cache.modify({
            fields: {
              getAllFilesToBills (dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_FILE_MINIO, data: dataOld })
              }
            }
          },
          cache.modify({
            fields: {
              getAllFilesToBills (dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_FILE_MINIO, data: dataOld })
              }
            }
          }))
          )
        })
      } else if (show === 3) {
        return null
      }
    },
    actionAfterSuccess: () => {
      setModal(!modal)
      setReset(true)
      DeleteAll()
      setDataValue({
        items: [{
          id: 0,
          select: false,
          bDescription: '',
          idAccount: '',
          idClass: '',
          idRef: '',
          iPercentage: 0,
          quantity: '',
          rate: ''
        }],
        tax: 'INCLUSIVE',
        billNo: Math.round(Math.random() * (99999 - 10000) + 10000),
        refCode: `${nanoid()}`,
        dateNow: `${dateNow}`
      })
    }
  })
  // set LineItems
  useEffect(() => {
    setDataValue({
      items: [{
        id: 0,
        select: false,
        bDescription: '',
        idAccount: '',
        idClass: '',
        idRef: '',
        iPercentage: 0,
        quantity: '',
        rate: ''
      }],
      tax: 'INCLUSIVE',
      billNo: Math.round(Math.random() * (99999 - 10000) + 10000),
      refCode: `${nanoid()}`,
      dateNow: `${dateNow}`,
      tags: []
    })
    const mongoId = mongoObjectId()
    IdMongo.setState(mongoId)
  }, [])
  const handleTag = e => {
    setTagValue({ ...tagValue, [e.target.name]: e.target.value })
  }
  // Delete One lineItems
  // CALCULATE_VAT
  const deleteSlot = useCallback(async (slot) => {
    const { id, key, type, Delete, DeleteItem } = slot || {}
    setDataValue({
      ...dataForm,
      [type]: dataForm[type].filter(e => e.id !== id && e).map(x => (x[key[0]] === id ? { ...x, [key[1]]: 0 } : x))
    })
    if (DeleteItem) {
      deleteOneLineItem({
        variables: { idLine: id, id: dataForm.idBill }
      }).catch((err) => console.log(err))
      updateBill({
        variables: {
          input: {
            _id: dataForm.idBill,
            bInvoiceRef: dataForm?.refCode,
            bDescription: dataForm.bDescription,
            idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany,
            bInvoiceDate: dataForm?.bInvoiceDate,
            idSupplier: dataForm._id,
            billNo: parseInt(dataForm.billNo),
            bDueDate: dataForm.bDueDate,
            billSubTotal: parseInt(billSubTotal),
            billTotal: total,
            idFiles: IdMongo.state,
            VatType: dataForm.tax,
            currencyBill: dataOneSupplier?.getOneSuppliers?.sCurrency?.cName
          },
          // Array
          inputLineItems: {
            setData: newData
          },
          //  Array Tags
          setTagsInput: {
            setTags: newTags
          },
          setFilesInput: {
            idFiles: IdMongo.state,
            filesData: newFiles
          }
        },
        update: (cache, { data: { getDataAllById } }) => updateCacheMod({
          cache,
          query: GET_ALL_BILL,
          nameFun: 'getAllBill',
          dataNew: getDataAllById,
          type: 2
        },
        cache.modify({
          fields: {
            getAllFilesToBills (dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_FILE_MINIO, data: dataOld })
            }
          }
        },
        cache.modify({
          fields: {
            getAllFilesToBills (dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_FILE_MINIO, data: dataOld })
            }
          }
        }))
        )
      })
    } else if (Delete) {
      await deleteOneTagLineItem({
        variables: { idLine: id, id: dataForm.idBill },
        update (cache) {
          cache.modify({
            fields: {
              getAllBill (dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_BILL, data: dataOld })
              }
            }
          })
        }
      }).catch((err) => console.log(err))
    }
  }, [dataForm])
  return (
    <>
      <Bills
        addTag={addTag}
        handleTag={handleTag}
        tagValue={tagValue}
        errorUpdate={errorUpdate}
        handleChangeStatics={handleChangeStatics}
        handleSubmit={handleForm}
        setAlertBox={setAlertBox}
        dataForm={dataForm}
        LinkMinio={dataLink?.getAllFilesLinkToBills?.message || ''}
        ProgressUpload={ProgressUpload}
        loading={loading || loadingUpdate || loadingDeleteBill}
        error={error}
        handleDelete={handleDelete}
        setsize={setsize}
        Disable={Disable}
        countProgress={countProgress}
        modal={modal}
        dateNow={dateNow}
        isUpload={isUpload}
        dataOneSupplier={dataOneSupplier?.getOneSuppliers || []}
        dataFiles={dataFiles?.getAllFilesToBills || []}
        HandleClickEdit={HandleClickEdit}
        size={size}
        dataClass={dataClass || []}
        setModal={setModal}
        isEdit={isEdit}
        setShowLateral={setShowLateral}
        width={width}
        setWidth={setWidth}
        data={dataBill?.getAllBill || []}
        dataProducts={dataProducts?.getProductsForCompany || []}
        dataIva={dataIva?.getAllIva || []}
        handleFileChange={handleFileChange}
        files={files}
        upload={upload}
        calculateAmount={calculateAmount}
        calculateIva={calculateIva}
        dataAccount={dataAccount?.getAllAccount || []}
        billSubTotal={billSubTotal}
        setDataValue={setDataValue}
        total={total}
        handleMenu={handleMenu}
        reset={reset}
        getFileUrl={getFileUrl}
        setTotalIva={setTotalIva}
        menu={menu}
        selectedTags={selectedTags}
        dataSupplier={dataSupplier?.getSuppliersForCompany || []}
        // Add array
        onChange={handleChange}
        showLateral={showLateral}
        errorForm={errorForm}
        DeleteAll={DeleteAll}
        deleteSlot={deleteSlot}
        addMore={addMore}
        setReset={setReset}
        setTags={setTags}
        tags={tags}
        refs={refs}
      />
    </>
  )
}
