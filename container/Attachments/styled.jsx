import styled, { css } from 'styled-components'
import { BGColor, SECColor, SEGColor } from '../../public/colors'

export const Container = styled.div`
    width: 100%;
    padding: 20px;
    background-color: ${BGColor};
    max-width: 100%;
    min-width: 100%;
    overflow: hidden;
    padding: 30px;
`
export const Content = styled.div`
   display: flex;
    align-items:center;
    margin: 10px 0;
    padding-left: 15px;
    ${({ column }) => column && css`
        flex-direction: column;
        justify-content:center;
        align-items:flex-start};
    `}
    justify-content: ${({ justify }) => justify || 'start'};
`
export const Text = styled.span`
    font-size: 12px;
    overflow: hidden;
    ${props => props.cursor && css`
        cursor: pointer;
    `}
    font-family: PFont-Light;

`
export const Button = styled.button`
    flex-direction: row;
    padding: ${({ padding }) => padding || '5px'};
    cursor: pointer;
    border: ${({ border }) => border ? `${`1px solid ${SEGColor}`}` : 'none'};
    border-radius: 30px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({ height }) => height || 'auto'};
    background-color: ${({ bgColor }) => bgColor || 'transparent'};
    &:disabled {
        cursor: no-drop;
    }
`
export const ContentImg = styled.div`
    width:  55%;
    height: ${({ height }) => height || 'auto'};
    cursor: pointer;
    display: flex;
    justify-content: space-around;
`
export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
`
export const FooterModal = styled.div`
    width: 100%;
    height: 40px;
    right: 0;
    background-color: ${SECColor};
    bottom: 0px;
    z-index: 999;
    display: flex;
    align-items: center;
    position: ${({ position }) => position || 'absolute'};
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`
