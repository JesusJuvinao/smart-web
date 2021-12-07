import React from 'react'
import '../public/styles/App.css'
import PropTypes from 'prop-types'
import useApollo from '../apollo/apolloClient'
import { LayoutC as Layout } from '../container/Layout'
import { Maintenance } from '../components/Maintenance'
import AuthProvider from '../context'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import withSession from '../apollo/session'
import { RecoilRoot } from 'recoil'

// eslint-disable-next-line
console.log('%c WARNING :', 'color:red;font-size:28px;');
// eslint-disable-next-line
console.log('%c CONSOLE ONLY FOR WEB DEVELOPERS', 'color:red;font-size:12px;');
const production = true

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <GlobalStyle />
            <RecoilRoot>
                <Layout>
                    {production ? <Component {...pageProps} /> : <Maintenance />}
                </Layout>
            </RecoilRoot>
        </AuthProvider>
    )
}

export const getServerSideProps = withSession(async function ({ req }) {
    const user = req.session.get('user')
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: { user }
    }
})

export default useApollo(MyApp)

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object
}
