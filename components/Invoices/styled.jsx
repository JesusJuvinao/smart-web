import styled, { css } from 'styled-components'
import { BGColor, SEGColor, PVColor } from '../../public/colors'

export const Form = styled.form`
    border-radius: 8px;
    padding: 0 20px;
    padding-bottom: 200px;
    background-color: #fff;
    align-self: center;
    width: 100%;
    max-height: 100vh;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    &::-webkit-scrollbar {
    width: 5px;
    background-color: #dcdcdc;
    border-radius: 5px;
}

`
export const ContentOptions = styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    height: 60px;
    display: flex;
    left: 0;
    margin: auto;
    right: 0;
    width: 100%;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 24%);
    z-index: 10000;
    justify-content: space-between;
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
    padding: 30px;
    margin: auto;
    background-color: ${BGColor};
    border-radius: 5px;

`
export const Textarea = styled.textarea`
    height: 300px;
    width: 30%;
    max-width: 50%;
    min-width: 30%;
    min-height: 150px;
    max-height: 150px;
    border: 1px solid ${`${SEGColor}69`};
    outline: none;
    margin: 10px 5px;
    padding: 15px;
`
export const Card = styled.div`
    display: flex;
    flex-direction: column;
    ${props => props.responsive && css`
        flex-direction: row;
        flex-wrap: wrap;
    `}
    ${props => props.content && css`
    padding: 20px;
    width: ${({ width }) => width || '48%'};
    border-radius: 5px;
    border: 1px solid ${`${SEGColor}1F`};
`}
`
export const InputNanoId = styled.input`
    border: none;
    display: block;
    background-color: ${BGColor};
    outline: 0;
    border: 1px solid #CCC;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: PFont-Light;
    border-radius: 5px;
    padding: 15px 10px;
    margin: 0 5px;
    color: #757575;
    width: ${({ width }) => width || '100%'};

`
export const ContentAction = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const Button = styled.button`
    flex-direction: row;
    padding: 15px;
    cursor: pointer;
    height: ${({ height }) => height || 'auto'};
    ${props => props.design && css`
        padding: 2px 10px;
        border-radius: 10px;
        text-align: center;
        color: ${BGColor};
        display: flex;
        align-items: center;
        border: 1px solid ${BGColor};
        background-color: ${({ color }) => color || PVColor};
    `}
`
export const ContentCode = styled.div`
    display: flex;
    flex-direction: row;
    width: 33.33%;
    margin: 15px 0px;
`
export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align: start;
    margin: ${({ margin }) => margin || 'auto'};
    width: 100%;
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
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
    :hover {
        background-color: rgba(0,0,0,.075);
        :first-child {
            background-color: #fff;
        }
    }
    background-color: #fff;
`
export const ContentTableItem = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'column'};
    justify-content: center;
    align-items: baseline;
    width: 100%;
    height: 50px;
    margin: 10px 0;
    padding: ${({ padding }) => padding || '0px 0px 0px 15px'};
`
export const TableButton = styled.button`
    display:flex;
    align-items: center;
    justify-content: space-evenly;
    width: 75px;
    height: 30px;
    margin-left: 10px;
    background-color: ${({ color }) => color === 1 ? 'rgba(2, 182, 179,0.12)' : color === 2 && 'rgba(17, 148, 247,0.12)'};
    border-radius: 4px;
    border:none;
    outline: none;
    color:${({ color }) => color === 1 ? '#1db9aa' : color === 2 && 'red'};
    font-size: 12px;
    font-weight:bold;
    :hover{
        cursor:pointer;
    }
 `
