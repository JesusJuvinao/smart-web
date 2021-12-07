import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BColor, BGColor, PColor, PLColor, SECColor } from '../../public/colors'
import { RippleButton } from '../../components/Ripple'
import Image from 'next/image'
import { IconArrowBottom, IconArrowLeft, IconCancel, IconLogo, IconSearch } from '../../public/icons'
import { useSetState } from '../../components/hooks/useState'
import { Overline } from '../../components/common/Reusable'
import { Section, Card, Content, Text, Paragraph, TabsListWrapper, ContentPricing, Line, Pricing, FeatureItem, BtnItem, ContentPrice, ModuleInfo, Module, BtnClose, SwitchButton, ButtonTheme, ContentToggle, ContentCarPrice } from './styled'
import Options from '../../components/Accordion/Options'

export const Hero = () => {
  return (
          <Section>
              <Content>
                  <Card justify='flex-start' width='100%' >
                      <Text size='1rem' >INTUIT QUICKBOOKS CUSTOMER SUPPORT</Text>
                      <Text lineHeight={'1.25'} font='PFont-Bold' bold='bold' justify='start' color={SECColor} size='2.90rem' margin='30px auto'>Contact us</Text>
                      <Card width='50%'>
                          <RippleButton padding='0 15px' size='15px' family='PFont-Regular' bgColor={PColor} minHeight='2.25em' border='624.9375rem' height='calc(100% + .625rem)' >Contact us</RippleButton>
                      </Card>
                  </Card>
                  <Card justify='flex-end' width='100%'>
                     <Image
                        src="/images/company-finance.jpg"
                        alt="Picture of the author"
                        width={1000}
                        layout='responsive'
                        height={500}
                        objectFit={'cover'}
                    />
                </Card>
              </Content>
          </Section>
  )
}

export const HeroCard = () => {
  return (
          <Section>
              <Content>
                  <Card media minWidth='192px' margin='0 0 2.5rem 0' padding='0 1.25rem' justify='center'>
                      <Image
                          src="/images/sbseg-ZA_Home_StayOrganised.png"
                          alt="Picture of the author"
                          width={130}
                          // layout='responsive'
                          height={130}
                          objectFit={'contain'}
                      />
                      <Text justify='center' align='center' color={SECColor} lineHeight='1.4' bold='600' size='1.25rem' margin='1.25rem 1.5rem'>Hello organised</Text>
                      <Paragraph justify='center' align={'center'} color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                          QuickBooks Online keeps everything in its right place, so you’ll always have what you need when you need it.
                      </Paragraph>
                  </Card>
                  <Card media minWidth='192px' margin='0 0 2.5rem 0' padding='0 1.25rem' justify='center'>
                      <Image
                          src="/images/sbseg-free-up-time.webp"
                          alt="Picture of the author"
                          width={130}
                          // layout='responsive'
                          height={130}
                          objectFit={'contain'}
                      />

                      <Text justify='center' align={'center'} color={SECColor} lineHeight='1.4' bold='600' size='1.25rem' margin='1.25rem 1.5rem'>Free up time</Text>
                      <Paragraph justify='center' align={'center'} color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                          QSync with your bank and favourite apps, so your books are always accurate and up to date..
                      </Paragraph>
                  </Card>
                  <Card media minWidth='192px' margin='0 0 2.5rem 0' padding='0 1.25rem' justify='center'>
                      <Image
                          src="/images/sbseg-claim-everything.webp"
                          alt="Picture of the author"
                          width={130}
                          // layout='responsive'
                          height={130}
                          objectFit={'contain'}
                      />
                      <Text justify='center' align={'center'} color={SECColor} lineHeight='1.4' bold='600' size='1.25rem' margin='1.25rem 1.5rem'>Claim everything</Text>
                      <Paragraph justify='center' align={'center'} color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                          Claim every entitlement at tax time with your expense receipts stored and sorted in QuickBooks.
                      </Paragraph>
                  </Card>
                  <Card media minWidth='192px' margin='0 0 2.5rem 0' padding='0 1.25rem' justify='center'>
                      <Image
                          src="/images/sbseg-il_utl_chat_support@2x.webp"
                          alt="Picture of the author"
                          width={130}
                          // layout='responsive'
                          height={130}
                          objectFit={'contain'}
                      />
                      <Text justify='center' align={'center'} color={SECColor} lineHeight='1.4' bold='600' size='1.25rem' margin='1.25rem 1.5rem'>Unlimited support</Text>
                      <Paragraph justify='center' align={'center'} color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                          With QuickBooks free and unlimited customer support, help is always just a click away.
                      </Paragraph>
                  </Card>
              </Content>
          </Section>
  )
}
