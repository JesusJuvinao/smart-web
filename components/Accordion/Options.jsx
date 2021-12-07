/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { MenuLeft, OptionMenu, Span, Row } from './Styled'

const Options = ({ index, active, children, label, path, handleClick, icon, size, color }) => {
  const [height, setHeight] = useState(0)
  const [heightMenu, setHeightMenu] = useState(0)
  const refButton = useRef()
  const refMenu = useRef()
  const location = useRouter()

  useEffect(() => {
    setHeight(refButton.current.clientHeight - refMenu.current.clientHeight)
    setHeightMenu(refMenu.current.clientHeight)
    !!location.pathname.includes(path) && handleClick(index)
  }, [])

  useEffect(() => {
    setHeight(active ? (height + heightMenu) : refButton.current.clientHeight - refMenu.current.clientHeight)
  }, [active])
  return (
        <MenuLeft type='button' onClick={e => handleClick(e)} active={active} ref={refButton} height={height}>
            <Row active={active}>
                <Span color={color} size={size} active={active}>{label}</Span>
                {icon}
            </Row>
            <OptionMenu active={active} ref={refMenu}>
                {children}
            </OptionMenu>
        </MenuLeft>
  )
}
Options.propTypes = {
  children: PropTypes.object || PropTypes.array || PropTypes.string,
  handleClick: PropTypes.func,
  path: PropTypes.string,
  label: PropTypes.string,
  index: PropTypes.bool || PropTypes.number,
  icon: PropTypes.object,
  iconTwo: PropTypes.object,
  active: PropTypes.bool
}

export default Options
