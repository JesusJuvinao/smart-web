import styled, { css } from 'styled-components'
import { BGColor, SEGColor } from '../../public/colors'

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
export const Textarea = styled.textarea`
    height: 300px;
    width: 100%;
    max-width: 100%;
    min-width: 50%;
    min-height: 150px;
    max-height: 150px;
    border: 1px solid ${`${SEGColor}69`};
    outline: none;
    margin: 10px 5px;
    padding: 15px;
`
export const ContentImg = styled.div`
    width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: space-around;
`
export const CtnImg = styled.div`
    width: 50%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-self: self-end;
`
export const InputFile = styled.input`
    display: none;
`
export const Img = styled.img`
    width: 170px;
    height: 170px;
    object-fit: contain;
    border-radius: 4px;
    margin-right: 20px;
`
export const ButtonStatus = styled.button`
    background-color:#20c0f3;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: PFont-Regular;
    color: #fff;
    margin-bottom: 10px;
    padding:10px 15px;
    font-weight: 600;
    font-size: ${({ fSize }) => fSize || '13px'};
    min-width: 120px;
    width: 150px;
    margin: auto;
    display: flex;
    place-content: center;
    border-radius: 50px;
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

export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
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
