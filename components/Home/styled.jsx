import styled from 'styled-components'
import { BGColor } from '../../public/colors'

export const Content = styled.div`
    @media (min-width: 768px){
        display: flex;
        position: relative;
        flex-direction: column;
        height: auto;
    }

`
export const Title = styled.h1`
    color: ${BGColor};
    z-index: 99;
    text-align: center;
    @media (min-width: 768px){
    font-weight: 700;
    line-height: 1.3;
    font-family: PFont-Bold;
    z-index: 9;
    font-size: 2.8rem
    }

`
export const Section = styled.section`
  display: flex;
  position: relative;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  border-radius: 5px;
  flex-direction: column;
  height: 344px;
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
  width: 70%;
  background-image: url('./images/company-finance.jpg') ;
  &&:before {
      content: "";
      position: absolute;
      left: 0; right: 0;
      top: 0; bottom: 0;
      background-color: #0000005a;
    }
    @media(max-width: 960px){
      width: 85%;
  
  }
`
export const Promo = styled.section`
    background-image: linear-gradient(45deg,#53b700,#00c1bf);
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    align-content: flex-start;
    height: 5rem;

`
export const DivCont = styled.div`
    width: 100%;
    border: solid 1px;
    height: 200px;
    max-width: 90rem;
    margin: 0 auto;
    position: relative;
    background-color: #fff;
    flex-direction: row;
    display: flex;
    min-height: auto;

`
export const DivInt = styled.div`
    padding: 0 2.5rem;
    color: #393a3d;
    flex: 1;
    text-align: left;
    display: flex;
    align-items: center;

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

export const Card = styled.div`
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    justify-content: ${({ justify }) => justify || 'space-between'};
    flex-wrap: ${({ wrap }) => wrap || 'wrap'};
    margin: ${({ margin }) => margin || '30px 0px 0px 0px'};
`
