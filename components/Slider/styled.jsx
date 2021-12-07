import styled, { css } from 'styled-components'

export const Item = styled.div`
`

export const CurrentItem = styled.div`
    width: 21px;
    height: 7px;
    margin: 5px;
    cursor: pointer;
    background-color: ${({ current }) => current ? '#0de0fe' : '#C0C0C0'};

`
export const Arrow = styled.button`
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    outline:none;
    border:none;
    cursor:pointer;
    box-shadow:1px 6px 14px rgb(0 0 0 / 20%);
    color:black;
    border-radius: 50%;
    transition: .3s;
    &:hover{
    }
    ${({ left, right }) => left ? css`left: 20px;` : right && css`right: 20px;`};
`
export const Container = styled.div`
    position: relative;

`
