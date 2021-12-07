/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react'
import { Container, Wrapper, SideMenu, ModalHeader, ModalTitle, BtnClose, ModalBody, ModalFooter, BtnCancel, BtnConfirm, OverLine } from './styled'
import PropTypes from 'prop-types'
import { IconCancel } from '../../../public/icons'
import { BUTTONS_TEXT } from '../../AwesomeModal/constanst'

export const LateralMenu = ({
  title,
  show,
  padding,
  backdrop = true,
  keyboard = true,
  footer = true,
  btnCancel = true,
  btnConfirm = true,
  children,
  hideOnConfirm = true,
  timeOut = 200,
  height,
  submit = false,
  header = true,
  closeIcon = false,
  borderRadius = '.3rem',
  onHide = () => undefined,
  onCancel = () => undefined,
  onConfirm = () => undefined
}) => {
  const [state, setState] = useState(show)
  const hide = useCallback(() => {
    setState(false)
    onCancel()
    setTimeout(onHide, timeOut)
  }, [onCancel, onHide, timeOut])
  useEffect(() => {
    if (keyboard && show) window.addEventListener('keydown', e => e.code === 'Escape' && hide())
    return () => keyboard && window.removeEventListener('keydown', () => { })
  }, [keyboard, hide, show])
  useEffect(() => {
    setState(show)
  }, [show])
  const onBackdropHide = e => {
    e.preventDefault()
    if (backdrop === 'static') return 0
    hide()
  }
  const clickCancel = () => {
    hide()
    onCancel()
  }
  const clickConfirm = () => {
    if (hideOnConfirm) hide()
    onConfirm()
  }
  return (<>
      <OverLine show={show} state={state} onMouseDown={onBackdropHide} />
    <Container show={show} state={state} >
      <Wrapper onMouseDown={onBackdropHide}>
        <SideMenu borderRadius={borderRadius} show={show} state={state} onMouseDown={e => e.stopPropagation()} >
          {header && <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <BtnClose onClick={hide}><IconCancel size='15px' /></BtnClose>
          </ModalHeader>}
          {(closeIcon && !header) && <BtnClose fixed onClick={hide}></BtnClose>}
          <ModalBody padding={padding} height={height}>
            {children}
          </ModalBody>
          {footer && <ModalFooter>
            {btnCancel && <BtnCancel type='button' onClick={clickCancel}>{BUTTONS_TEXT.cancel}</BtnCancel>}
            {btnConfirm && <BtnConfirm type={submit ? 'submit' : 'button'} onClick={clickConfirm}>{BUTTONS_TEXT.confirm}</BtnConfirm>}
          </ModalFooter>}
        </SideMenu>
      </Wrapper>
    </Container>
  </>
  )
}

LateralMenu.propTypes = {
  title: PropTypes.node,
  size: PropTypes.string,
  padding: PropTypes.string,
  show: PropTypes.bool || PropTypes.number,
  backdrop: PropTypes.bool,
  keyboard: PropTypes.bool,
  footer: PropTypes.bool,
  btnCancel: PropTypes.bool,
  btnConfirm: PropTypes.bool,
  children: PropTypes.object,
  hiddeOnConfirm: PropTypes.bool,
  timeOut: PropTypes.number,
  height: PropTypes.string,
  header: PropTypes.bool,
  submit: PropTypes.bool,
  onHidde: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,

  hideOnConfirm: PropTypes.func,
  closeIcon: PropTypes.bool,
  borderRadius: PropTypes.string,
  onHide: PropTypes.func
}
