import styled, { css } from 'styled-components'
import { BGColor, SEGColor, PVColor, PColor } from '../../public/colors'

export const Select = styled.select`
    padding: 10px;
    color: #272323;
    padding: 15px 10px;
    margin: 15px 0px;
    outline: 0;
    border: 1px solid #ccc;
    font-weight: 600;
    font-size: 13px;
    width: -webkit-fill-available;
    border-radius: 2px;

`
export const Form = styled.form`
    border-radius: 8px;
    padding: 20px;
    padding-bottom: 200px;
    background-color: #fff;
    align-self: center;
    width: 100%;
    max-height: 100vh;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    &::-webkit-scrollbar {
    width: 5px;
    background-color: #dcdcdc;
    border-radius: 5px;
}

`
export const Container = styled.div`
    width: 100%;
    background-color: #f8f8fa;
    max-width: 100%;
    min-width: 100%;
    overflow: hidden;
    padding: 30px;

    `
export const Content = styled.div`
    padding: 30px;
    margin: auto;
    background-color: ${BGColor};
    border-radius: 5px;
    ${props => props.center && css`
    display: grid;
    place-content: center;
    `}
`
export const Textarea = styled.textarea`
    height: 300px;
    width: 100%;
    max-width: 100%;
    min-width: 50%;
    min-height: 150px;
    max-height: 150px;
    border: 1px solid ${`${SEGColor}69`};
    outline: none;
    margin: 10px 5px;
    padding: 15px;
`
export const ContentImg = styled.div`
    width:  95%;
    height: ${({ height }) => height || 'auto'};
    margin: ${({ margin }) => margin || 'auto'};
    cursor: pointer;
    display: flex;
    justify-content: space-around;
`
export const CtnImg = styled.div`
    width: 50%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const InputFile = styled.input`
    display: none;
`
export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
`
export const ButtonStatus = styled.button`
    background-color:${PColor};
    border: none;
    outline: none;
    cursor: pointer;
    font-family: PFont-Regular;
    color: #fff;
    margin-bottom: 10px;
    padding:10px 15px;
    font-weight: 600;
    font-size: ${({ fSize }) => fSize || '13px'};
    min-width: 120px;
    width: 150px;
    margin: auto;
    display: flex;
    place-content: center;
    border-radius: 50px;
`
export const Card = styled.div`
    display: flex;
    margin: ${({ margin }) => margin || 'auto'};
    flex-direction: column;
    ${props => props.responsive && css`
        flex-direction: row;
        flex-wrap: wrap;
    `}
    ${props => props.content && css`
    padding: 20px;
    width: ${({ width }) => width || '48%'};
    border-radius: 5px;
    border: 1px solid ${`${SEGColor}1F`};
`}
`

export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    margin: ${({ margin }) => margin || 'auto'};
    width: 100%;
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
`
export const Input = styled.input`
    width: min-content ;
    margin: ${({ margin }) => margin || 'auto'};
`
export const Section = styled.div`
    display: grid;
    grid-template-columns: repeat(${({ n }) => n || 5}, 1fr); 
    width: 100%;
    height: auto;
    margin: 0 auto;
    border: 1px solid #f0f0f0;
    border-bottom: none;
    :last-child {
        border-bottom: 1px solid #f0f0f0; 
    }
    :hover {
        background-color: rgba(0,0,0,.075);
        :first-child {
            background-color: #fff;
        }
    }
    background-color: #fff;
`
export const IsActive = styled.div`
    background-color: ${({ active }) => active && css`${active}`};
    height: 30px;
    width: 30px;
    border-radius: 50%;
`
export const ContentTableItem = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'column'};
    justify-content: center;
    align-items: baseline;
    width: 100%;
    height: 50px;
    margin: 10px 0;
    padding: ${({ padding }) => padding || '0px 0px 0px 15px'};
`
export const ContainerInput = styled.label`
    margin: ${({ margin }) => margin || 'auto'};
.container {
   display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
   position: absolute; 
  opacity: 0; 
   cursor: pointer;
  height: 0;
  width: 0; 
}
/* Create a custom checkbox */
.checkmark {
  position: absolute; 
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
   position: absolute;
   display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

`
