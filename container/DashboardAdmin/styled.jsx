import styled, { css, keyframes } from 'styled-components'
import { BGColor, PColor, PLVColor } from '../../public/colors'
export const SpinAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(1turn);
    }
`

export const FadeUpIn = keyframes`
    from {
        height: 0px;
    }

    to {
       height: 100px;
    }
`
export const WrapperTreeList = styled.div`
    height: auto;
    && .fade-in-up {
        animation: ${FadeUpIn} 1s forwards;
    }
    min-width: min-content;
`
export const TreeList = styled.ul`
    height: auto;
    opacity: 1;
    padding-left: 5px;
    list-style: none;
    overflow: hidden;
`
export const FolderText = styled.p`
    padding: 0;
    margin: 0;
    width: 100%;
    color: #495057;
    font-size: .8125rem;
    overflow: hidden;
    white-space: nowrap;
`

export const Container = styled.div`
    width: 100%;
    overflow: hidden;
    background-color: ${BGColor};
    position: relative;
    height: 100vh;
`
export const ContainerCard = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33%, 1fr));
    padding: 0;
    margin: 0 auto;
`
export const Card = styled.div`
    width: 50%;
    transition: 400ms ease;
    height: auto;
    max-width: 100%;
    padding: 10px;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background: ${BGColor};
    &:hover {
        box-shadow: rgba(18, 18, 19, 0.2) 0px 7px 29px 0px;
    }
`
export const Folder = styled.a`
    display: flex;
    cursor: pointer;
    outline: none;
    border: none;
    height: 22px;
    ${({ selected }) => selected && css`
        border: 2px solid ${PColor};
        border-radius: 4px;
    `}

    &&:hover > p{
        margin-left: 10px;
        transition: .14s linear;
        /* padding: 1px 2px; */
        /* border: 2px solid #ccc;
        border-radius: 4px; */
    }
`
export const ListItem = styled.li`
    position: relative;
    padding: 5px 0 5px 15px;
    box-sizing: border-box;
    min-width: 50px;
    
    &&::before {
        content: '';
        position: absolute;
        top: 15px;
        left: 0;
        width: 10px;
        height: 1px;
        background-color: ${PLVColor};
    }

    &&::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 1px;
        height: 100%;
        background-color: ${PLVColor};
    }

    &&:last-child::after {
        height: 15px;
    }
    && svg {
        color: ${PColor};
        margin-right: 3px;
    }

    && svg.spin {
        animation: ${SpinAnimation} 2s linear infinite;
    }
`
