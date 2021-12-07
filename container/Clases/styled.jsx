import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'

export const Form = styled.form`
    padding: 36px 50px;
    background-color: #fff;
    align-self: center;
    width: 100%;
`
export const Section = styled.div`
    display: grid;
    grid-template-columns: repeat(${({ n }) => n || 5}, 1fr); 
    width: 100%;
    height: auto;
    margin: 0 auto;
    border: 1px solid #f0f0f0;
    border-bottom: none;
    :last-child {
        border-bottom: 1px solid #f0f0f0; 
    }
    background-color: #fff;
`
export const Container = styled.div`
     width: 100%;
    background-color: #f8f8fa;
    max-width: 100%;
    min-width: 100%;
    overflow: hidden;
    padding: 30px;
`

export const Content = styled.div`
    padding: 20px 0px;
    margin: auto;
    background-color: ${BGColor};
    border-radius: 5px;
    ${props => props.center && css`
    display: grid;
    place-content: center;
    `}
`
export const Avatar = styled.span`
    height: 3rem;
    width: 3rem;
    min-height: 3rem;
    max-height: 3rem;
    min-width: 3rem;
    max-width: 3rem;
    position: absolute;
    top: -28px;
    left: 10%;
    border-radius: 50%;
    background-color: ${PColor};
    border: 3px solid ${BGColor};
`
export const CtnIcon = styled.span`
    height: 2rem;
    width: 2rem;
    min-height: 2rem;
    max-height: 2rem;
    min-width: 2rem;
    max-width: 2rem;
    border-radius: 50%;
    background-color: ${PColor};
    border: 3px solid ${BGColor};
`
export const Title = styled.span` 
    font-size: 20px;
    text-align: center;
    width: 100%;
    background-color: #61d2b4;
    padding: 5px 0px 5px 0px;
    font-family: PFont-Light;
    word-break: break-word;
    display: inline-grid;
    color: #ffffff;
`

export const Select = styled.select` 
    font-size: 20px;
    text-align: center;
    width: 100%;
    padding: 5px 0px 5px 0px;
    font-family: PFont-Light;
    word-break: break-word;
    display: inline-grid;
`

export const Text = styled.span` 
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    width: 100%;
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
`

export const ContentTerms = styled.div`
    display: grid; 
    width: 100%;
    align-items: center;
    grid-template-columns: 10% repeat(auto-fill, 90%) 90%;
`
export const Img = styled.img`
    width: 100px;
    margin: auto;
    border: none;
    outline: none;
    height: 100px;
    object-fit: contain;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-bottom: 20px;
`
export const ContentInfo = styled.div`
    position: relative;
    width: min-content;
    margin: auto;
`
export const Info = styled.span`
    top: -35px;
    font-family: PFont-Light;
    padding: 5px;
    font-size: 12px;
    overflow: hidden;
    width: 100px;
    border-radius: 5px;
    position: absolute;
    left: 23px;
    border: 1px solid #eee;
    z-index: -999;
    transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
    background-color: ${BGColor};
    opacity: 0;
`
export const Tooltip = styled.div`
    top: -0px;
    width: min-content;
    position: absolute;
    right: -20px;
    &:hover >  ${Info}  {
        z-index: 9999;
        opacity: 1;
    }
`
export const InputDate = styled.input`
    outline: none;
    border: 1px solid #eee;
    padding: 20px ;
    width: 91.9%;
    border-radius: 5px;
    margin: auto;
    ${props => props.img && css`
        display: none;
    `}
`
export const ContentTableItem = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'column'};
    justify-content: center;
    align-items: baseline;
    width: 100%;
    height: 15px;
    margin: 0px 0;
    padding: ${({ padding }) => padding || '0px 0px 0px 15px'};
`
export const TableButton = styled.button`
    display:flex;
    padding:5px;
    align-items: center;
    justify-content: space-evenly;
    margin-left: 10px;
    background-color: ${({ backgroundColor }) => backgroundColor};
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
export const Button = styled.button`
 position: relative;
 padding: 15px;
 overflow: hidden;

`

