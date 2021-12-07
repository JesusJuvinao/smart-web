import styled from 'styled-components'

export const Form = styled.form`
    width: 400px;
    box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    border-radius: 8px;
    padding: 36px 50px;
    background-color: #fff;
    align-self: center;
`
export const Container = styled.div`
 
`
export const Logo = styled.div`
transition: 500ms;
left: 35px;
position: absolute;
top: 15px;
width: min-content;
@media only screen and (max-width: 960px) {
    height: min-content;
    left: inherit;
    top: inherit;
    position: inherit;
    display: flex;
    justify-content: center;
    }
`

export const Text = styled.span`
    font-size: ${({ size }) => size || '20px'};
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-family: PFont-Light;
    word-break: break-word;
`
