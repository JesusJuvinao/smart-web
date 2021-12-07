/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { LayoutOption } from '../LayoutOption'
import { IconArrowBottom, IconLogo } from '../../../public/icons'
import { Container, NavLink, ContainerLink, Button, ContentLink, ContainerBurger } from './styled'
import { Context } from '../../../context'
import { AlertError } from '../AlertError/index'
import { useRouter } from 'next/router'

export const Header = ({ props, data, handleClickMap, isSession, authData, modal, FullscreenIcon, closeSession, theme, show, setShow, location, keyTheme, handleTheme, activeSettings, handleClick, setShowModal, showModal }) => {
  const { setCollapsed, collapsed } = useContext(Context)
  const router = useRouter()
  return (
        <Container>
            <AlertError />
            <ContainerLink>
                <ContentLink style={{ display: 'flex' }}>
                    {!['/login', '/', '/register', '/forgotpassword', '/terms_and_conditions', '/switch-options']
                      .find(x => x === router.pathname) && <ContainerBurger onClick={() => setCollapsed(!collapsed)}>
                            <div className="BurgerMenu__container" role="button" >
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </ContainerBurger>}

                    <NavLink href="/">
                        <a>
                            <IconLogo size='55px' />
                        </a>
                    </NavLink>
                    {!isSession && <>
                        <NavLink href='/'>
                            <a>
                                <Button>
                                    Home
                                </Button>
                            </a>
                        </NavLink>
                        <NavLink href='/login'>
                            <a>
                                <Button login padding='0px 7px'>
                                    Find
                                    &nbsp;
                                    <IconArrowBottom size='11px' />
                                </Button>
                            </a>
                        </NavLink>
                        <NavLink href='/login'>
                            <a>
                                <Button login padding='0px 7px'>
                                    Plans
                                    &nbsp;
                                    <IconArrowBottom size='11px' />
                                </Button>
                            </a>
                        </NavLink>
                    </>}
                </ContentLink>
            </ContainerLink>
            <LayoutOption data={data} isSession={isSession} authData={authData} theme={theme} closeSession={closeSession} handleClickMap={handleClickMap} modal={modal} FullscreenIcon={FullscreenIcon} location={location} activeSettings={activeSettings} handleClick={handleClick} setShowModal={setShowModal} showModal={showModal} props={props} handleTheme={handleTheme} keyTheme={keyTheme} show={show} setShow={setShow} />
        </Container>
  )
}

Header.propTypes = {
  children: PropTypes.element,
  theme: PropTypes.string || PropTypes.object,
  props: PropTypes.object,
  displayMessage: PropTypes.string || PropTypes.func,
  activeSettings: PropTypes.func,
  handleClick: PropTypes.func,
  setShowModal: PropTypes.func,
  handleTheme: PropTypes.func,
  keyTheme: PropTypes.string,
  location: PropTypes.object,
  showModal: PropTypes.bool,
  onClickLogout: PropTypes.func,
  modal: PropTypes.number,
  setShow: PropTypes.func,
  handleClickMap: PropTypes.func,
  closeSession: PropTypes.func,
  FullscreenIcon: PropTypes.object,
  data: PropTypes.object,
  show: PropTypes.bool
}
