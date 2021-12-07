import styled, { css } from 'styled-components'

export const HeadTitle = styled.div`
    border-top: 1px solid;
    border-bottom: 1px solid;
`
export const Section = styled.div`
    display: grid; 
    width: 100%;
    align-items: center;
    place-content: center;
    grid-template-columns: 25% repeat(auto-fill, 25%);
    ${({ borderTop }) => borderTop && css`border-top: ${borderTop};`}
    ${({ borderBottom }) => borderBottom && css`border-bottom: ${borderBottom};`}

`
export const ContentInnerDates = styled.div`
    height: fit-content;
    ${({ borderTop }) => borderTop && css`border-top: ${borderTop};`}
    ${({ borderBottom }) => borderBottom && css`border-bottom: ${borderBottom};`}
    ${({ borderLeft }) => borderLeft && css`border-left: ${borderLeft};`}
    ${({ borderRight }) => borderRight && css`border-right: ${borderRight};`}
`
export const Card = styled.div`
    width: 100%;
    padding: 0;
    display: ${({ display }) => display || 'flex'};
    height: ${({ height }) => height || 'auto'};
    ${({ justify }) => justify && css`justify-content: ${justify};`}
    ${({ direction }) => direction && css`flex-direction: ${direction};`}

    border-left: 2px solid black;
    &:first-child {
        border-left: none;
    }

`
export const Table = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    height: 30vh;
    && {
      th {
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        font-family: PFont-Regular;
    }
    td {
        text-align: left;
        min-width: 5.5rem;
        max-width: 5.5rem;
        border: 1px solid rgb(161, 162, 165);
        padding: 0.2rem;
    }
    table {
        width: 100%;
        border: 1px solid rgb(161, 162, 165);
        border-spacing: 0.25rem;
        border-collapse: collapse;
        font-size: .8rem;
        line-height: 1.5rem;
        font-weight: 400;
    }
    thead td {
        min-width: 5.5rem;
        max-width: 5.5rem;
        border: 1px solid rgb(161, 162, 165);
        padding: 10px;
        margin: 10px;
        font-size: 13px;
        font-family: PFont-Regular;
    }
}
    &::-webkit-scrollbar {
        width: 2px;
        background-color: #dcdcdc;
        border-radius: 5px;
    }

`
export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
`
export const Container = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    overflow: hidden;
    padding: 30px;
    display: grid;
    place-content: center;
    margin: 0 auto;
    position: relative;

`
export const Content = styled.div`
    position: relative;
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;
    width: 21cm;
    min-height: 29.7cm;
    padding: 1.5cm;
    margin: 1cm auto;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`
export const Button = styled.button`
    position: relative;
    padding: 15px;
    overflow: hidden;

`
