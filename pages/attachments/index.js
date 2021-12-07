import React from 'react'
import { AttachmentsC } from '../../container/Attachments'

export default function Attachments () { return <AttachmentsC /> }
export async function getServerSideProps ({ req }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login' } }
    return {
        props: { }
    }
}
