import styled from 'styled-components'

export const Container = styled.div`
    padding: 30px;
`
export const Text = styled.h3`
    z-index: 9;
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Light'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || 'auto'};
    text-overflow: ellipsis;
    @media (max-width: 600px) {
        font-size: 12px;
    }
`
