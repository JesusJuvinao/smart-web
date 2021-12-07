import styled, { css } from 'styled-components'
import { FadeInLeft, SlideInLeft } from '../../components/animations'
import { BGColor, SEGColor } from '../../public/colors'
export const ContainerFilter = styled.div`
    display: flex;
    margin: 30px 0;
`
export const Content = styled.div`
    padding: 70px;
    height: 100%;
`
export const ContentSearch = styled.div`
    padding-top: 50px;
    display: flex;
    flex: 0 0 100%;
    flex-direction: column;
    justify-content: flex-start;
    @media only screen and (max-width: 960px){
        padding-bottom: 50px;
    }
`
export const Menu = styled.div`
    position: absolute;
    top: 100%;
    z-index: 4;
    left: 0;
    width: 200px;
    width: 320px;
    height: 300px;
    background-color: ${BGColor};
    padding: 20px;
    transform-origin: 200% 50%;
    transition: .2s ease;
    z-index: 999 !important;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  transform-origin: top left;
    ${({ showMenu }) => showMenu
        ? css`
        opacity: 1;
        transform: scale(1);
        transition-delay: 200ms;
        transition-duration: 200ms;
        display: block;
        `
        : css`
        transition: 0.1s opacity cubic-bezier(0.39, 0.575, 0.565, 1),0.55s transform cubic-bezier(0.1, 1.26, 0.83, 1);
        opacity: 0;
        transform: scale(0);
        transform-origin: 10% top;
    `}
`

export const Container = styled.div`
    width: 100%;
    overflow: hidden;
    margin: 30px 0;
    display: grid;
    /* height: 100%; */
    gap: 5px;
    ${props => props.data && css`
        grid-template-columns: repeat(auto-fill,minmax(25%, 1fr));
    `}
    @media only screen and (max-width: 960px){
    padding: 20px;
    }
`

export const Button = styled.button`
    background-color: #2A265F;
    border: 0;
    border-radius: 50px;
    box-shadow: 0 10px 10px rgb(0 0 0 / 20%);
    color: ${BGColor};
    padding: 12px 25px;
    position: absolute;
    font-size: 10px;
    padding: 11px 16px;
    bottom: 8px;
    cursor: pointer;
    right: 40px;
    letter-spacing: 1px;
`
export const Option = styled.button`
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    background-color: #fff;
    padding: 12px 0px;
    &:hover {
        background-color: #f8f8fa;
    }
`
export const CtnSearch = styled.div`
top: 0;
    left: 0;
    right: 0;
    margin: 0;
    display: flex;
    align-items: center;
    border: 1px solid ${SEGColor};
    opacity: 1;
    transition: opacity ease-in-out 300ms;
    visibility: visible;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.04);
    position: relative;
    border-radius: 5px;
    height: 56px;
`
export const SearchFilterOption = styled.div`
    opacity: 0;
    transform: scale(0);
    transform-origin: 10% top;
    transition: 0.1s opacity cubic-bezier(0.39, 0.575, 0.565, 1),0.55s transform cubic-bezier(0.1, 1.26, 0.83, 1);
    position: absolute;
    top: 100%;
    border-radius: 5px;
    margin-top: 5px;
    left: 0;
    padding: 10px;
    z-index: 99;
    width: 200px;
    background-color: ${BGColor};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`
export const Logo = styled.div`
    border-radius: 50%;
    min-height: 35px;
    max-height: 35px;
    max-width: 35px;
    position: relative;
    display: grid;
    place-content: center;
    align-items: center;
    color: ${BGColor};
    font-size: 20px;
    min-width: 35px;
    background-color: rgb(0,151,230);
    `
export const NameCompany = styled.h2`
    color: ${BGColor};
    letter-spacing: 1px;
    margin: 10px 0;
    font-size: 15px;
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
export const CardEntry = styled.div`
    ${({ active }) => active && css` background-color: ${active};` }
    height: 20px;
`
export const ButtonStatus = styled.button`
    background-color:#20c0f3;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: PFont-Regular;
    color: ${BGColor};
    margin-bottom: 10px;
    padding:10px 15px;
    font-weight: 600;
    font-size: ${({ fSize }) => fSize || '13px'};
    min-width: 120px;
    width: 150px;
    margin: 50px auto;
    display: flex;
    place-content: center;
    border-radius: 50px;
`
export const ActionName = styled.span`
    position: absolute;
    height: 20px;
    background-color: ${BGColor};
    width: 100px;
    right: 35px;
    opacity: 0;
    text-align: center;
    display: grid;
    place-content: center;
    border-radius: 30px;
    font-family: PFont-Light;
    transition: .1s ease-in-out;
    z-index: -900;
    `
export const Active = styled.div`
    position: absolute;
    left: 5px;
    top: 5px;
    z-index: 9;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    min-height: 20px;
    max-height: 20px;
    min-width: 20px;
    max-width: 20px;
    ${({ active }) => active && css` background-color: ${active};` }

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
    width: 35px;
    height: 35px;
    top: ${({ top }) => top || '20px'};
    transition-delay: ${({ delay }) => delay || 'auto'};
    max-height: 35px;
    max-width: 35px;
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
export const WrapInfo = styled.div`
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${({ width }) => width && css` width: ${width};`};
    ${({ width }) => width && css` min-width: ${width};`};
    ${({ width }) => width && css` max-width: ${width};`};
    ${({ bgColor }) => bgColor && css` background-color: ${bgColor};`};
`

export const Title = styled.div`
    opacity: 0.6;
    margin: 0;
    font-size: 12px;
    color: ${BGColor};
    letter-spacing: 1px;
    text-transform: uppercase;
`
export const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 10px 10px rgb(0 0 0 / 20%);
    background: ${BGColor};
    transition: 0.2s;
    height: 150px;
    overflow: hidden;
    transition: .2s ease-in-out;
    &:hover  ${ButtonCard} {
        right: 15px;
    }
`
export const Input = styled.input`
    outline: none;
    border: .5px solid ${`${SEGColor}87`};
    padding: 15px;
    margin: 15px 0;
`
export const Form = styled.form`
    background-color: ${BGColor};
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`
export const SearchButton = styled.button`
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-size: 16px;
    background-color: transparent;
    &:hover ${SearchFilterOption} {
        opacity: 1;
        transform: scale(1);
        transition-delay: 200ms;
        transition-duration: 200ms;
        display: block;
    }
`
export const Overline = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: transparent;
    ${props => props.show ? css`display: block` : css`display: none;`};
    @media only screen and (min-width: 960px){
    }
  
`
