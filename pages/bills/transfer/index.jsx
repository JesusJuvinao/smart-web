import withSession from 'apollo/session'
import { InviteEmployeeC } from 'container/Bills/Invite'
import PropTypes from 'prop-types'

const InviteEmployee = () => {
    return ( <InviteEmployeeC /> )
}

InviteEmployee.propTypes = {

}

export default InviteEmployee

export const getServerSideProps = withSession(async function ({ req, res }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
    return {
      props: { }
    }
  })
  