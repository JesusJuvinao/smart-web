import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../../public/colors'
import { Rotate } from '../../animations'

export const Content = styled.div`
    display: flex;
    align-items: center;
    width: min-content;
    @media only screen and (min-width: 960px){
    }
`
export const CtnIcon = styled.div`
    background-color: transparent;
    & > svg {
        animation: ${Rotate} 2s linear infinite;
        user-select: none;
    }
`
export const Button = styled.button`
    margin-left: 5px;
    margin: ${({ padding }) => padding || '5px'};
    color: ${({ color }) => color || `${PColor}`};
    position: relative;
    transition: .5s ease;
    cursor: pointer;
    background-color:  transparent;
    ${props => props.space && css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0;
        & > span {
            font-family: PFont-Light;
            font-size: 14px;
        }
    `}
    ${props => props.login && css`
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
    padding: 6px;
    background-color: ${({ bgColor }) => bgColor || 'rgba(64,87,109,.07)'};
    &&:hover {
        background-color: #394d5f11;
        color: ${PColor};
    } 
    `}
    @media (max-width: 960px){
        margin-left: 0px;
        font-size: 13px;
        font-weight: 400;
    }
`
export const FloatingBox = styled.div`
    position: absolute;
    grid-gap: 0 10px;
    max-width: 250px;
    min-width: 250px;
    width: 250px;
    overflow: hidden;
    box-shadow: -1px 2px 8px 2px #dcdcdce6;
    display: grid;
    transition: all 200ms ease-in-out;
    background-color: ${BGColor};
    padding: 10px;
    top: 50px;
    width: 500px;
    z-index: 999999;
  ${({ show }) => show
        ? css`
                  visibility: visible;
                  opacity: 1;
                  transform: translateY(0);
              `
        : css`
                
                  margin: 0;
                  visibility: hidden;
                  opacity: 0;
                  transform: translateY(-50px);
              `}

`
export const FloatingBoxTwo = styled(FloatingBox)`
    margin: 0 0 0 30px;
    left: -220px;
    border-radius: 5px;
    top: 50px;
    max-width: 250px;
    min-width: 250px;
    width: 250px;
    overflow: hidden;
    background-color: ${BGColor};
    z-index: 99999;
    box-shadow: -1px 2px 8px 2px #dcdcdce6;
    @media only screen and (max-width: 960px){
        max-width: 100%;
        min-width: 100%;
        width: 100%;
    }
  
`
export const Overline = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: transparent;
    ${props => props.show ? css`display: block` : css`display: none;`};
    @media only screen and (min-width: 960px){
    }
  
`
