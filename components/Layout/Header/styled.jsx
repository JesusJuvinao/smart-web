import styled from 'styled-components'
import Link from 'next/link'
import { PColor } from '../../../public/colors'

export const ContentLink = styled.div`
    display: grid;
    place-content: center;
    align-items: center;
`
export const ContainerBurger = styled.div`
    .BurgerMenu__container {
    display: flex;
    flex-direction: column;    
    span {
      background-color: ${PColor};
      width: 30px;
      height: 2px;
      margin: 4px;
      border-radius: 1px;
      transition: all .3s ease-out;
    }
    .open:nth-child(1) {
      transform: rotate(45deg) translateY(4px) translateX(6px);

    }
    .open:nth-child(2) {
      opacity: 0;
    }
    .open:nth-child(3) {
      transform: rotate(-45deg) translateY(-7px) translateX(9px);
    }
    .close:nth-child(1) {
      transform: rotate(0) translateY(0);
    }
    .close:nth-child(2) {
      opacity: 1;
    }
    .close:nth-child(3) {
      transform: rotate(0) translateY(0);
    }
}`
export const Container = styled.div`
    display: flex;
    height: 45px;
    grid-area: head;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);

    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0px 20px;
    @media (min-width: 992px) {
    }
    `
export const NavLink = styled(Link)`
    margin-right: 30px;
    `
export const ContainerLink = styled.div`
    width: min-content;
    `
export const Button = styled.button`
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    min-width: 100px;
    font-size: 15px;
    padding: 6px;
    transition: .5s ease;
    margin-left: 5px;
    background-color: transparent;
    &:hover{
        background-color: rgba(64,87,109,.07);
    }
    @media (max-width: 960px){
        min-width: 75px;
        margin-left: 0px;
        font-size: 13px;
        font-weight: 400;
    }
    
`
