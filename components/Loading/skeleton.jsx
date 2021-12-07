import React from 'react'
import styled, { css } from 'styled-components'
import { ContainerCard } from '../../container/Company/styled'
import PropTypes from 'prop-types'

export const Skeleton = ({ width, margin, height, direction }) => {
  return (
    <ContainerCard direction={direction}>
      {[1, 2, 3, 4].map(x => (
        <Card margin={margin} height={height} width={width} key={x}>
          <div className="card-loader"></div>
          <div style={{ display: 'flex' }} >
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
          </div>
        </Card>

      ))}
    </ContainerCard>
  )
}
const Card = styled.div` 
    padding: 20px;
    flex: 1 1 auto;
    min-height: 1px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    border: 1px solid rgba(72, 94, 144, 0.16);
    border-radius: 4px;
    ${({ width }) => width && css`width: ${width};`}
    ${({ height }) => height && css`height: ${height};`}
    ${({ margin }) => margin && css`margin: ${margin};`}

    @media screen and (min-width: 576px){
        padding: 20px;
    }
    z-index: 999;
.card-loader {
  background-color: #fff;
  padding: 8px;
  position: relative;
  height: 200px;
  overflow: hidden;
 /* padding: 10px; */
  &:before {
    content: '';
    height: 120px;
    display: flex;
    background-color: #ededed;
    border-radius: 6px;
    box-shadow: -48px 78px 0 -48px #ededed, -51px 102px 0 -51px #ededed;
  }

  &:after {
    content: '';
    background-color: #636363;
    border-radius: 10px;
    width: 100%;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    animation-duration: .8s;
    animation-iteration-count: infinite;
    animation-name: loader-animate;
    animation-timing-function: linear;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);
  }
  
}
 
.card {
  background-color: #fff;

  position: relative;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  overflow: hidden;
  &:before {
    content: '';
    height: 120px;
    display: flex;
    background-color: #ededed;
    border-radius: 6px;
    box-shadow: -48px 78px 0 -48px #ededed, -51px 102px 0 -51px #ededed;
  }

  &:after {
    content: '';
    background-color: #636363;
    border-radius: 10px;
    width: 100%;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    animation-duration: .8s;
    animation-iteration-count: infinite;
    animation-name: loader-animate;
    animation-timing-function: linear;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);
  }
  
}
 

// Loader animation
@keyframes loader-animate{
 0%{
    transform: translate3d(-100%, 0, 0);
  }
 100%{
    transform: translate3d(100%, 0, 0);
  }
}
`
Skeleton.propTypes = {
  width: PropTypes.string,
  margin: PropTypes.string,
  height: PropTypes.string,
  direction: PropTypes.string
}
