/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
// import { Container } from './styled'
import { ContainerText, ContainerToast, ContentToast } from './styled'

export const AlertBox = ({ err }) => {
    const [closed, setClosed] = useState(false)

    useEffect(() => {
        if (err) {
            const timeOut = setTimeout(() => setClosed(true), (err.duration || 7000) / 2)
            return () => {
                clearTimeout(timeOut)
                setClosed(false)
            }
        }
    }, [err])
    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setClosed(true))
        return () => body.removeEventListener('keyup', () => setClosed)
    }, [closed])

    return (
        <React.Fragment>
            <ContainerToast onClick={setClosed} color={err?.color} closed={closed} error={!!err?.message}>
                {/* <IconEdit size='40px' /> */}
                <ContentToast>
                    <ContainerText >{(err?.message || '')}</ContainerText>
                    <div></div>
                </ContentToast>
            </ContainerToast>
        </React.Fragment>
    )
}
