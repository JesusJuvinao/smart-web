import React from 'react'
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input
} from '@chakra-ui/react'
import { useField } from 'react-recoil-form'
// import { IAncestorInput } from 'react-recoil-form/dist/types'
// import { isValidEmail, isValidPhone } from '../utils'

export default function InputField (props) {
    // eslint-disable-next-line react/prop-types
    const { name, type, label, ancestors } = props
    const { fieldValue, setFieldValue, error } = useField({
        ancestors,
        name
    })

    return (
        <FormControl isInvalid={!!error} id={name}>
            <FormLabel>{label}</FormLabel>
            <Input
                type={type}
                value={fieldValue || ''}
                onChange={e => setFieldValue(e.target.value)}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}
