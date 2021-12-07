import styled, { css } from 'styled-components'
import { BGColor, SEGColor } from '../../public/colors'

export const BreadcrumbBar = styled.div`
    display: flex;
    margin: auto;
    padding: 10px 0px;
    align-items: center;
    background-color: ${BGColor};
    padding: 10px 15px;
`

export const Li = styled.li`
    display: flex;
    text-decoration: none;
`

export const Anchor = styled.a`
     color: ${SEGColor};   
    text-decoration: none;
    font-size: 12px;
    ${props => props.route && css`
        user-select: none;
        color: ${SEGColor};
        cursor: pointer;
        pointer-events: none;
    `}
`
export const BreadcrumbTitle = styled.h2`
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    margin: 5px 0 0;
    @media only screen and (max-width: 767.98px) {
        font-size: 18px;
        color: #fff;
    }
`
