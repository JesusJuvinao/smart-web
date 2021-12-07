import styled from 'styled-components'
import { SEGColor, PVColor, PColor, BGColor, PLColor, SECColor } from '../../public/colors'
import { FadeIn } from '../animations'

export const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin: auto;
    align-items: center;
    height: 100vh;
    background-color: ${BGColor};
`
export const From = styled.form`
    display: flex;
    width: ${({ width }) => width || '500px'};
    margin: ${({ margin }) => margin || '80px 0 0 0'};
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    border: solid 1px #d4d7dc;
    border-radius: 8px;
    padding: 20px 30px;
    place-content: center;
    height: min-content;
    animation: ${FadeIn} 300ms;
    transform: translateX(0%);
    transition: opacity ease 300ms;
    flex-direction: column;
    background-color: ${({ bgColor }) => bgColor || 'white'};
`
export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || 'auto'};
    text-overflow: ellipsis;
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