import styled, { css } from 'styled-components'
import Link from 'next/link'
import { PVColor, PColor, BGColor, SECColor } from '../../public/colors'
import { FadeOup } from '../../components/animations'

export const Container = styled.div`


    `

export const Section = styled.section`
    padding: 30px;
    max-width:${({ maxWidth }) => maxWidth || '90rem'};
    margin: 0 auto;

    `
export const Line = styled.div`
    width: 2.5rem;
    height: 0.125rem;
    background-color: #393a3d;
    border-radius: 0.0625rem;
    margin: 1.25rem 0;

`
export const ContentToggle = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
`
export const ButtonTheme = styled.div`
    width: 65px;
    min-width: 65px;
    cursor: pointer;
    height: 30px;
    background-color: ${SECColor};
    border-radius: 30px;
    position: relative;
    transition: .3s ease;
`
export const SwitchButton = styled.button`
   width: 23px;
    height: 23px;
    border-radius: 50%;
    top: 3px;
    position: absolute;
    ${({ active }) => active && css`left: ${active};`}
    transition: .3s ease;
`
export const ContentCarPrice = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* height: 70vh; */
`
export const ContentPricing = styled.div`
    max-width: 73.75rem;
    margin: 0 auto;
    padding: 1.25rem;
    position: relative;
`
export const BtnClose = styled.button`
    position: absolute;
    cursor: pointer;
    top: 0.75rem;
    right: 1.25rem;
    display: flex;
    height: 2rem;
    width: 2rem;
    padding: 0;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    outline: none;
    color: #8d9096;
    z-index: 1305;
`
export const Module = styled.div`
    padding: 2.375rem .625rem 0 2.5rem;
    & ul {
        padding: 0 0 0 1.25rem!important;
        margin: 0;
        list-style-type: disc;
    
    }
    & li {
        font-size: .9rem;
        line-height: 1.5;

        margin: 0.75rem 0;
        font-family: PFont-Light;
    
    }
`
export const ModuleInfo = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${BGColor};
    z-index: 1300;
    height: 25rem;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    ${({ show }) => show
        ? css`
                opacity: 1;
                animation: ${FadeOup} 333ms cubic-bezier(.35,0,.5,1) backwards;
                `
        : css`
                
                visibility: hidden;
                margin: 0;
                opacity: 0;
                transform: translateY(-11px);
              `}
