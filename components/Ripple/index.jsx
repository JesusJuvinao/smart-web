/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'

export const RippleButton = props => {
  const { label, onClick, style, family, standard, active, type, widthButton, size, borderSolid } = props
  const button = useRef(null)

  useEffect(() => {
    let mounted = true
    const b = button.current
    b.addEventListener('click', e => {
      const rect = button.current.getBoundingClientRect()
      const ripple = document.createElement('div')
      const width = Math.max(rect.width, rect.height) * 2
      ripple.style.width = `${width}px`
      ripple.style.height = `${width}px`
      ripple.style.left = `${e.clientX - rect.left - width / 2}px`
      ripple.style.top = `${e.clientY - rect.top - width / 2}px`
      ripple.className = 'ripple'
      button.current.appendChild(ripple)

      setTimeout(() => mounted && button.current.removeChild(ripple), 1000)
    })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Button widthButton={widthButton} type={type} active={active} disabled={props.disabled} standard={standard} borderSolid={borderSolid} size={size} minHeight={props.minHeight} minWidth={props.minWidth} border={props.border} family={family} height={props.height} padding={props.padding} color={props.color} margin={props.margin} bgColor={props.bgColor} ref={button} onClick={onClick} className="ripple-button" style={style}>
      <span id="ripple-button-label">{label}</span>
      {props.children}
    </Button>
  )
}
const Button = styled.button`
 padding: ${({ padding }) => padding || '.5em'};
 flex-direction: ${({ fDirection }) => fDirection || 'start'};
 font-size: ${({ size }) => size || '12px'};
 background-color: ${({ bgColor }) => bgColor || PColor};
 color: ${({ color }) => color || BGColor};
 font-family: ${({ family }) => family || 'PFont-Light'};
 ${({ margin }) => !!margin && css`margin: ${margin};`}
 ${({ border }) => !!border && css`border-radius: ${border};`}
 ${({ borderSolid }) => !!borderSolid && css`border: ${borderSolid};`}
 ${({ minHeight }) => !!minHeight && css`min-height: ${minHeight};`}
 ${({ minHeight }) => !!minHeight && css`max-height: ${minHeight};`}
 ${({ widthButton }) => widthButton && css`
    width: ${widthButton};`
  }

span {
  font-family: PFont-Light !important;
}
${props => props.active && css`
  border-bottom: 3px solid ${PColor};
  font-weight: 600;
  color: #393a3d;
  position: relative;

`}
&:disabled{
  cursor: nor-drop;
}
`

RippleButton.propTypes = {
  children: PropTypes.string || PropTypes.object,
  title: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.string,
  family: PropTypes.string,
  standard: PropTypes.bool,
  active: PropTypes.string,
  type: PropTypes.string,
  widthButton: PropTypes.string
}
