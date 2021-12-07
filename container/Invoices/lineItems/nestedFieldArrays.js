import { Box, Button, Grid, Heading, Stack } from '@chakra-ui/react'
import { withFormProvider, useForm, useFieldArray } from 'react-recoil-form'
import InputField from './InputField'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { salesInvoiceInfoState } from '../store'

function SalesInvoiceLineItems () {
    useRecoilValue(salesInvoiceInfoState)

    const [formData, setFormData] = useState({})

    const onSubmit = values => {
        setFormData(values)
    }

    const { handleSubmit } = useForm({
        onSubmit,
        initialValues: {
            persons: [
                {
                    fname: '',
                    lname: '',
                    email: '',
                    phone: ''
                }
            ]
        }
    })

    const { fieldArrayProps, append, remove } = useFieldArray({
        name: 'persons',
        fieldNames: ['fname', 'lname', 'email', 'phone']
    })

    return (
        <Box>
            <Heading align="center" my={4}>
        Field Array Form
            </Heading>
            <Grid templateColumns="2fr 1fr" gap={4} p={4}>
                <form onSubmit={handleSubmit}>
                    {fieldArrayProps.rowIds.map((rowId, rowIndex) => {
                        return (
                            <section key={rowId}>
                                <Heading size="lg" mb={2}>
                  Person {rowIndex + 1}
                                </Heading>
                                <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={2}>
                                    <InputField
                                        ancestors={[{ name: 'persons', rowId }]}
                                        required
                                        name="fname"
                                        label="First Name"
                                        type="text"
                                    />
                                    <InputField
                                        name="lname"
                                        ancestors={[{ name: 'persons', rowId }]}
                                        label="Last Name"
                                        type="text"
                                    />
                                </Grid>

                                <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                                    <InputField
                                        ancestors={[{ name: 'persons', rowId }]}
                                        isEmail
                                        name="email"
                                        label="Email Id"
                                        type="text"
                                    />
                                    <InputField
                                        ancestors={[{ name: 'persons', rowId }]}
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
              Add Person
                        </Button>

                        {/* submit from outside the form */}
                        <Button
                            // onClick={() => handleSubmit()}
                            type="submit"
                        >
              Submit
                        </Button>
                    </Stack>
                </form>

                <pre>{JSON.stringify(formData, null, 2)}</pre>
            </Grid>
        </Box>
    )
}

export default withFormProvider(SalesInvoiceLineItems)
