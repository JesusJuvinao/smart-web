/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Map } from '../LocationUser/Map'
import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../../public/colors'
import { IconConfig, IconGridLayout, IconLocationMap, IconLogout } from '../../../public/icons'
import { Content, Button, FloatingBoxTwo, Overline, CtnIcon } from './styled'
import { Context } from 'context'

export const LayoutOption = ({ handleClickMap, closeSession, modal, FullscreenIcon, show, setShow, location, theme, keyTheme, handleTheme, activeSettings, handleClick, setShowModal, showModal }) => {
    const { isSession, authData } = useContext(Context)
    return (
        <>
            <Overline onClick={() => setShow(!true)} show={show} />
            <Content>
                {isSession && authData
                  ? <>
                        <div>
                            {FullscreenIcon}
                        </div>
                        <Button onClick={() => data && setShowModal(true)}>
                            <IconLocationMap size='20px' color={PColor} />
                        </Button>
                        <Button>
                            <IconGridLayout size='20px' color={PColor} />
                        </Button>
                        <Button onClick={closeSession}>
                            <IconLogout size='18px' color={PColor} />
                        </Button>
                        <ContainerOption>
                            <Button onClick={() => handleClick(2)}>
                                <CtnIcon>
                                    <IconConfig size='18px' color={PColor} />
                                </CtnIcon>
                            </Button>
                            <FloatingBoxTwo show={show === 2}>
                                <Option>
                                    <ButtonTheme onClick={() => keyTheme === 'light' ? handleTheme('dark') : handleTheme('light')}>
                                        <>
                                            <Switch active={theme === 'dark' ? '14px' : '-25px'} />
                                        </>
                                    </ButtonTheme>
                                </Option>
                                <Option >
                                    <span style={{ fontFamily: 'PFont-Light', fontSize: '14px' }} onClick={activeSettings}>
                                        <Enlace href='/config'>
                                            settings
                                        </Enlace>
                                    </span>
                                </Option>

                                <Option >
                                    <Button space onClick={closeSession}>
                                        <span>Close session</span>
                                        <IconLogout size='20px' color={PColor} />
                                    </Button>
                                </Option>

                            </FloatingBoxTwo>
                        </ContainerOption>
                        <Enlace href='/profile'>
                            <a>
                                <Option>
                                    <ContentUser >
                                        <Text size='14px'>{isSession && isSession.data?.userName?.slice(0, 1).toUpperCase() || null}</Text>
                                    </ContentUser>
                                </Option>
                            </a>

                        </Enlace>
                    </>
                  : <Content>
                        <Enlace href='/login'>
                            <Button login padding='0px 20px'>
                                Login
                            </Button>
                        </Enlace>
                        <Enlace href='/register'>
                            <Button color={BGColor} bgColor={PColor} login padding='0px 20px'>
                                Sign up
                            </Button>
                        </Enlace>
                    </Content>}
            </Content>
            <Map showModal={showModal} setShowModal={setShowModal} modal={modal} handleClickMap={handleClickMap} />
        </>
  )
}
LayoutOption.propTypes = {
  children: PropTypes.element,
  theme: PropTypes.object,
  activeSettings: PropTypes.func,
  data: PropTypes.object,
  handleClick: PropTypes.func,
  setShowModal: PropTypes.func,
  toggle: PropTypes.func,
  showModal: PropTypes.bool,
  onClickLogout: PropTypes.func,
  closeSession: PropTypes.func,
  keyTheme: PropTypes.string,
  setShow: PropTypes.func,
  show: PropTypes.bool,
  handleClickMap: PropTypes.func,
  FullscreenIcon: PropTypes.object,
  modal: PropTypes.number,
  uAvatar: PropTypes.string,
  handleTheme: PropTypes.func,
  location: PropTypes.object

}

const ContainerOption = styled.div`
    position: relative;
    
`
const Text = styled.span`
    font-family: PFont-Regular;
    font-size: ${({ size }) => size || '14px'};
`
const Enlace = styled(Link)`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 10px;
    &:hover{
        background-color: #1b18181a;
    }
    `
const ContentUser = styled.div`
    border-radius: 50%;
    height: 30px;
    min-height: 25px;
    max-height: 25px;
    max-width: 25px;
    min-width: 25px;
    display: grid;
    place-content: center;
    background-color: rgb(0, 151, 230);
    color: #FFF;
`
const Option = styled.div`
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    padding: 15px 0px;
    &:hover {
        background-color: #f8f8fa;
    }
`
const ButtonTheme = styled.button`
    width: 65px;
    height: 25px;
    border-radius: 30px;
    position: relative;
    transition: .3s ease;
`
const Switch = styled.div`
    width: 23px;
    height: 23px;
    border-radius: 50%;
    top: -15px;
    position: absolute;
    ${({ active }) => active && css`left: ${active};`}
    transition: .3s ease;

`
