import styled, { css } from 'styled-components'
import { BGColor, SECColor, SEGColor, SVColor } from '../../public/colors'

export const Span = styled.span`
    color: ${props => props.active ? '#131313' : `${SEGColor}`};
    font-size: ${({ size }) => size || '14px'};
    font-weight: 500;
    display: block;
    margin-right: 1em;
    font-family: PFont-Light;
    color: ${({ color }) => color || BGColor};
    user-select: none;
`
export const LinkOption = styled.div`
    display: block;
    text-decoration: none;
    padding: 5px 10px;
    padding-left: 10px;
    text-align: left;
    white-space: nowrap;
    margin: 0 30px;
    & > span a {
        user-select: none;
    }
`
export const SideBarLeft = styled.div`
    margin-left: ${props => props.menu ? '0' : '-100%'};
    width: 280px;
    max-width: 280px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100%;
    transition: .3s;

    @media (min-width: 1024px) {
        position: static;
        width: 100%;
        margin-left: 0;
    }
`
export const BoxSideBar = styled.aside`
    width: 100%;
    height: 100%;
    background: ${SVColor};
    padding: .8em 0;
    overflow: auto;
`
export const MenuLeft = styled.button`
    width: 100%;
    white-space: nowrap;
    height: ${({ height }) => height || 'auto'}px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border: none;
    outline: 0;
    position: relative;
    font-family: Poppins;
    background-color: transparent;
    /* background: ${SVColor}; */
    align-self: ${({ alignSelf }) => alignSelf || 'auto'};
    & > div:first-child { pointer-events: none; }
    transition: .4s;
    overflow: hidden;
    border-bottom: 1px solid ${SVColor}32;
    & a {
        color: ${props => props.active ? '#a6b0cf' : '#a6b0cf'};
    }
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 8px 30px;
    background-color: transparent;
    position: relative;
    z-index: 10;
`
export const OptionMenu = styled.div`
    width: 100%;
    display: block;
    overflow: auto;
    width: 100%;
    transform: translateY(${({ height }) => height}px);
    overflow: hidden;
    padding: 8px 0;
`
export const Box = styled.div`

`
export const BoxTitleNavBar = styled.div`
    padding: 5px 0 50px;
    text-align: center;
    width: 100%;
    background: ${SVColor};
`
export const Name = styled.h1`
    color: #FFFFFF;
    font-size: 1.25em;
    text-align: center;
`
export const Image = styled.img`
    width: 60%;
`
