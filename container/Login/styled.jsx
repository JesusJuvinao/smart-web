import styled from 'styled-components'
import { PColor, SECColor, PVColor } from '../../public/colors'

export const Form = styled.form`
    display: flex;
    width: ${({ width }) => width || '350px'};
    margin: ${({ margin }) => margin || '80px auto'};
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    border: solid 1px #d4d7dc;
    border-radius: 8px;
    padding: 20px 30px;
    place-content: center;
    height: min-content;
    transform: translateX(0%);
    transition: opacity ease 300ms;
    flex-direction: column;
    background-color: ${({ bgColor }) => bgColor || 'white'};
    #title {
        text-align: center;
        justify-content: center;
    }
    #Subtitle {
        text-align: center;
        justify-content: center;
        margin-bottom: 30px;
    }
`
export const Container = styled.div`
    min-width:500px;
    height: 100vh;
    position: relative;
    z-index: 999;
    overflow: hidden;
    @media only screen and (max-width: 960px) {
       margin-top: -46px;
       
    }
`
export const Anchor = styled.span`
        &.active {
        border-bottom: 2px solid #61d2b4;
    }
    padding: 0px;
    color: ${PVColor};
    cursor: pointer;
    font-weight: 300;
    display: flex;
    font-size: ${({ size }) => size}px;
    transition: .5s ease;
    justify-content: flex-start;
    padding: 3px 10px;
    margin: 0;
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
export const Figure = styled.div`
justify-content: center;
transition: 500ms;
width: 50%;
display: flex;
@media only screen and (min-width: 960px) {
    .authentication__illustration:before {
    right: 0;
    bottom: unset;
    left: auto;
    min-width: 180vh;
    min-height: 175vh;
    max-width: 120vw;
    max-height: 80vw;
    width: 100vw;
    height: 80vw;
    transform: translate(15vw, -23%);
}
}
.authentication__illustration:before {
    content: '';
    min-width: 150vh;
    min-height: 155vh;
    max-width: 80vw;
    max-height: 80vw;
    width: 80vw;
    height: 80vw;
    z-index: -1;
    position: absolute;
    background-color: ${PColor};
    border-radius: 0 100% 100%;
    left: 27%;
    top: 0%;
    margin: auto;
    transform: translate(-50%, 0);
    bottom: 0%;
    @media only screen and (max-width: 960px) {
        content: '';
    left: 50%;
    bottom: 130%;
    }
    }
`
export const Text = styled.span`
    font-size: ${({ size }) => size || '20px'};
    text-align: center;
    width: 100%;
    display: flex;
    margin-top: 20px;
    font-family: PFont-Light;
    word-break: break-word;
`
export const FooterComponent = styled.footer`
    position: fixed;
    bottom: 0;
    height: 150px;
    display: flex;
    left: 0;
    align-items: center;
    margin: auto;
    right: 0;
    width: 100%;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 24%);
    z-index: 80;
    justify-content: center;
    background-color: ${SECColor};
`
