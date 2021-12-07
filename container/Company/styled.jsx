import styled, { css } from 'styled-components'
import { FadeInLeft } from '../../components/animations'
import { BGColor, SEGColor } from '../../public/colors'

export const Container = styled.div` 
    padding: 20px;
`
export const ContainerCard = styled.div` 
    padding: 20px;
    display: flex;
    ${({ justify }) => justify && css`justify-content: ${justify};`}
    ${({ direction }) => direction && css`flex-direction: ${direction};`}
    ${({ width }) => width && css`width: ${width};`}
    flex-wrap: ${({ wrap }) => wrap || 'wrap'};
`
export const Form = styled.form`
    padding: 36px 50px;
    background-color: #fff;
    align-self: center;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`
export const Content = styled.div`
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    ${props => props.data
        ? css`
        display: flex; 
        `
        : css`
        grid-template-columns: 24% repeat(auto-fill, 24%);
        display: grid; 
        `
    }
    gap: 10px;
`
export const Text = styled.span` 
    font-size: ${({ size }) => size || '20px'};
    text-align: ${({ align }) => align || 'start'};
    /* color: ${SEGColor}; */
    color: ${({ color }) => color || SEGColor};
    margin: ${({ margin }) => margin || 'auto'};
    width: 100%;
    display: block;
    letter-spacing: -0.02em;
    font-family: ${({ font }) => font || 'PFont-Light'};
    word-break: break-word;
    ${props => props.animation && css`
    animation-name: ${FadeInLeft} ;
    margin-bottom: 0;
    animation-delay: 1s;
    `}
`
export const Card = styled.div` 
    padding: 20px;
    flex: 1 1 auto;
    min-height: 1px;
    /* flex: 0 0 23%;
    max-width: 23%; */
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
`
export const ActionName = styled.span`
    position: absolute;
    height: 20px;
    width: 100px;
    right: 35px;
    opacity: 0;
    font-family: PFont-Light;
    transition: .1s ease-in-out;
    z-index: -900;
    `
export const Click = styled.button`
    height: 100px;
    cursor: pointer;
    width: 100%;
`
export const ButtonCard = styled.button` 
    font-size: 12px;
    font-family: PFont-Light;
    cursor: pointer;
    word-break: break-word;
    box-shadow: 0px 0px 6px 0px #16101028;
    position: absolute;
    right: -50px;
    transition: .4s ease;
    width: 50px;
    height: 50px;
    top: ${({ top }) => top || '20px'};
    transition-delay: ${({ delay }) => delay || 'auto'};
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${BGColor};
    &:hover  ${ActionName} {
        opacity: 1;
        z-index: 900;
    }
    ${props => props.grid && css`
        top: ${({ top }) => top || '80px'};
        `
    }
`
export const CardCompany = styled.div` 
    flex: 1 1 auto;
    min-height: 250px;
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
    overflow: hidden;
    &:hover  ${ButtonCard} {
        right: 15px;
    }
    &#space {
        padding: 30px;
        justify-content: space-between;
    }
    ${props => props.grid && css`
    height: min-content;
    flex-direction: row;

`}
`
