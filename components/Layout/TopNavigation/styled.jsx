import styled from 'styled-components'
import { BColor, BGColor } from '../../../public/colors'

export const Content = styled.nav`
    width: 100%;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    z-index: 9997;
    background-color: ${BGColor};
    flex-direction: row;
    justify-content: center;
    @media (max-width: 960px) {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 20%);
        align-items: center;
    }
    `

export const ButtonBurger = styled.li`
    margin-right: 30px;
    & > div {
        flex-direction: column;
        span {
            background-color: #0de0fe;
            width: 25px;
            height: 3px;
            margin: 4px;
            border-radius: 1px;
            transition: all 0.1s ease-out;
        }
        span:nth-child(1) {
            width: 30px;
        }
        span:nth-child(2) {
            width: 15px;
        }
        span:nth-child(3) {
            width: 30px;
        }
    }
`
export const Li = styled.ul`
    &:last-child a {
        border-bottom: none;
    }
    &:last-child {
        border-radius: 0px 0px 5px 5px;
    }
    &:first-child {
        border-radius: 5px;
    }
`
export const Button = styled.button`
    cursor: pointer;
    background-color: transparent;
    display: flex;
    justify-content: center;
    color: ${BColor};
    user-select: none;
    text-decoration: none;
    display: block;
    padding: 10px 15px;
    clear: both;
    white-space: nowrap;
    font-size: 75%;

    & > a {
        font-family: PFont-Regular;
        color: ${BColor};
        
    }
`
export const SubMenu = styled.ul`
    & > li {
        margin-left: 0px !important;
    }
`
export const HasSubMenu = styled.li`
    border-radius: 50px;
    margin-left: 20px;
    cursor: pointer;
    width: 250px;
    &:hover > ${SubMenu} {
        visibility: visible;
        opacity: 1;
        transform: translateY(0px);
        box-shadow: 0px 0px 14px #77777716;
    }
`
export const ContainerNav = styled.div`
    display: flex;
    align-items: center;
    margin: auto;
    width: 100%;
    align-self: center;
        & div li {
            display: block;
            position: relative;
        }
        & > div > li > a {
            padding: 0 !important;
        }
        & > div > li > a > i {
            font-size: 12px;
            margin-left: 3px;
        }
        & li > ul {
            border-radius: 5px;
            display: block;
            font-size: 14px;
            left: 0;
            margin: 0;
            min-width: 200px;
            opacity: 0;
            padding: 0;
            position: absolute;
            transition: all 0.3s ease;
            transform: translateY(20px);
            top: 100%;
            visibility: hidden;
            z-index: 1000;
        }
        & div > li ${SubMenu} > li ${SubMenu} {
            left: 100%;
            top: -1px;
        }
        &
            > div
            > ${HasSubMenu}
            > ${SubMenu}
            > ${HasSubMenu}
            > ${SubMenu}::before {
            top: 20px;
            margin-left: -35px;
        }

`
export const Anchor = styled.a`
    cursor: pointer;
    background-color: transparent;
    display: flex;
    justify-content: center;
    color: ${BColor};
    user-select: none;
    text-decoration: none;
    display: block;
    padding: 10px 15px;
    clear: both;
    white-space: nowrap;
    font-size: 75%;
`
