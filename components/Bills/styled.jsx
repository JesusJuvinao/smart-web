/* eslint-disable no-tabs */
import styled, { css } from 'styled-components'
import { BGColor, SEGColor, TBGAColor, TBGVColor, TBGBColor, TBGSColor, TBGEColor, TBGRColor, TBGDColor, PColor, EColor, SECColor, PVColor, BColor, SFVColor } from '../../public/colors'
import { FadeOutLeftBig, SlideInLeft } from '../animations'

export const Header = styled.div`
    width: 100%;
    height: 40px;
    padding: 0px 30px;
    position: absolute;
    right: 0;
    top: 0px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${BGColor};
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`
export const FooterModal = styled.div`
    width: 100%;
    height: 40px;
    right: 0;
    background-color: ${SECColor};
    bottom: -1px;
    z-index: 999;
    display: flex;
    align-items: center;
    position: ${({ position }) => position || 'absolute'};
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`
export const ModalBody = styled.form`
    overflow-y: auto;
    min-height: 100vh;
    max-height: 100vh;
    background-color: ${BGColor};
`
export const ModalLateral = styled.div`
    background-color: ${BGColor};
    cursor: pointer;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all 200ms ease-in-out;
    position: fixed;
    z-index: 100;
    margin: auto;
    padding-top: 40px;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  ${({ show }) => show
        ? css`
       animation: ${SlideInLeft} .3s linear forwards;
       `
        : css`
        animation: ${FadeOutLeftBig} .3s linear forwards;                
              `}
`
export const Form = styled.form`
    border-radius: 8px;
    padding: 0 20px;
    transition: all 200ms ease-in-out;
    padding-bottom: 200px;
    background-color: #fff;
    align-self: center;
    width: 100%;
    max-height: 100vh;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    position: relative;
    ${({ width }) => width
        ? css`
                  width: 80%;
                  `
        : css`
                
                width: 100%;
              `}

`
export const Container = styled.div`
    width: 100%;
    background-color: ${BGColor};
    overflow: hidden;
    padding: 30px;
    position: relative;
    `
export const CustomTable = styled.div`
        overflow-y: auto;
        min-height: 10vh;
        margin-bottom: 200px;
        table{
            min-height: 10px;
            margin-bottom: 200px;
        }
    && {
        thead {
            padding: 10px;
        }
        thead th {
            padding: 10px;
            margin: 10px;
            font-size: 13px;
            font-family: PFont-Regular;
        }
        th,
        td {
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            width: -webkit-fill-available;
            border-collapse: collapse;
            letter-spacing: 1px;
            border-left: 1px dotted #c7c7c7;
            border-right: 1px dotted #c7c7c7;
        }
        th,
        td,
        th {
            text-align: center;
            max-width: 80px;
        }
        th:first-child {
            width: 40px;
            max-width: 40px;
            min-width: 40px;
        }
        td:last-child {
            text-align: center;
        }
        table {
            width: 100%;
        }
    }
    
    /* tr:nth-of-type(odd) {
      background-color: #efefef;
    } */
    `
export const BtnMore = styled.button`
    bottom: 0;
    top: 0px;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    position: absolute;
  ${({ show }) => show
        ? css`
                  visibility: visible;
                  opacity: 1;
                  transform: translateX(-11px);
              `
        : css`
                
                  margin: 0;
                  visibility: hidden;
                  opacity: 0;
                  transform: translateX(-50px);
              `}
`
export const Td = styled.td`
    position: relative;
    font-size: 12px;
    `
export const Content = styled.div`
    position: relative;
    padding: 10px 0px;

`

