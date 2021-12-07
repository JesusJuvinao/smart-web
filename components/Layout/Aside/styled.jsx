import styled, { css } from 'styled-components'
import { BGColor, SFVColor } from '../../../public/colors'

export const ContainerAside = styled.div`
    display: none;
    height: min-content;
    margin-bottom: 20px;
    @media (min-width: 768px){ 
        display: block;
    }
`
export const LeftNav = styled.div`
    position: absolute;
    padding: 1%;
    display: grid;
    grid-template-columns: 30% repeat(auto-fill, 30%);
    z-index: 1;
    z-index: 99;
    position: fixed;
    width: 400px;
    background-color: ${BGColor};
    transition: all 200ms ease 0s;
    height: auto;
    top: 90.988px;
    left: 12px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    border-radius: 8px;
    overflow: hidden;
    place-content: center;
    gap: 10px;
    h2 {
        font-size: 13px;
        font-weight: 500;
    }
    ${({ show }) => show
        ? css`
                  visibility: visible;
                  opacity: 1;
                  transform: translateY(0);
              `
        : css`
                
                  margin: 0;
                  visibility: hidden;
                  opacity: 0;
                  transform: translateY(-50px);
              `}
`
export const ButtonGlobalCreate = styled.button`
    border-radius: 20px;
    position: relative;
    min-width: 100px;
    width: 90%;
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    border: 2px solid ${BGColor};
    color: ${BGColor};
    height: 30px;
    font-size: 12px;
    cursor: pointer;
    margin: 10px auto;
    transition: 0.2s;
    background-color: transparent; 
    &:hover {
        box-shadow: rgb(255 255 255) 0px 0px 0px 2px;
    }
    &:active{
        transform: scale(0.9);
    }
`
export const Info = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    
`
export const ContentOption = styled.div`
    min-height: 150px;
`
export const Anchor = styled.a`
    &.active {
        border-bottom: 2px solid #61d2b4;
    }
  padding: 0px;
  color: #3e3e3e;
  cursor: pointer;
  font-weight: 300;
  display: flex;
  font-size: ${({ size }) => size}px;
  transition: .5s ease;
    color: #a6b0cf;
    align-items: center;
    justify-content: flex-start;
    padding: 3px 10px;
    margin: 0;
  &:hover {
      background-color: ${`${SFVColor}69`};
  }
`

// export const Anchor = styled.a`
//     font-size: 12px;
// `
export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 300ms ease;
    min-width: ${({ collapsed }) => collapsed ? '0px' : '150px'};
    max-width: ${({ collapsed }) => collapsed ? '0px' : '150px'};
    background-color: ${({ collapsed }) => collapsed ? 'transparent' : '#393a3d'};
    height: 100vw;
`
