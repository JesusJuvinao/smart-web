import React from 'react'
import { AwesomeModal } from '../AwesomeModal'
import InputHooks from '../InputHooks/InputHooks'
import { LoadEllipsis } from '../Loading'
import NewSelect from '../NewSelectHooks'
import { RippleButton } from '../Ripple'
import PropTypes from 'prop-types'
import { Title, Form, Container } from './styled'

export default function FormSupplier ({ dataForm, datCurrency, onChange, handleSubmit, loading, setModal, modal, getSuppliersForCompany }) {
  return (
      <Container>
        <AwesomeModal
            show={modal}
            backdrop
            onHide={() => setModal(false)}
            onCancel={() => false}
            btnCancel={false}
            btnConfirm={false}
            header={true}
            size="medium"
            footer={false}
        >
            <Title >Add Supplier</Title>
            <Form onSubmit={e => (handleSubmit(e))}>
              <InputHooks
                title='Supplier Name'
                required
                errors={dataForm?.sName}
                value={dataForm?.sName}
                onChange={onChange}
                name='sName'
              />
              <NewSelect
                disabled={!datCurrency}
                // eslint-disable-next-line no-self-compare
                options={datCurrency || []}
                id='_id'
                search
                name='_id'
                secOptionName='cDescription'
                errors={dataForm?._id}
                value={dataForm?._id || ''}
                optionName='cName'
                title='Select One Currency'
                onChange={onChange}
              />
              <RippleButton padding='10px' width={'100%'} onClick={() => getSuppliersForCompany()} type='submit' >{loading ? <LoadEllipsis /> : 'Save'}</RippleButton>
            </Form>
          </AwesomeModal>
          </Container>
  )
}

FormSupplier.propTypes = {
  onChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
  dataRes: PropTypes.array,
  getSuppliersForCompany: PropTypes.func,
  datCurrency: PropTypes.array,
  values: PropTypes.array,
  setModal: PropTypes.bool,
  dataForm: PropTypes.string,
  modal: PropTypes.bool
}
