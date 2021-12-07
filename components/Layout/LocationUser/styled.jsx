import styled, { css } from 'styled-components'

export const DeliveryInputWrapper = styled.div`
     box-sizing: border-box;
     display: flex;
     flex-direction: column;
    cursor: pointer;
`
export const Text = styled.i`
    font-size: 0.75rem;
    height: 12px;
    color: #a6a5a5;
    text-transform: uppercase;
    text-align: center;
    ${props => props.bold && css`  
    text-overflow: ellipsis;
    font-size:  0.75rem;
    color: #3e3e3e;
    display: flex;
    align-items: center;
    font-weight: 300;
    text-align: left;
    line-break: anywhere;
    justify-content: center;
    align-items: center;
    ;`}
`
export const Button = styled.button`
    display: flex;
    justify-content: center;
    background-color: transparent;
    flex-direction: column;
    color: #000;
    width: 50%;
    font-size: 11px !important;
    text-align: center;
    font-family: PFont-Light !important;
    align-items: center;
    margin: auto;
    cursor: pointer;
`

export const ContainerTask = styled.div`
    position: relative;
    display: flex;
    flex-direction: space-between;
    border-radius: 8px;
    border: 1px solid #e9e9e9;
    width: 100%;
    padding: 15px;
    background: transparent;
    overflow: hidden;
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
    margin: 10px;
    justify-content: center;
    display: flex;
    align-items: center;
    height: 60px;
    &:hover{
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
        border-color: transparent;
    }
    ${({ show }) => show &&
        css`
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
        border-color: transparent;
        
    `}
    
`
export const OptionsFunction = styled.div`
    position: absolute;
    display: grid;
    transition: all 200ms ease-in-out;
    display: flex;
  ${({ show }) => show
        ? css`
                  visibility: visible;
                  opacity: 1;
                  transform: translateX(0);
              `
        : css`
                
                  margin: 0;
                  visibility: hidden;
                  opacity: 0;
                  transform: translateX(-50px);
              `}
    @media only screen and (min-width: 960px){
    }
`
export const ListTask = styled.div`
    transition: all 200ms ease-in-out;
    display: flex;
    margin-left: 200px;
    justify-content: center;
    align-items: center;
    font-size: 16px !important;
    font-family: PFont-Light;
  ${({ show }) => show
        ? css`
        margin-left: 200px;
        `
        : css`
                
                margin-left: 30px;
              `}
    @media only screen and (min-width: 960px){
    }
`
export const ContainInput = styled.div`
    display: flex;
    flex-direction: space-between;
    border-radius: 8px;
    width: 100%;
    min-height: 40px;
    padding: 15px;
    background: transparent;
    overflow: hidden;
    text-decoration: none;
    height: auto;
    opacity: 1;
    cursor: pointer;
    margin: 20px;
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
        border-color: transparent;
    
`
export const Input = styled.input`
    padding: 10px;
    outline: none;
    border: 1px solid #dcdcdc;
    font-family: PFont-Light;
`
export const Title = styled.h2`
    color: #3e3e3e;
    font-size: 1.125rem;
    line-height: 22px;
    text-align: center;
    font-family: PFont-Light;
`
