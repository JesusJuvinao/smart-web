import styled, { css } from 'styled-components'
import { BColor, BGColor, SEGColor } from '../../public/colors'

export const Container = styled.div`
    padding: 20px;
    height: 100vh;
    background-color: ${BGColor};
`
export const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    outline: none;
    font-size: 12px;
    width: ${({ width }) => width || '100%'};
`

export const Button = styled.button`
    flex-direction: row;
    position: relative;
    padding: ${({ padding }) => padding || '5px'};
    display: ${({ display }) => display || 'flex'};
    cursor: pointer;
    border: ${({ border }) => border ? `${`1px solid ${SEGColor}`}` : 'none'};
    border-radius: ${({ radius }) => radius || '30px'};
    font-size: 11px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    height: ${({ height }) => height || 'auto'};
    color: ${({ color }) => color || BColor};
    width: ${({ width }) => width || 'auto'};
    background-color: ${({ bgColor }) => bgColor || 'transparent'};
    &:disabled {
        cursor: no-drop;
    }
    /* &:active{
        transform: scale(0.9);
    } */
`

export const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: ${({ direction }) => direction || 'column'};
`
export const ContentModal = styled.div`
    padding: 20px;
`
export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || 'auto'};
    text-overflow: ellipsis;
`

export const Pre = styled.pre`
  margin: 0 auto 20px;
  padding: 20px;
  border: 2px dashed #edf2f7;
  border-radius: 10px
`
export const Section = styled.section`
  font-size: 16px;
  font-family: "Courier New", Courier, monospace;
  background-color: #edf2f7;
  padding: 16px;
  border-radius: 10px;
  overflow: auto;
  position: sticky;
  top: 30px;
`