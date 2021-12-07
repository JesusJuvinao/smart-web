import React from 'react'
import { Container, Text, Banner } from './styled'
import { RippleButton } from '../../components/Ripple'
import PropTypes from 'prop-types'
import { Hero, HeroCard, Item, Modules, PQR, PricingCard, TabList } from './main'
import { BGColor, SECColor } from '../../public/colors'

export const IndexC = () => {
  return (
    <Container>
      <OnBanner height='80px' />
      <Hero />
      <HeroCard />
      <OnBanner height='18.25rem' title='Ready to run your business better with Quickbooks Online?' color={BGColor} bgColor={SECColor} width='220px' size='2.125rem' Button TextBtn='Buy now and save' />
      <TabList />
      <PricingCard />
      <Modules />
      <PQR />
      <Item />
      <OnBanner height='18.25rem' title='See what QuickBooks can do for your business.' color={BGColor} bgColor={SECColor} width='220px' size='2.125rem' Button TextBtn='Buy now' />

    </Container>

  )
}

const OnBanner = ({ height, children, color, bgColor, TextBtn, title, Button, size, width }) => {
  return (
    <Banner height={height}>
      <Text lineHeight={'1.25'} font='PFont-Bold' bold='bold' justify='center' color={color} size={size} margin='30px auto' align='center'>{title}</Text>
      {Button && <RippleButton padding='0 15px' size='15px' family='PFont-Regular' bgColor={bgColor} minHeight='3em' widthButton={width} border='624.9375rem' height='calc(100% + .625rem)' >{TextBtn}</RippleButton>}
    </Banner>
  )
}

OnBanner.propTypes = {
  title: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.array,
  Button: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  TextBtn: PropTypes.string,
  width: PropTypes.string,
  bgColor: PropTypes.string
}
Banner.propTypes = {

}
