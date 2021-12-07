import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ListCompanyC } from '../../container/ListCompany'
import { Context } from '../../context'
import withSession from '../../apollo/session'
export default function ListCompany (token, props) {
  const { setCompanyLink, isCompany, useCompany } = useContext(Context)
  return <><ListCompanyC setCompanyLink={setCompanyLink} isCompany={isCompany} useCompany={useCompany} /></>
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
  return {
    props: { }
  }
})

ListCompany.propTypes = {
  setCompanyLink: PropTypes.func,
  isCompany: PropTypes.string
}
