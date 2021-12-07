import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'

export const ButtonHook = ({ children, disabled, border, padding, position, margin, top, right, left, width, display, justify, HoverEffect, Ripple, lineHeight, textAlign, cursor, weight, fontsize, shadow, onClick, radius, bgColor, alignItems }) => {
  const [state, setState] = useState('')
  const [rippleStyle, setRippleStyle] = useState({})
  let timerId
  const ripple = useRef(null)
  const button = useRef(null)

  const onMouseDown = e => {
    setState('')
    clearTimeout(timerId)
    const size = button.current.offsetWidth
    const pos = button.current.getBoundingClientRect()
    const x = e.pageX - pos.left - size
    const y = e.pageY - pos.top - size

    const newRippleStyle = {
      top: `${y}px`,
      left: `${x}px`,
      width: `${size * 2}px`,
      height: `${size * 2}px`
    }

    setRippleStyle(newRippleStyle)

    setState('ripple-start ripple-active')
    timerId = setTimeout(() => {
      setState('')
    }, 230)
  }
  return (
        <Container disabled={disabled} border={border} padding={padding} position={position} margin={margin} right={right} top={top} left={left} width={width} justify={justify} HoverEffect={HoverEffect} onClick={onClick} lineHeight={lineHeight} textAlign={textAlign} display={display} shadow={shadow} weight={weight} cursor={cursor} fontsize={fontsize} bgColor={bgColor} radius={radius} alignItems={alignItems} >

            <button ref={button} disabled={disabled} onClick={onClick} className="MaterialRippleButton__container" onMouseDown={onMouseDown}>
                {Ripple && <span ref={ripple} style={rippleStyle} className={`ripple ${state}`}></span>}
                {children}
                {HoverEffect && <svg>
                    <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>}
            </button>

        </Container>

  )
}

const Container = styled.div`
  .MaterialRippleButton__container{
    color: ${({ color }) => color || `${BGColor}`};
    background-color: ${({ bgColor }) => bgColor || `${PColor}`};
    border: ${({ border }) => border || 'none'};
    ${({ radius }) => radius && css`border-radius: ${radius};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    ${({ display }) => display && css`display: ${display};`}
    ${({ justify }) => justify && css`justify-content: ${justify};`}
    ${({ width }) => width && css`width: ${width};`}
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    ${({ textAlign }) => textAlign && css`text-align: ${textAlign};`}
    ${({ top }) => top && css`top: ${top};`}
    ${({ fontsize }) => fontsize && css`font-size: ${fontsize};`}
    ${({ weight }) => weight && css`font-weight: ${weight};`}
    ${({ shadow }) => shadow && css`box-shadow: ${shadow};`}
    ${({ left }) => left && css`left: ${left};`}
    ${({ right }) => right && css`right: ${right};`}
    ${({ display }) => display && css`display: ${display};`}
    outline: ${({ outline }) => outline || 'none'};
    cursor: ${({ cursor }) => cursor || 'pointer'};
    position: ${({ position }) => position || 'relative'};
    align-items: ${({ alignItems }) => alignItems || 'center'};
    outline: none;
    overflow: hidden;
    font-size: 15px;
    &:disabled {
        background-color:  ${`${PColor}99`};  
    }
    .ripple{
      background:  #ffffff57;  
        border-radius: 50%;
        pointer-events: none;
        position: absolute;
        transform: scale(0);
        z-index: 1;
    }
    div{
        z-index: 2;
    }
    .ripple-active{
        transform: scale(2);    
        transition: transform 700ms; 
        opacity: 0 transition 700ms;
    }
    .ripple-start{
        transform: scale(2)    
    }
    ${({ HoverEffect }) => HoverEffect && css`  
      color: rgb(255, 255, 255);
      cursor: pointer;
      font-size: 16px;
      font-weight: 400;
      transition-property: all;
      transition-duration: 0.6s;
      transition-timing-function: ease;
      background: rgb(255, 15, 15);
  
    & > svg {
        height: -webkit-fill-available;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
    &  rect {
        fill: none;
        stroke: rgb(232, 0, 0);
        strokeWidth: 3;
        stroke-dasharray: 600, 600;
        transition: all 0.35s linear;
    }
    & :hover rect {
        strokeWidth: 5;
        stroke-dasharray: 30, 310;
        stroke-dashoffset: 48;
        transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
    }
    `}
}

`
ButtonHook.propTypes = {
  onChange: PropTypes.func,
  reset: PropTypes.func,
  setAlertBox: PropTypes.func,
  children: PropTypes.object,
  disabled: PropTypes.string,
  border: PropTypes.string,
  padding: PropTypes.string,
  position: PropTypes.string,
  margin: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  left: PropTypes.string,
  width: PropTypes.string,
  display: PropTypes.string,
  justify: PropTypes.string,
  HoverEffect: PropTypes.string,
  Ripple: PropTypes.string,
  lineHeight: PropTypes.string,
  cursor: PropTypes.string,
  weight: PropTypes.string,
  fontsize: PropTypes.string,
  shadow: PropTypes.string,
  onClick: PropTypes.string,
  radius: PropTypes.string,
  bgColo: PropTypes.string,
  alignItems: PropTypes.string,
  textAlign: PropTypes.string,
  bgColor: PropTypes.string
}
