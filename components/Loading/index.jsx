import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { BGAColor, BGColor } from '../../public/colors'
import { AnimationColor, dashAnimation, Rotator } from '../animations'

export const Loading = () => {
  return (
    <Container>
      <LsRipple>
        <div></div>
        <div></div>
      </LsRipple>
    </Container>
  )
}

export const SpinnerColor = () => {
  return (
    <Container>
      <LsRipple>
        <svg width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
      </LsRipple>
    </Container>
  )
}
export const SpinnerColorJust = () => {
  return (
    <LoadingSpinner>
      <div className="loading-google-spinner">
        <svg className="loading-google-spinner__circle-svg" viewBox="25 25 50 50">
          <circle className="loading-google-spinner__circle-stroke" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
        </svg>
      </div>
    </LoadingSpinner>
  )
}

export const LoadEllipsis = ({ color }) => (
  <EllipsisSpinner color={color}>
    <div></div><div></div><div></div><div></div>
  </EllipsisSpinner>
)

const LoadingSpinner = styled.div`
  width: auto;
.loading-google-spinner {
  position: relative;
  margin: 0 auto;
  width: 40px; 
}
  .loading-google-spinner:before {
    content: '';
    display: block;
    padding-top: 100%; }
  .loading-google-spinner__circle-svg {
    -webkit-animation: loading-google-spinner-rotate 1.28973s linear infinite;
            animation: loading-google-spinner-rotate 1.28973s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
            transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto; }
  .loading-google-spinner__circle-stroke {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    -webkit-animation: loading-google-spinner-dash 2s ease-in-out infinite, loading-google-spinner-color 8s ease-in-out infinite;
            animation: loading-google-spinner-dash 2s ease-in-out infinite, loading-google-spinner-color 8s ease-in-out infinite;
    stroke-linecap: round;
    stroke-width: 5px !important; }

@-webkit-keyframes loading-google-spinner-rotate {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

@keyframes loading-google-spinner-rotate {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); } }

@-webkit-keyframes loading-google-spinner-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0; }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px; }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px; } }

@keyframes loading-google-spinner-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0; }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px; }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px; } }

@-webkit-keyframes loading-google-spinner-color {
  100%,
  0% {
    stroke: #d62d20; }
  40% {
    stroke: #0057e7; }
  66% {
    stroke: #008744; }
  80%,
  90% {
    stroke: #ffa700; } }

@keyframes loading-google-spinner-color {
  100%,
  0% {
    stroke: #d62d20; }
  40% {
    stroke: #0057e7; }
  66% {
    stroke: #008744; }
  80%,
  90% {
    stroke: #ffa700; } }
`
const ldsEllipsis1 = keyframes`
0% {
  transform: scale(0);
}
100% {
  transform: scale(1);
}
`
const ldsEllipsis3 = keyframes`
0% {
  transform: scale(1);
}
100% {
  transform: scale(0);
}
`
const ldsEllipsis2 = keyframes`
0% {
  transform: translate(0, 0);
}
100% {
  transform: translate(24px, 0);
}
`

const EllipsisSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 70px;
  height: 20px;
& > div  {
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin: auto;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color:  ${({ color }) => color || BGColor};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
div:nth-child(1) {
  left: 8px;
  animation: ${ldsEllipsis1} 0.6s infinite;
}
div:nth-child(2) {
  left: 8px;
  animation: ${ldsEllipsis2} 0.6s infinite;
}
div:nth-child(3) {
  left: 32px;
  animation:${ldsEllipsis2} 0.6s infinite;
}
div:nth-child(4) {
  left: 56px;
  animation: ${ldsEllipsis3} 0.6s infinite;
}

`
const AnimationRipple = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`
/// Estilos loading
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${BGAColor};
    /* background-color: ${`${BGAColor}69`}; */
    z-index: 99999999;
`
const LsRipple = styled.div`
    display: inline-block;
    z-index: 9999999;
    position: relative;
    width: 80px;
    height: 80px;
    & > div {
        position: absolute;
        border: 4px solid #0099ff;
        opacity: 1;
        border-radius: 50%;
        animation: ${AnimationRipple} .1s cubic-bezier(0, 0.2, 0.8, 1)
            infinite;
    }
    & div:nth-child(2) {
        animation-delay: -0.5s;
    }
    .spinner {
  animation: ${Rotator} 1.4s linear infinite;
}
.path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    ${dashAnimation} 1.4s ease infinite, 
    ${AnimationColor} 1s ease infinite;
}
`
LoadEllipsis.propTypes = {
  color: PropTypes.object
}
