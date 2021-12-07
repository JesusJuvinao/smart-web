import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { salesInvoice, salesInvoiceRef, salesInvoiceDate, salesInvoiceDueDate, salesInvoiceNo, contactInfoState } from '../store'
import { Button, Grid, Heading, Stack } from '@chakra-ui/react'
import { useFieldArray } from 'react-recoil-form'
import InputField from '../lineItems/InputField'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

export function Example () {
    const { salesRef, invoiceDate, invoiceDateDue, invoiceNo } = useRecoilValue(contactInfoState)
    const setSalesInvoiceRef = useSetRecoilState(salesInvoiceRef)
    const setSalesInvoiceDate = useSetRecoilState(salesInvoiceDate)
    const setSalesInvoiceDueDate = useSetRecoilState(salesInvoiceDueDate)
    const setSalesInvoiceNo = useSetRecoilState(salesInvoiceNo)

    // --------------------------- DisplayState --------------

    const setSalesInvoices = useSetRecoilState(salesInvoice)
    const salesRefRes = useRecoilValue(salesInvoiceRef)
    const invoiceDateRes = useRecoilValue(salesInvoiceDate)
    const invoiceDueDateRes = useRecoilValue(salesInvoiceDueDate)
    const invoiceNoRes = useRecoilValue(salesInvoiceNo)

    // -------------------- lineItems --------------------

    // const [formData, setFormData] = useState({})

    // const onSubmit = (values) => {
    //   setFormData(values)
    // }

    // const { handleSubmit } = useForm({
    //   onSubmit,
    //   initialValues: {
    //     lineItems: [
    //       {
    //         fname: '',
    //         lname: '',
    //         email: '',
    //         phone: ''
    //       }
    //     ]
    //   }
    // })

    const { fieldArrayProps, append, remove } = useFieldArray({
        name: 'lineItems',
        fieldNames: ['fname', 'lname', 'email', 'phone']
    })

    const addProduct = e => {
        e.preventDefault()
        setSalesInvoices(oldList => [
            ...oldList,
            {
                salesRef: salesRefRes,
                invoiceDate: invoiceDateRes,
                invoiceDueDate: invoiceDueDateRes,
                invoiceNo: invoiceNoRes,
                lineItems: [
                    {
                        fname: '',
                        lname: '',
                        email: '',
                        phone: ''
                    }
                ]
            }
        ])
    }

    return (
        <form>
            <input
                type="text"
                value={salesRef}
                onChange={ev => setSalesInvoiceRef(ev.target.value)}
                placeholder="Sales Invoice Ref"
            />
            <input
                type="date"
                value={invoiceDate}
                onChange={ev => setSalesInvoiceDate(ev.target.value)}
                placeholder="Sales Invoice Date"
            />
            <input
                type="date"
                value={invoiceDateDue}
                onChange={ev => setSalesInvoiceDueDate(ev.target.value)}
                placeholder="Sales Invoice Due date "
            />
            <input
                type="text"
                value={invoiceNo}
                onChange={ev => setSalesInvoiceNo(ev.target.value)}
                placeholder="Sales Invoice No"
            />
            {/* LineItems */}
            {fieldArrayProps.rowIds.map((rowId, rowIndex) => {
                return (
                    <section key={rowId}>
                        <Heading size="lg" mb={2}>
                  Person {rowIndex + 1}
                        </Heading>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={2}>
                            <InputField
                                ancestors={[{ name: 'lineItems', rowId }]}
                                required
                                name="fname"
                                label="First Name"
                                type="text"
                            />
                            <InputField
                                name="lname"
                                ancestors={[{ name: 'lineItems', rowId }]}
                                label="Last Name"
                                type="text"
                            />
                        </Grid>

                        <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                            <InputField
                                ancestors={[{ name: 'lineItems', rowId }]}
                                isEmail
                                name="email"
                                label="Email Id"
                                type="text"
                            />
                            <InputField
                                ancestors={[{ name: 'lineItems', rowId }]}
                                isPhone
                                name="phone"
                                label="Phone No"
                                type="phone"
                            />
                        </Grid>

                        <Button
                            leftIcon={<DeleteIcon />}
                            variant="outline"
                            colorScheme="red"
                            size="sm"
                            onClick={() => remove(rowIndex)}
                        >
                  Remove
                        </Button>
                    </section>
                )
            })}

            <Stack direction="row" spacing="20px">
                <Button
                    leftIcon={<AddIcon />}
                    variant="outline"
                    onClick={() => append()}
                >
              Add Items
                </Button>
                {/* submit from outside the form */}
                <Button type="submit" onClick={addProduct}>Enviar</Button>
            </Stack>
        </form>
    )
}
