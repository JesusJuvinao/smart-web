import { BGColor } from '@/public/colors'
import styled, { css, keyframes } from 'styled-components'

export const Container = styled.div`
    padding: 30px;

    
    `
export const Content = styled.div`
    align-items: center;
    width: 100%;
    margin: auto;
    position: relative;
    height: 100%;
    overflow: hidden;
    transition: 400ms;
    place-content: center;
    gap: 10px;
    display: grid;
    grid-template-columns: 24% repeat(auto-fill, 24%) 24%;
    background-color: ${BGColor};
    @media (max-width: 600px) {
        grid-template-columns: 50% repeat(auto-fill, 50%) 50%;
    }
    `
export const WrapperCard = styled.div`
    overflow: hidden;
    background-color: ${BGColor};
    margin: 30px 0;
    padding: 30px;
    position: relative;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border: .5px solid rgba(100, 100, 111, 0.2);
    border-radius: .5px ;
    width: 100%;
    margin-bottom: 1rem;
    height: ${({ height }) => height || '100%'};
    &:before {
        box-shadow: 0 1rem 1rem rgb(98 104 116 / 1%), 0 0.5rem 0.5rem rgb(98 104 116 / 2%), 0 0.25rem 0.25rem rgb(98 104 116 / 4%), 0 0.125rem 0.125rem rgb(98 104 116 / 6%);
    }
    `
export const Figure = styled.div`
    transform: rotate(-45deg) translateZ(0);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-image: linear-gradient(45deg,#53b700,#00c1bf);
    transition: transform .5s cubic-bezier(0,0,.1,1),-webkit-transform .5s cubic-bezier(0,0,.1,1);
    border-radius: 4.5rem;
    width: 34.375rem;
    height: 7rem;
`
export const Block = styled.div`
    display: ${({ display }) => display || 'flex'};
    align-items: center;
    justify-content: space-between;
`
export const Span = styled.span`
    font-size: ${({ size }) => size || '12px'};
    font-weight: 300;
    z-index: 9;
    line-height: 1.4;
    `
export const Text = styled.h3`
    z-index: 9;
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Light'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || 'auto'};
    text-overflow: ellipsis;
    @media (max-width: 600px) {
        font-size: 12px;
    }
`
export const HeroTitle = styled.h1`
    letter-spacing: -2px;
    line-height: 64px;
    font-size: 60px;
    font-weight: 700;
`
export const Button = styled.button`
    background-image: linear-gradient(45deg,#53b700,#00c1bf);
    border: 0;
    border-radius: 50px;
    box-shadow: 0 10px 10px rgb(0 0 0 / 20%);
    color: ${BGColor};
    padding: 12px 25px;
    position: absolute;
    font-size: 10px;
    padding: 11px 16px;
    z-index: 99;
    bottom: 8px;
    cursor: pointer;
    right: 5px;
    letter-spacing: 1px;
`