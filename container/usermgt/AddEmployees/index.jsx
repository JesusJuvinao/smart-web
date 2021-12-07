import PropTypes from 'prop-types'
import { useFormTools } from "@/components/hooks/useForm"
import { Context } from "context"
import { updateCache } from "@/utils/index"
import { useCompanyHook } from "container/dashboard"
import { CREATE_ONE_TEAM } from "container/ListCompany/queries"
import { useUser } from "container/Profile"
import { useContext, useEffect, useState } from "react"
import { useMutation } from '@apollo/client'
import { AwesomeModal } from '@/components/AwesomeModal'
import InputHooks from '@/components/InputHooks/InputHooks'
import { IconArrowBottom } from '@/public/icons'
import { Container, Footer, Text, Card, Button, FeatureItem, BtnItem } from '../styled'

export const AddEmployee = ({ modal, setModal }) => {
    const [dataUser] = useUser()
    const { company, setAlertBox } = useContext(Context)
    const [dataCompany] = useCompanyHook()
    const [step, setStep] = useState(10)
    // const increase = () => setStep(step + 1)
    // const decrease = () => setStep(step - 1)
    // QUERIES
    const [RegisterOneTeam] = useMutation(CREATE_ONE_TEAM, {
      onCompleted: (data) => setAlertBox({ message: `${data?.RegisterOneTeam?.message}` })
    })
    const [_, validationSubmit, setDataValue, { dataForm, errorForm, errorSubmit, calledSubmit, setForcedError }] = useFormTools()
    // SUBMIT FUNC
    const arrayEmployee = dataForm && dataForm?.items?.map(x => ({ description: x.description, uEmail: x.uEmail, Username: x.Username }))
    const handleForm = (e, show) => validationSubmit({
      event: e,
      action: () => RegisterOneTeam({
        variables: {
          idC: company.idLasComp && company.idLasComp,
          uEmailMaster: dataUser && dataUser.uEmail,
          uEmail: arrayEmployee[0]?.uEmail,
          companyName: dataCompany?.companyName || '',
          lineItemTeamComp: {
            setDataTeam: arrayEmployee || []
          }
        },
        update: (cache, { data: { getAllCompanyById } }) => updateCache({
          cache,
          query: ALL_COMPANIES_BY_USER,
          nameFun: 'getAllCompanyById',
          dataNew: getAllCompanyById,
          type: 2
  
        })
      }),
      actionAfterSuccess: () => {
        setDataValue({
          items: [{
            id: 0,
            description: '',
            Username: '',
            uEmail: ''
          }]
        })
      }
    })
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
    // set LineItems
    useEffect(() => {
      setDataValue({
        items: [{
          id: 0,
          description: '',
          Username: '',
          uEmail: ''
        }]
      })
    }, [])
    return (
      <>
        <AwesomeModal padding='20px' height='100vh' show={modal} title='Add a new user' onHide={() => setModal(!modal)} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
          {<form onSubmit={handleForm}>
            {step === 0
              ? <Card direction="column">
                <Text>Select user type</Text>
                <FeatureItem>
                  <BtnItem>Standard user</BtnItem>
                  <input type="radio" />
                </FeatureItem>
                <FeatureItem>
                  <BtnItem>Company admin</BtnItem>
                  <input type="radio" />
                </FeatureItem>
                <FeatureItem>
                  <IconArrowBottom color={BColor} size='17px' />&nbsp;
                  <BtnItem onClick={() => console.log(1)}>Track income & expenses</BtnItem>
                </FeatureItem>
                <FeatureItem>
                  <IconArrowBottom color={BColor} size='17px' />&nbsp;
                  <BtnItem onClick={() => console.log(1)}>They can see and do everything. This includes sending money, changing passwords, and adding users. Not everyone should be an admin.</BtnItem>
                </FeatureItem>
                <FeatureItem>
                  <IconArrowBottom color={BColor} size='17px' />&nbsp;
                  <BtnItem onClick={() => console.log(1)}>They can see and do everything. This includes sending money, changing passwords, and adding users. Not everyone should be an admin.</BtnItem>
                </FeatureItem>
              </Card>
              : step === 1
                ? <Card>
                  <Text>Select access rights</Text>
                  <FeatureItem>
                    <IconArrowBottom color={BColor} size='17px' />&nbsp;
                    <BtnItem onClick={() => console.log(1)}>Track income & expenses</BtnItem>
                  </FeatureItem>
                </Card>
                : step === 2
                  ? <Card>
                    <Text>Select user settings</Text>
                    <FeatureItem>
                      <IconArrowBottom color={BColor} size='17px' />&nbsp;
                      <BtnItem onClick={() => console.log(1)}>Track income & expenses</BtnItem>
                    </FeatureItem>
                  </Card>
                  : <Card display='block' >
                    <Text size='20px'>What’s their contact info?</Text>
                  </Card>}
            {dataForm && dataForm?.items?.map((x, i) => {
              return (
                <div key={x.id}>
                  <div><InputHooks range={{ min: 3, max: 300 }} required error={x.errorForm?.description} width='50%' title='description' name='description' disabled={false} value={x?.description} onChange={(e, error) => handleChange(e, error, { type: 'items', id: x.id })} /> </div>
                  <div><InputHooks range={{ min: 3, max: 100 }} letters required error={x.errorForm?.Username} width='50%' title='Username' name='Username' disabled={false} value={x?.Username} onChange={(e, error) => handleChange(e, error, { type: 'items', id: x.id })} /> </div>
                  <div><InputHooks range={{ min: 3, max: 100 }} required error={x.errorForm?.uEmail} width='50%' title='uEmail' email name='uEmail' disabled={false} value={x?.uEmail} onChange={(e, error) => handleChange(e, error, { type: 'items', id: x.id })} /> </div>
                </div>
              )
            })}
            <Footer>
              <button type='button' onClick={() => setModal(!modal)}>Cancel</button>
              <button type={'submit'}>Save</button>
            </Footer>
          </form>}
        </AwesomeModal>
  
      </>)
  }
  
  
  AddEmployee.propTypes = {
    setModal: PropTypes.func,
    modal: PropTypes.bool
  }