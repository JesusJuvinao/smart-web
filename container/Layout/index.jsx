/* eslint-disable no-tabs */
/* eslint-disable react/no-children-prop */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
// import jwt from 'jsonwebtoken'
import { useApolloClient, useQuery } from '@apollo/client'
import { Header } from '../../components/Layout/Header'
import { useRouter } from 'next/router'
import { AlertBox } from '../../components/AlertBox'
import useFullscreenMode from '../../components/hooks/useFullScreenMode'
import { Context /* useAuth */ } from '../../context'
import Aside from '../../components/Layout/Aside'
import { Footer } from '../../components/Layout/Footer'
import { BGColor } from '../../public/colors'
import { URL_BASE } from '../../apollo/urls'
import { useUser } from '../Profile'
import { useCompanyHook } from '../dashboard'
import { ALL_COMPANIES_BY_USER } from '../Company/queries'
import { useFormTools } from '../../components/hooks/useForm'
import { Loading } from '../../components/Loading'
import { LateralMenu } from '../../components/common/LateralMenu'
import { Product } from '../shared/productos'
import { Iva } from '../shared/Iva'
import { Accounts } from '../shared/Accounts'
import { Supplier } from '../shared/Suppier'
import { Class } from '../shared/Class'
import { NewCompany } from '../shared/newCompany'
import { Categories } from '../shared/Categories'
import { TopNavigation } from '../../components/Layout/TopNavigation'
import { RouterCrumbs } from '../../components/Breadcrumb'
import { useSetState } from '../../components/hooks/useState'

