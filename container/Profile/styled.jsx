import { BGColor, PColor } from '@/public/colors'
import styled, { css } from 'styled-components'
export const Container = styled.div`
    width: 100%;
    background-color: #f8f8fa;

`
export const ContentInfo = styled.div`
    display: grid;
    grid-template-columns: 30% repeat(auto-fill, 30%) 30%;
    gap: ${({ gap }) => gap || '60px'};   
    justify-content: space-between;
`

export const CardPrimary = styled.div`
    background-color: ${({ bgColor }) => bgColor || BGColor};
    padding: ${({ padding }) => padding || '0'};
    display: ${({ display }) => display || 'flex'};
    flex-direction: ${({ direction }) => direction || 'column'};
    display: flex;
    position: relative;
    width: 100%;
    `
export const Card = styled.div`
    width: ${({ width }) => width || '50%'};
    padding: ${({ padding }) => padding || '0'};
    height: min-content;
    position: sticky;
    top: 0px;
    
    @media(min-width: 768px){
        width: 100%;
    }
    @media(max-width: 960px){
        width: 100%;
    } 
`
export const Form = styled.form`
   width: 100%;
    height: 100vh;
    overflow-y: auto;
`
export const Content = styled.div`
    width: 100%;
    margin: auto;
    padding: 40px;
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
    display: grid; 
    gap: 10px;
`
export const Text = styled.span`
    font-size: ${({ size }) => size || '20px'};
    margin: ${({ margin }) => margin || '5px'};
    text-align: start;
    font-family: PFont-Light;
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
export const ImgUser = styled.img`
    width: 100%;
    margin: auto;
    border: none;
    outline: none;
    height: 400px;
    object-fit: contain;
    border: 1px solid #ccc;
`

export const Avatar = styled.img`
    height: 4rem;
    width: 4rem;
    min-height: 4rem;
    max-height: 4rem;
    min-width: 4rem;
    max-width: 4rem;
    position: absolute;
    top: -28px;
    left: 10%;
    object-fit: contain;
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
