/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react'

import PropTypes from 'prop-types'
import Link from 'next/link'
import { IconHome } from '../../../public/icons'
import { Content, Button, HasSubMenu, ContainerNav, Anchor, SubMenu, Li } from './styled'
import ActiveLink from '../../common/Link'

export const TopNavigation = ({ theme, show, setShow, displayMessage, activeSettings, handleClick, setShowModal, showModal, onClickLogout }) => {
  const post = {
    slug: 1
  }
  return (
        <Content>
            <ContainerNav>
                <Button>
                    <IconHome size='15px' /> &nbsp;
                    <Link href={`/dashboard/${encodeURIComponent(post.slug)}`}><a>Dashboard</a></Link>
                </Button>
                <div>
                    <div>
                        {<HasSubMenu>
                            <Anchor>Apps</Anchor>
                            <SubMenu>
                                <HasSubMenu>
                                    <Anchor IconPosition> Doctores</Anchor>
                                    <SubMenu><Li><CustomLink path='/' label='Cuadricula de mapa' /></Li></SubMenu>
                                </HasSubMenu>
                                <Li><CustomLink path='/' label='Citas' /></Li>
                                <Li><CustomLink path='/' label='Chat' /></Li>
                                <Li><CustomLink path='/' label='File Manager' /></Li>
                                <Li><CustomLink path='/contact-us' label='Email' /></Li>
                            </SubMenu>

                        </HasSubMenu>}
                    </div>
                </div>
            </ContainerNav>
            <div />
        </Content>
  )
}

const CustomLink = ({ path, label, icon, notHover }) => <ActiveLink activeClassName='active' href={path}>
    <Anchor notHover={notHover}>{label} &nbsp;
        {icon}
    </Anchor>
</ActiveLink>
TopNavigation.propTypes = {
  children: PropTypes.element,
  theme: PropTypes.object,
  props: PropTypes.object,
  displayMessage: PropTypes.string || PropTypes.func,
  activeSettings: PropTypes.func,
  handleClick: PropTypes.func,
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  onClickLogout: PropTypes.func,
  setShow: PropTypes.func,
  show: PropTypes.bool
}

CustomLink.propTypes = {
  path: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.bool,
  notHover: PropTypes.bool
}
