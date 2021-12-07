import React from 'react'
import styled from 'styled-components'
import { BColor, BGColor, PColor } from '../public/colors'
import { ButtonHook } from '../components/ButtonHook'

// pages/404.js
export default function Custom404 () {
    return <div>
        <Container>
            <Content>
                <Text>Page doesnt exist - try something else</Text>
                <ButtonHook radius='5px' padding='20px' BgColor={PColor} ><h1 to='/'>Regresar a inicio</h1></ButtonHook>
            </Content>
            <Content width='70%'>
                <Text>Error - Page not found</Text>
            </Content>
        </Container>
    </div>
}
const Container = styled.div`
  position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999;
    height: 100vh;
    width: 100%;
    background-color: ${ BGColor };
    height: 100vh;
    max-width: 100vw !important;
    display: flex;
    padding: 70px;
    margin: auto;
 
`
const Content = styled.div`
    flex-wrap: wrap;
    width: 100%;
    @media only screen and (min-width: 960px){
    width: ${ ({ width }) => width || '30%' } ;
    }
`
const Text = styled.p`
    color: ${ BColor };
    background-color: ${ BGColor };
    font-size: 1.625rem;
    line-height: 35px;
    margin: 30px 0px;

`
