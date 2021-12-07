/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
import React from 'react'
import styles from './styles'
import { Text } from '@react-pdf/renderer'
import styled from 'styled-components'
export const EditableInput = ({ className, placeholder, value, onChange, pdfMode }) => {
  return (
    <>
      {pdfMode
        ? (
          <Text style={compose('span ' + (className || ''))}>{value || '...'}</Text>
          )
        : (
          <InputCustom
            type="text"
            className={'input ' + (className || '')}
            placeholder={placeholder || ''}
            value={value || ''}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          />
          )}
    </>
  )
}
export const compose = (classes) => {
  const css = {}
  const classesArray = classes.replace(/\s+/g, ' ').split(' ')
  classesArray.forEach((className) => {
    if (typeof styles[className] !== 'undefined') {
      Object.assign(css, styles[className])
    }
  })
  return css
}
const InputCustom = styled.input`
  padding: 10px;
  outline: 0;
  border: 1px solid;
  font-size: 14px;
  width: ${({ width }) => width || '100%'};
`
