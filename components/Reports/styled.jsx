
import styled from 'styled-components'
import { BGColor, TBGAColor, TBGVColor, TBGBColor, TBGSColor, TBGEColor, TBGRColor, TBGDColor } from '../../public/colors'

export const Container = styled.div`
    width: 100%;
    /* display: grid; */
    /* grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    grid-auto-rows: 100px; */
    background-color: ${BGColor};
    padding: 30px;
    position: relative;
    
    `

export const Content = styled.div`
    position: relative;
    padding: 15px;
    overflow: hidden;

`

export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    text-align: center;
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
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
