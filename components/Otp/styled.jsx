import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(5, min-content);
    grid-template-columns: 15% repeat(auto-fill, 15%);
    position: relative;
    grid-gap: 10px;
    justify-content: center;
`
export const InputOtp = styled.input`
    padding: 20px;
    width: 60px;
    height: 50px;
    text-align: center
`