export const Card = styled.div`
    display: flex;
    flex-direction: row;
    padding: ${({ padding }) => padding || '0'};
    justify-content: ${({ justify }) => justify || 'space-between'};
    width: ${({ width }) => width || '100%'};
    border: ${({ border }) => border || 'none'};
    flex-wrap: ${({ wrap }) => wrap || 'wrap'};
    margin: ${({ margin }) => margin || '30px 0px 0px 0px'};
    ${props => props.responsive && css`
        flex-direction: row;
        @media (max-width: 769px) {
            flex-direction: column;

            & > div {
               
                @media (max-width: 769px) {
                width: 100%;
                margin-top:15px;
                
                }
            }
        }
    `}
`
export const Select = styled.select`
    padding: 10px;
    color: #272323;
    margin: 15px 0px;
    outline: 0;
    border: 1px solid #ccc;
    font-weight: 600;
    font-size: 13px;
    width: 150px;
    line-height: 32px;
    padding: 10 38px 0 8px;
    border-radius: 0px;
    & > option {
            padding: 10 38px 0 8px;
            border-radius: 0px;
    }
`
export const ContentAction = styled.div`
    width: ${({ width }) => width || '100%'};
    display: flex;
    flex-direction: row;
    justify-content: ${({ direction }) => direction || 'flex-end'};
    margin-top: 10px;
    

`
export const Button = styled.button`
    flex-direction: row;
    position: relative;
    padding: ${({ padding }) => padding || '5px'};
    display: ${({ display }) => display || 'flex'};
    cursor: pointer;
    border: ${({ border }) => border ? `${`1px solid ${SEGColor}`}` : 'none'};
    border-radius: ${({ radius }) => radius || '30px'};
    font-size: 16px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    height: ${({ height }) => height || 'auto'};
    color: ${({ color }) => color || BColor};
    width: ${({ width }) => width || 'auto'};
    background-color: ${({ bgColor }) => bgColor || 'transparent'};
    &:disabled {
        cursor: no-drop;
    }
    .link {
        color: ${PVColor};
    }
    .link:hover {
        text-decoration: underline;
    }
`
export const ComponentLinkMinio = styled.div`
    color: ${PVColor};
    font-size: 12px;
    .link:hover {
    }
    &:hover{
        text-decoration: underline;
    }
`
export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || 'auto'};
    text-overflow: ellipsis;
`
export const LinkFile = styled.span`
    color: ${PVColor};
    width: auto;
    cursor: pointer;
    font-size: 11px;
    &:hover {
        text-decoration: underline;
    }
`
export const Tooltip = styled.div`
    bottom: 0;
    top: 0px;
    cursor: pointer;
    left: -30px;
    height: 100px;
    z-index: 99999;
    width: 100px;
    background-color: ${BGColor};
    transition: all 200ms ease-in-out;
    padding: 5px;
    box-shadow: rgba(10, 10, 10, 0.445) 0px 4px 12px;
    position: absolute;
  ${({ showTooltip }) => showTooltip
        ? css`
                  visibility: visible;
                  opacity: 1;
                  transform: translateY(-115px);
              `
        : css`
                
                  margin: 0;
                  visibility: hidden;
                  opacity: 0;
                  transform: translateY(-50px);
              `}
              li {
                padding: 2px;
            }
              li:hover {
                    background-color: rgb(44, 160, 28);
                    color: ${BGColor};
                }
    `
export const ContentList = styled.div`
        overflow-y: auto;
        max-height: 100%;
        @media (max-width: 1199px) {
        overflow-y: scroll;
        position: relative;
    }  
`
export const Section = styled.div`
    display: grid;
    grid-template-columns: ${({ columnWidth }) => columnWidth ? columnWidth?.map(x => `${x?.width} `) : '1fr'}; 
    height: auto;
    margin: 0 auto;
    border-bottom: 1px solid #f0f0f0;
    background-color: ${({ bgRow }) => bgRow === 1 ? `${TBGAColor}` : bgRow === 2 ? `${TBGVColor}` : bgRow === 3 ? `${TBGBColor}` : bgRow === 4 ? `${TBGSColor}` : bgRow === 5 ? TBGAColor : bgRow === 6 ? TBGEColor : bgRow === 7 ? TBGRColor : bgRow === 8 && TBGDColor};
    :hover {
        background-color: rgba(0,0,0,.075);
        :first-child {
            background-color: #fff;
        }
    }
`

export const ContentTableItem = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'column'};
    align-items: center;
    place-content: center;
    &:first-child{
        cursor: grab;
    }
`
export const TableButton = styled.button`
    display: block;
    align-items: center;
    justify-content: space-evenly;
    margin-left: 10px;
    background-color: ${({ color }) => color === 1 ? 'rgba(2, 182, 179,0.12)' : color === 2 && 'rgba(17, 148, 247,0.12)'};
    border-radius: 4px;
    border:none;
    outline: none;
    color:${({ color }) => color === 1 ? '#1db9aa' : color === 2 ? 'red' : color || null};
    font-size: 12px;
    font-weight:bold;
    :hover{
        cursor:pointer;
    }
 `

export const Box = styled.div`
    display: block;
    flex-direction: ${({ direction }) => direction || 'row'};
    position: relative;
    box-sizing: border-box;
    margin: 10px 5px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    ${props => props.block && css`
        background-color: ${SFVColor};
        cursor: no-drop;
    `}
 
`
