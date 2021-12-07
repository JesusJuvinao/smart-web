import React from 'react'
import withSession from 'apollo/session'
import { ManaGeTeams } from 'container/teams/manage'
import { useRouter } from 'next/router'

export default function Manage () {
  const router = useRouter()
  const id = router.query.id
  return (
      <ManaGeTeams id={id} />
  )
}
export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req?.session?.get('user')
  if (!user) {
    // res.next()
    return { props: {} }
  }
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login' } }

  return {
    props: {}
  }
}
)
