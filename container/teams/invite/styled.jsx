import styled, { css } from 'styled-components'
import { BColor, PColor, SECColor, SEGColor, PVColor, BGColor } from '../../../public/colors'

export const Form = styled.form`
    display: flex;
    width: ${({ width }) => width || '350px'};
    margin: ${({ margin }) => margin || '80px auto'};
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    border: solid 1px #d4d7dc;
    border-radius: 8px;
    padding: 20px 30px;
    place-content: center;
    height: min-content;
    transform: translateX(0%);
    transition: opacity ease 300ms;
    flex-direction: column;
    background-color: ${({ bgColor }) => bgColor || 'white'};
`
export const Container = styled.div`
    min-width:500px;
    height: 100vh;
    position: relative;
    z-index: 999;
    overflow: hidden;
    @media only screen and (max-width: 960px) {
       margin-top: -46px;
    }
`
export const Logo = styled.div`
transition: 500ms;
left: 35px;
position: absolute;
top: 15px;
width: min-content;
@media only screen and (max-width: 960px) {
    height: min-content;
    left: inherit;
    top: inherit;
    position: inherit;
    display: flex;
    justify-content: center;
    }
`
export const Figure = styled.div`
    justify-content: center;
    transition: 500ms;
    width: 50%;
    display: flex;

`

export const BoxEmail = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
    border: 1px solid rgb(131, 144, 175);
    margin-bottom: 1rem;
    padding: 1rem;
`

export const Tooltip = styled.div`
    visibility: hidden;
    opacity: 0;
    top: -4px;
    font-size: 13px;
    font-family: PFont-Regular;
    position: absolute;
    right: 30px;
    padding: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width: 200px;
    border-radius: 10px;
    transition: 0.5s ease;
    transform: translateX(10px);
    background-color:  ${BGColor};
    color: ${SEGColor};
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent rgba(185, 186, 187, 0.2);
    }
`
export const Button = styled.button`
    position: relative;
    &:hover > ${Tooltip} {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
     }
`
export const Anchor = styled.span`
        &.active {
        border-bottom: 2px solid #61d2b4;
    }
    padding: 0px;
    color: ${PVColor};
    cursor: pointer;
    font-weight: 300;
    display: flex;
    font-size: ${({ size }) => size}px;
    transition: .5s ease;
    align-items: center;
    justify-content: flex-start;
    padding: 3px 10px;
    margin: 0;
`
export const Text = styled.span`
    font-size: ${({ size }) => size || '20px'};
    color: ${({ color }) => color || BColor};
    line-height: ${({ lineHeight }) => lineHeight || 'initial'};
    font-weight: ${({ fontWeight }) => fontWeight || 'initial'};
    width: 100%;
    margin-top: 10px;
    font-family: PFont-Light;
    word-break: break-word;
`
export const FooterComponent = styled.footer`
    position: fixed;
    bottom: 0;
    height: 150px;
    display: flex;
    left: 0;
    align-items: center;
    margin: auto;
    right: 0;
    width: 100%;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 24%);
    z-index: 80;
    justify-content: center;
    background-color: ${SECColor};
`