export const LayoutC = ({ keyTheme, handleTheme, children }) => {
  // STATES
  const { error, setAlertBox, authData, menu, handleMenu, isSession, setIsSession, company, setSessionActive } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm }] = useFormTools()
  const [show, setShow] = useState(false)
  const [activeLogin, setActive] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const location = useRouter()
  const [elementRef, FullscreenIcon] = useFullscreenMode()
  const [active, setActiveMenu] = useState(false)
  const [modal, setModal] = useState(1)
  const [data, { loading, error: errorUser }] = useUser()
  const { data: allCompany } = useQuery(ALL_COMPANIES_BY_USER)
  const client = useApolloClient()
  // HANDLES
  const handleClick = index => {
    setShow(index === show ? false : index)
  }
  const handleClickMap = index => {
    setModal(index === modal ? false : index)
  }
  // Handle to MenuLateral
  const handleClickMenu = index =>
    setActiveMenu(index === active ? false : index)
  const activeSettings = () => {
    setActive(!activeLogin)
  }
  // EFFECTS
  useEffect(() => {
    const body = document.body
    body.addEventListener(
      'keyup',
      e => e.code === 'Escape' && setShow(false)
    )
    return () => body.removeEventListener('keyup', () => setShow)
  }, [setShow])

  useEffect(() => {
    setShow(false)
  }, [location])

  useEffect(() => {
    setShow(false)
  }, [location])
  const [loadingLogout, setLoadingLogout] = useState(false)
  const closeSession = useCallback(async () => {
    setLoadingLogout(true)
    await window
    .fetch(`${URL_BASE}auth/logout/`, {})
    .then(res => res.json())
      .catch(() => {
        setAlertBox({
          message: 'Se ha producido un error.',
          duration: 30000,
          color: 'error'
        })
      }).finally(() => {
        location.push('/')
        setSessionActive(null)
        client.cache.reset()
      })
      setTimeout(() => {
        setLoadingLogout(false)
      }, 300);
  }, [])

  const [timer, setTimer] = useState(0)
  const [isOn, setIsOn] = useState(false)
  useEffect(() => {
    let interval
    if (process.env === 'production' && isOn && !!isSession) {
      interval = setInterval(() => setTimer(timer => timer + 1), 1000)
    }
    window.addEventListener('focus', () => {
      setIsOn(false)
      clearInterval(interval)
    })
    window.addEventListener('blur', () => {
      setIsOn(true)
      if (timer >= 700) {
        closeSession()
      } else {
        clearInterval(interval)
      }
    })

    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', () => { })
      window.removeEventListener('blur', () => { })
    }
  }, [authData, isOn])
  // const { authState, setAuthToken } = useAuth()
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const fetchAccessToken = async () => {
  //       if (authState?.userId) {
  //         // no need to refresh if userId is not defined
  //         const now = Date.now().valueOf() / 1000
  //         if (typeof authState !== 'undefined' && jwt.decode(authState?.token)?.exp < now) {
  //           await fetchJson(`${URL_BASE}graphql`, {
  //             method: 'POST',
  //             headers: {
  //               'content-type': 'application/json'
  //             },
  //             body: JSON.stringify({
  //               query: `mutation {
  //                 refreshUserToken(userId: "${authState?.userId}", refreshToken: "${authState?.refreshToken}" ) {
  //                   userId
  //                   token
  //                   newRefreshToken
  //                 }
  //               }`
  //             })
  //           }).then(res => {
  //             if (res) {
  //               signIn(res?.data?.refreshUserToken?.userId, res?.data?.refreshUserToken?.token, res?.data?.refreshUserToken?.newRefreshToken)
  //             }
  //           })
  //         } else {
  //           return null
  //         }
  //       }
  //     }
  //     fetchAccessToken()
  //   }
  // }, [authState, setAuthToken])
  const [dataCompany] = useCompanyHook(dataForm !== 'undefined' && dataForm)
  if (loadingLogout || loading) return <Loading />
  // if (errorUser) return <span>Error</span>
  return (
    <div style={{ background: BGColor }} ref={elementRef}>
      <AlertBox err={error} />
      <App>
        <Main
          aside={
            !['/', '/login', '/contact', '/register', '/terms_and_conditions', '/email/confirm/[code]', '/forgotpassword', '/teams/invite/[id]', '/autho', '/contact-us', '/switch-options'].find(x => x === location.pathname)}
        >
          {!['/', '/login', '/register', '/terms_and_conditions', '/teams/invite/[id]', '/forgotpassword', '/autho', '/contact-us', '/email/confirm/[code]', '/switch-options', '/contact', '/teams/invite/[id]'].find(x => x === location.pathname) && (
            <Aside
              handleClickMenu={handleClickMenu}
              active={active}
              allCompany={allCompany?.getAllCompanyById}
              dataCompany={dataCompany}
              handleMenu={handleMenu}
              onChange={handleChange}
              dataForm={dataForm}
            />
          )}
          {!['/login', '/', '/register', '/forgotpassword', '/teams/invite/[id]', '/terms_and_conditions', '/email/confirm/[code]', '/autho', '/contact'].find(x => x === location.pathname) && (
            <Header
              activeSettings={activeSettings}
              setShowModal={setShowModal}
              // UseFullScreen
              FullscreenIcon={FullscreenIcon}
              dataCompany={dataCompany}
              handleClickMap={handleClickMap}
              closeSession={closeSession}
              data={data}
              isSession={isSession}
              showModal={showModal}
              handleClick={handleClick}
              show={show}
              modal={modal}
              setShow={setShow}
              handleTheme={handleTheme}
              authData={authData}
              keyTheme={keyTheme}
              location={location}
            />
          )}
          <div style={{ gridArea: 'main' }}>
            {/* {!['/', '/login', '/register', '/forgotpassword', '/terms_and_conditions', '/upload/bills', '/autho', '/contact-us', '/switch-options', '/bills', '/companies/dashboard']
          .find(x => x === location.pathname) && <TopNavigation
          />} */}
            {/* {!['/', '/login', '/register', '/forgotpassword', '/terms_and_conditions', '/upload/bills', '/autho', '/contact-us', '/switch-options', '/bills']
          .find(x => x === location.pathname) && <RouterCrumbs
          />} */}
            {children}
          </div>
          {/* <Overline zIndex = {'800'} show={menu} bgColor={'red'} onClick={() => handleMenu(false)} /> */}
          <LateralMenu
            show={menu}
            title={
              menu === 1
                ? 'New Supplier'
                : menu === 2
                  ? 'New Iva'
                  : menu === 3
                    ? 'New Accounts'
                    : menu === 4
                      ? 'New Product'
                      : menu === 5
                        ? 'New Company'
                        : menu === 6
                          ? 'New Categories'
                          : menu === 7
                            ? 'New Class'
                            : null
            }
            onHide={() => {
              handleMenu(false)
              location.replace(location.pathname)
            }}
            onCancel={() => false}
            btnCancel={false}
            btnConfirm={false}
            header={true}
            footer={false}
            borderRadius="0"
          >
            {menu === 1
              ? (<Supplier />)
              : menu === 2
                ? (
                  <Iva />
                )
                : menu === 3
                  ? (
                    <Accounts />
                  )
                  : menu === 4
                    ? (
                      <Product />
                    )
                    : menu === 5
                      ? (
                        <NewCompany />
                      )
                      : menu === 6
                        ? (
                          <Categories />
                        )
                        : menu === 7
                          ? (
                            <Class />
                          )
                          : null}
          </LateralMenu>
          {!['/login', '/register', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => x === location.pathname) && <Footer />}
        </Main>
      </App>
    </div>
  )
}

const App = styled.div`
    height: 100vh;
`
const Main = styled.main`
    display: grid;
    width: 100%;
    grid-template-rows: 50px 1fr;
    grid-template-columns: min-content 1fr;
    grid-template-areas:
        'aside head head'
        'aside main main'
        'aside main main';
    text-align: center;
    grid-gap: 0.25rem;
    /* grid-gap: 10px; */
    @media (min-width: 960px) {
        ${props =>
    !props.aside &&
    css`
                grid-template-columns: 1fr;
                display: flex;
                flex-direction: column;
                height: 100%;
            `};
    }
`

LayoutC.propTypes = {
  props: PropTypes.object,
  keyTheme: PropTypes.string,
  children: PropTypes.object,
  useCompany: PropTypes.object,
  handleTheme: PropTypes.func
}
