import styled from 'styled-components'
import { BColor, BGColor, SECColor, SEGColor } from '../../public/colors'

export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    text-align: center;
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
`
export const Container = styled.div`
    width: 100%;
    overflow: hidden;
    background-color: ${BGColor};
    position: relative;
`
export const Header = styled.div`
    flex: 1 1 0%;
    background-color: rgb(97, 218, 251);
    padding: 10px;
    display: flex;
    max-height: 70px;

`
export const Content = styled.div`
    position: relative;
    height: 100vh;
    overflow: hidden;

`

export const Button = styled.button`
    flex: 1 1 0%;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    border: 0px;
    max-width: 150px;
    cursor: pointer;
`
export const ContainerCard = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33.33%, 1fr));
    gap: 2rem;
    padding: 0;
    list-style-type: none;
    max-width: 1024px;
    margin: 0 auto;
`
export const Card = styled.div`
    width: 100%;
    transition: 400ms;
    height: 400px;
    max-width: 100%;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background: ${BGColor};
    &:hover {
        transform: translate(-20px, -40px) rotate(-15deg) scale(1.4);
    }
`
export const FooterModal = styled.div`
    width: 100%;
    height: 40px;
    right: 0;
    background-color: ${SECColor};
    bottom: 32px;
    z-index: 999;
    display: flex;
    align-items: center;
    position: ${({ position }) => position || 'absolute'};
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`
