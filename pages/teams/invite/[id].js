import { useRouter } from 'next/router'
import React from 'react'
import withSession from '../../../apollo/session'
import { decodeToken, getTokenState } from '../../../utils'
import { AcceptInvitation } from 'container/teams/invite'

export default function teamsInvite() {
    // STATES
    const router = useRouter()
    const code = router.query.id
    const data = decodeToken(code)
    const tokenState = getTokenState(code)
    if (tokenState?.needRefresh === true) {
        return <span>The link has expired</span>
    } else if (!tokenState?.valid) {
        return <span>The link is not valid</span>
    } else if (!tokenState) {
        return router.push('/')
    } else return <AcceptInvitation data={data} />
}
// Queries
export const getServerSideProps = withSession(async function () {
    return {
        props: {}
    }
}
)
