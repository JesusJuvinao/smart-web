import styled from 'styled-components'
import { BGColor } from '../../public/colors'

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;    
    display: flex;
    justify-content: center;    
    align-items: center;
    display: flex;
    z-index: 99999;
    background-color: ${BGColor};
`
