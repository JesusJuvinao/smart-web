import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import { SEGColor } from '../../public/colors'
import { Container } from './styled'
export const Maintenance = props => {
  const [timerDays, setTimerDays] = useState('00')
  const [timerHours, setTimerHours] = useState('00')
  const [timerMinutes, setTimerMinutes] = useState('00')
  const [timerSeconds, setTimerSeconds] = useState('00')
  const [browser, setBrowser] = useState(false)
  let interval = useRef()

  const startTimer = () => {
    const countdownDate = new Date('Dic 30,  2021 00:00:00').getTime()
    interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countdownDate - now
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0) {
        clearInterval(interval.current)
      } else {
        setTimerDays(days)
        setTimerHours(hours)
        setTimerMinutes(minutes)
        setTimerSeconds(seconds)
      }
    }, 1000)
  }
  useEffect(() => {
    const someref = interval.current
    startTimer()
    return () => {
      clearInterval(someref)
    }
  }, [])

  useEffect(() => {
    setBrowser(true)
  }, [])
  const portalContent = (
        <Container>
            <Content>
                <Card>
                    <Title>Dias</Title>
                    <DateResponse>{timerDays}</DateResponse>
                </Card>
                <Card>
                    <Title>Horas</Title>
                    <DateResponse>{timerHours}</DateResponse>
                </Card>
                <Card>
                    <Title>Minutos</Title>
                    <DateResponse>{timerMinutes}</DateResponse>
                </Card>
                <Card>
                    <Title>Segundos</Title>
                    <DateResponse>{timerSeconds}</DateResponse>
                </Card>
            </Content>
        </Container>
  )
  if (browser) {
    return ReactDOM.createPortal(portalContent,
      document.getElementById('portal'))
  } else {
    return null
  }
}

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex: wrap;
    max-width: 900px;
`
const Card = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid ${SEGColor};
    width: fit-content;
    padding: 20px;
`
const DateResponse = styled.span`
    font-family:  PFont-Light;
    text-align: center;
    color: ${SEGColor};
`
const Title = styled.span`
    font-family:  PFont-Regular;
    text-align: center;
    color: ${SEGColor};
`
