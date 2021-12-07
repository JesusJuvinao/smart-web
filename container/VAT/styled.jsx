import styled from 'styled-components'

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
export const Container = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    overflow: hidden;
    padding: 30px;
    position: relative;

`
export const Content = styled.div`
    position: relative;
    padding: 15px;
    overflow: hidden;

`
export const Button = styled.button`
    position: relative;
    padding: 15px;
    overflow: hidden;

`
