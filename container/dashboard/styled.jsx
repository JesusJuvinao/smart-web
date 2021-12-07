import styled, { css, keyframes } from 'styled-components'
import { StyleSheet } from '@react-pdf/renderer'
import { BGColor, EColor, PColor } from '../../public/colors'

export const Wrapper = styled.div`
    /* background-color: hsl(220deg 50% 98%); */

`
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 #12d4aaef;
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`
export const Circle = styled.div` 
  border: 2px solid #12d4aaef;
  border-radius: 50%;
  height: 50px;
  background-color: ${BGColor};
  width: 50px;
  min-height: 50px;
  text-align: center;
  display: grid;
  place-content: center;
  min-width: 50px;
  ${props => props.pulse
? css`
    animation: ${pulse} 2s infinite;
  `
: css`
  /* margin-left: -30px; */
  `}
`
export const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  z-index: 10;
  position: relative;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
  max-width: 80%;
`
export const Avatar = styled.img`
    height: 4rem;
    width: 4rem;
    min-height: 4rem;
    max-height: 4rem;
    min-width: 4rem;
    max-width: 4rem;
    position: absolute;
    top: -28px;
    left: 10%;
    object-fit: contain;
    border-radius: 50%;
    background-color: ${PColor};
    border: 3px solid ${BGColor};
`
export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  width: 100%;
  margin: 0 auto;
  flex-direction: ${({ direction }) => direction || 'column'};
  width: ${({ width }) => width || '100%'};

`
export const WrapperRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33.33%, 1fr));
    ${({ margin }) => margin && css`margin: ${margin};`}


`
export const Card = styled.div`
  display: flex;
  flex-wrap: ${({ wrap }) => wrap || 'wrap'};
  height: ${({ height }) => height || 'min-content'};
  width: ${({ width }) => width || 'auto'};
  flex-direction: ${({ direction }) => direction || 'column'};
  padding: ${({ padding }) => padding || ' 1%'};
  position: relative;
  ${({ radius }) => radius && css`border-radius: ${radius};`}
  transition: .5s ease;
  margin: ${({ margin }) => margin || ' 1% auto'};
  background-color: ${BGColor};
  box-shadow: 0px 0px 14px #00000017;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
  ${props => props.animation && css`
    &:hover {
      transform: scale(1.2); 
    }  
  `}
`
export const CardPrimary = styled.div`
    background-color: ${({ bgColor }) => bgColor || BGColor};
    padding: ${({ padding }) => padding || '0'};
    display: ${({ display }) => display || 'flex'};
    flex-direction: ${({ direction }) => direction || 'column'};
    display: flex;
    border-radius: ${({ radius }) => radius || '0'};
    align-items: center;
    position: relative;
    width: 100%;
    
    `
export const Text = styled.span`
    font-weight: ${({ bold }) => bold || 'initial'};
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: ${({ display }) => display || 'flex'};
    font-family: ${({ font }) => font || 'PFont-Regular'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
    color: ${({ color }) => color};
`
// Create styles
export const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: '30px'
  },
  title: {
    fontSize: '30px',
    padding: '30px'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '25% repeat(auto-fill, 24%)'

  }
})