`
export const Content = styled.div`
    display: grid;
    grid-column-gap: 1em;
    gap: 1em;
    margin: 50px 0px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    @media (max-width: 900px) {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
    
`

export const Banner = styled.div`
    background-image: linear-gradient(45deg,${PVColor},${PColor});
    display: flex;
    align-items: center;
    /* background-image: linear-gradient(45deg,#53b700,#00c1bf); */
    overflow: hidden;
    place-content: center;
    justify-content: center;
    align-content: flex-start;
    height: ${({ height }) => height};
    flex-direction: ${({ direction }) => direction || 'column'};

`
export const TabsListWrapper = styled.div`
    justify-content: center;
    display: flex;
    text-align: center;
    position: relative;
    align-items: center;
    &::before {
        content: "";
    position: absolute;
    bottom: 0px;
    width: 100%;
    border-bottom: 3px solid #f4f5f8;
  }
`
export const DivCont = styled.div`
    max-width: 90rem;
    margin: ${({ margin }) => margin || 'auto'};
    position: relative;
    background-color: ${({ bgColor }) => bgColor || '#fff'};
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    display: ${({ display }) => display || 'flex'};
    min-height: auto;
    border: ${({ border }) => border || 'none'};
    border-color: ${({ borderColor }) => borderColor};
    justify-content: ${({ jContent }) => jContent};
    height: ${({ height }) => height};
    border-top: ${({ borderTop }) => borderTop};
    border-bottom: ${({ borderBottom }) => borderBottom};
    border-left: ${({ borderLeft }) => borderLeft};    
    border-right: ${({ borderRight }) => borderRight};
    color: ${({ color }) => color};

`
export const DivInt = styled.div`
    padding: ${({ padding }) => padding};
    color: ${({ color }) => color};
    width: 100%;
    flex-wrap: wrap;
    text-align: left;
    display: ${({ display }) => display || 'flex'};
    align-items: ${({ alignItems }) => alignItems || 'center'};
`

export const BtnItem = styled.button`
    outline: none;
    border: none;
    background: none!important;
    font-family: PFont-Light;
    padding: 0!important;
    color: inherit;
    line-height: inherit;
    padding-left: 0.5rem;
    padding-right: 0.625rem;
    position: relative;
    text-align: left;
    position: relative;
    font-size: 14px ;
    &:hover {
        text-decoration: underline;
        cursor: pointer;     
    }
`
export const FeatureItem = styled.div`
    display: flex;
    align-items: flex-start;
    padding-top: 0.5rem;
    cursor: default;
    width: fit-content;
    /* flex-direction: column; */
    padding-top: 0.5rem;
` 

export const Text = styled.span`
    font-weight: ${({ bold }) => bold || 'initial'};
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: ${({ display }) => display || 'flex'};
    font-family: ${({ font }) => font || 'PFont-Regular'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
    color: ${({ color }) => color};

`
export const Paragraph = styled.p`
    font-weight: ${({ bold }) => bold || 'initial'};
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: ${({ display }) => display || 'flex'};
    font-family: ${({ font }) => font || 'PFont-Regular'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}

    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
    color: ${({ color }) => color};
`
export const TextA = styled(Link)`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: ${({ display }) => display || 'flex'};
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
    color: ${({ color }) => color};
`
export const Div = styled.div`
    flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
    margin: ${({ margin }) => margin || 'auto'};
`
export const Pricing = styled.span`
   position: relative;
    color: #6b6c72;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.5;
    width: 100%;
    font-family: PFont-Light;
    margin-bottom: 1.25rem;
    position: relative;
`
export const ContentPrice = styled.div`
font-weight: bold;
   position: relative;
    & #number {
        position: absolute;
        top: 1.0625rem;
        right: 64px;
    }
    & #letters {
        position: absolute;
        top: 2.1rem;
        right: 43px;
    }
`
export const Card = styled.div`
    display: ${({ display }) => display || 'flex'};
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    justify-content: ${({ justify }) => justify || 'space-between'};
    flex-wrap: ${({ wrap }) => wrap || 'wrap'};
    margin: ${({ margin }) => margin || '30px 0px 0px 0px'};
    border: ${({ border }) => border || 'none'};
    padding: ${({ padding }) => padding || '0'};
    background-color: ${({ bgColor }) => bgColor || BGColor};
    min-width:${({ minWidth }) => minWidth || 'auto'};
    max-width:${({ maxWidth }) => maxWidth || 'auto'};
    min-height:${({ minHeight }) => minHeight || 'auto'};
    height:${({ height }) => height || 'auto'};
    ${({ shadow }) => shadow && css`box-shadow: ${shadow};`}
    ${({ alignContent }) => alignContent && css`align-content: ${alignContent};`}
    ${({ radius }) => radius && css`border-radius: ${radius};`}
    /* flex-flow: column; */
    width:${({ width }) => width || 'auto'};
    ${({ media }) => media && css`
        @media (max-width: 900px) {
            width: 47%;
            
        }
    
    ;`}
`
export const CardShadow = styled.div`
    width: ${({ width }) => width};
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    justify-content: ${({ justify }) => justify || 'start'};
    flex-wrap: ${({ wrap }) => wrap || 'wrap'};
    margin: ${({ margin }) => margin || '30px 0px 0px 0px'};
    border: ${({ border }) => border || 'none'};
    padding: ${({ padding }) => padding || '0'};
    justify-content:${({ justifyContent }) => justifyContent || 'center'};
    box-shadow: 0 0.125rem 0.5rem 0 rgb(0 0 0 / 20%);
    min-width:${({ minWidth }) => minWidth || 'auto'};
`