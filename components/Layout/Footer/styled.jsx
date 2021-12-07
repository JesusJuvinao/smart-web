import styled from 'styled-components'
import { BGColor } from '../../../public/colors'

export const FooterComponent = styled.footer`
    position: fixed;
    bottom: 0;
    height: 60px;
    display: flex;
    left: 0;
    margin: auto;
    right: 0;
    width: 100%;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 24%);
    z-index: 80;
    justify-content: space-between;
    display: none;
    grid-area: foot;
    background-color: ${BGColor};
    @media (max-width: 960px){
        display: flex;
    }
`
export const Button = styled.button`
`
export const ContentFooter = styled.footer`
    display: flex;
    max-width: 1000px !important;
    margin: auto;
    flex-wrap: wrap;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    @media (min-width: 992px) {
    }
`
export const Text = styled.span` 
    font-size: 13px;
    text-align: center;
    margin: 5px 0px;
    font-family: PFont-Light;
    word-break: break-word;
`
export const Anchor = styled.a`
    &.active {
        border-top: 2px solid #61d2b4;
        & > svg {
            fill: red !important;
        }
    }
  padding: 0px 10px;
  width: 24%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3e3e3e;
  font-weight: 300;
  font-size: 0.75rem;
  line-height: 0.875rem;
`
