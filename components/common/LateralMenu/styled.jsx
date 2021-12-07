import styled, { css } from 'styled-components'
import { BGColor, BColor } from '../../../public/colors'
import { SideIn } from '../../animations'

export const OverLine = styled.div`
        display: ${({ show, state }) => {
        if (show && state) return 'block'
        else if (show && !state) return 'block'
        else if (!show && !state) return 'none'
    }};
    position: fixed;
    background: ${`${BColor}69`};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 800;
    opacity: 1;
`
export const Container = styled.div`
    width: 565px;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 900;
    backface-visibility: hidden;
    animation-delay: 0;
    transition: all 350ms cubic-bezier(.32,1.25,.32,1);
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    border: 1px solid #d4d7dc;
    border-radius: 4px;
    background-color: #fff;
    right: 0;
    animation-duration: .3s;
    animation-fill-mode: both;
    border-left: 1px solid #d4d7dc;
    ${({ show }) => show
        ? css`
                 animation-name: ${SideIn};
                  visibility: visible;
                  opacity: 1;
                  transform: translateY(0);
              `
        : css`
                
                  margin: 0;
                  visibility: hidden;
                  opacity: 0;
              `}

`

export const Wrapper = styled.div`
    position: relative;
    background: transparent;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SideMenu = styled.div`
    background: ${BGColor};
    height: 100vh;
`

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem .5rem;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
`

export const ModalTitle = styled.h4`
    margin: 0;
    color: #000000;
    font-size: 25px;
    font-weight: 500;
    font-family: PFont-Light;
    text-align:center;    
`
// box-shadow: 0 0 17px 0 rgb(16 40 73 / 9%);
export const BtnClose = styled.button`
    ${({ fixed }) => fixed && css`
        position: absolute;
        right: 6px;
        top: 6px;
    `}
    background-color: transparent;
    border: 0;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    z-index: 999999;
    color: #898989;
    text-shadow: 0 1px 0 #fff;
    outline: none;
    cursor: pointer;
`

export const ModalBody = styled.div`
    position: relative;
    flex: 1 1 auto;
    height: ${({ height }) => height || 'auto'};
    padding: ${({ padding }) => padding || '0'};
`

export const ModalFooter = styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    height: 40px;
    display: flex;
    left: 0;
    margin: auto;
    right: 0;
    width: 100%;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 24%);
    justify-content: space-between;
`

export const BtnConfirm = styled.button`
    outline: 0;
    position: relative;
    overflow: hidden;
    border: none;
    padding: 10px;
    width: 150px;
    font-size: 12px;
    margin: 0 20px;
    color: #FFFFFF;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
`

export const BtnCancel = styled.button`
    outline: 0;
    position: relative;
    overflow: hidden;
    border: 1px solid #CCCCCC;
    padding: 10px;
    width: 150px;
    font-size: 12px;
    margin: 0 20px;
    background-color: #F7F7F7;
    color: #393939;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
`
