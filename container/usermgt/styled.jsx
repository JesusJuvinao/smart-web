import { APColor, BGColor, SECColor, SEGColor } from '@/public/colors'
import styled, { css } from 'styled-components'


export const HeadTitle = styled.div`
    border-top: 1px solid;
    border-bottom: 1px solid;
`
export const Section = styled.div`
    display: grid; 
    width: 100%;
    align-items: center;
    place-content: center;
    grid-template-columns: 25% repeat(auto-fill, 25%);
    ${({ borderTop }) => borderTop && css`border-top: ${borderTop};`}
    ${({ borderBottom }) => borderBottom && css`border-bottom: ${borderBottom};`}

`
export const ContentInnerDates = styled.div`

`
export const Card = styled.div`
    width: 100%;
    padding: 0;
    display: ${({ display }) => display || 'flex'};
    height: ${({ height }) => height || 'auto'};
    ${({ justify }) => justify && css`justify-content: ${justify};`}
    ${({ direction }) => direction && css`flex-direction: ${direction};`}

    border-left: 2px solid black;
    &:first-child {
        border-left: none;
    }

`
export const Table = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    height: 30vh;
    && {
      th {
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        font-family: PFont-Regular;
    }
    td {
        text-align: left;
        min-width: 5.5rem;
        max-width: 5.5rem;
        border: 1px solid rgb(161, 162, 165);
        padding: 0.2rem;
    }
    table {
        width: 100%;
        border: 1px solid rgb(161, 162, 165);
        border-spacing: 0.25rem;
        border-collapse: collapse;
        font-size: .8rem;
        line-height: 1.5rem;
        font-weight: 400;
    }
    thead td {
        min-width: 5.5rem;
        max-width: 5.5rem;
        border: 1px solid rgb(161, 162, 165);
        padding: 10px;
        margin: 10px;
        font-size: 13px;
        font-family: PFont-Regular;
    }
}
    &::-webkit-scrollbar {
        width: 2px;
        background-color: #dcdcdc;
        border-radius: 5px;
    }

`
export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    max-width: ${({ width }) => width || '100%'};
    width: ${({ width }) => width || '100%'};
    text-overflow: ellipsis;
`
export const Container = styled.div`
  padding: 30px;

`
export const Footer = styled.div`
    width: 100%;
    height: 40px;
    right: 0;
    background-color: ${SECColor};
    bottom: -1px;
    z-index: 999;
    display: flex;
    align-items: center;
    position: ${({ position }) => position || 'fixed'};
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    & > button{
        font-size: 19px;
        font-family: PFont-Light;
        cursor: pointer;
        border-radius: 50px;
        color: ${BGColor};
        background-color: ${APColor}
    }
`
// START STEP

const blue = '#005279'
const green = '#5EB524'
const red = '#ef4036'
const lightGray = '#D9D9D9'
export const Steps = styled.div`
  display: flex;
  font-size: 0;
`

export const Step = styled.div`
  position: relative;
  flex: 1;

  &:last-child {
    flex: none;
  }
`

const iconSize = 48
const stepWidth = 150

export const DefaultIcon = styled.div`
  margin-left: ${(stepWidth - iconSize) / 2}px;
  background: ${blue};
  width: ${iconSize}px;
  height: ${iconSize}px;
  border-radius: ${iconSize}px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const WaitIcon = styled(DefaultIcon)`
  background: transparent;
  border: 2px solid ${lightGray};
`

export const ProcessIcon = styled(DefaultIcon)`
  background: ${green};
`

export const ErrorIcon = styled(DefaultIcon)`
  background: ${red};
`

export const StepNumber = styled.span`
  color: white;
  line-height: 1;
  font-size: 16px;
  font-weight: 600;

  ${WaitIcon} & {
    color: #ccc;
  }
`

export const Content = styled.div`
  text-align: center;
  margin-top: 12px;
  width: ${stepWidth}px;
`

export const Title = styled.div`
  font-size: 14px;
  color: ${blue};
  font-weight: 400;
`

export const Tail = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  top: ${iconSize / 2}px;
  padding: 0px ${iconSize / 2}px;
  margin-left: ${stepWidth / 2}px;

  &:after {
    content: '';
    display: inline-block;
    background: ${props => props.finished ? blue : lightGray};
    height: 2px;
    border-radius: 2px;
    width: 100%;
  }

  ${Step}:last-child & {
    display: none;
  }
`

export const Button = styled.button`
  border: 1px solid ${SEGColor};
  background-color: transparent;

`
export const FeatureItem = styled.div`
    display: flex;
    align-items: flex-start;
    padding-top: 0.5rem;
    width: 100%;
    cursor: pointer;
    width: fit-content;
    /* flex-direction: column; */
    padding-top: 0.5rem;
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