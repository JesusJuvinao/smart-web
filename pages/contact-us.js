import React, { useContext, useEffect } from 'react'
import { ContactUsC } from '../container/contact-us'
import { Context } from '../context'

export default function ContactUs () {
    const { setAlertBox } = useContext(Context)
    useEffect(() => {
        setAlertBox({ message: '', duration: 8000 })
    }, [])
    return (
        <>
            <ContactUsC setAlertBox={setAlertBox} />
        </>
    )
}
