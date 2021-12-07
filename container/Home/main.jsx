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
                <Card justify='flex-start' width='100%'>
                    <Text size='1rem' >ACCOUNTING SOFTWARE | INTUIT QUICKBOOKS | GLOBAL</Text>
                    <Text lineHeight={'1.25'} font='PFont-Bold' bold='bold' justify='center' color={SECColor} size='2.90rem' margin='30px auto'>Smart, simple online accounting software for small business</Text>
                    <Text margin='1rem 0 3.75rem' size='1.20rem'>Track expenses, customise invoices, run reports and even more all from one place.</Text>
                    <Card width='50%'>
                        <RippleButton padding='0 15px' size='15px' family='PFont-Regular' bgColor={PColor} minHeight='2.25em' border='624.9375rem' height='calc(100% + .625rem)' >Buy now</RippleButton>
                        <RippleButton padding='0 15px' size='15px' family='PFont-Regular' bgColor={SECColor} minHeight='2.25em' border='624.9375rem' height='calc(100% + .625rem)' >Free 30-day trial</RippleButton>
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
            <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='2.125rem' margin='50px auto'>Powerful accounting tools for small and growing businesses</Text>
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
                    <Text justify='center' align={'center'} color={SECColor} lineHeight='1.4' bold='600' size='1.25rem' margin='1.25rem 1.5rem'>Hello organised</Text>
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
            <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='2.125rem' margin='30px auto'>Manage everything in one place</Text>
            <Content>
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
                <Card bgColor={'#f4f5f8'} width='100%'>
                    <Text lineHeight={'2.25rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='1.75rem' margin='30px auto' >Work from anywhere on multiple devices</Text>
                    <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                </Card>
            </Content>
        </Section>
  )
}

export const TabList = () => {
  const tabs = useSetState(0)
  const handleShow = index => {
    tabs.setState(index === tabs.state ? false : index)
  }
  return (
        <Section>
            <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='2.125rem' margin='30px auto'>Run your business on your terms</Text>
            <TabsListWrapper>
                <RippleButton active={tabs.state === 1} margin='0px 10px 0px 0px' border='0px' color={BColor} widthButton='150px' bgColor={'transparent'} family='PFont-Regular' onClick={() => tabs.state !== 1 && handleShow(1)}>Invoicing</RippleButton>
                <RippleButton active={tabs.state === 2} margin='0px 10px 0px 0px' border='0px' color={BColor} widthButton='150px' bgColor={'transparent'} family='PFont-Regular' onClick={() => tabs.state !== 2 && handleShow(2)}>Expenses</RippleButton>
                <RippleButton active={tabs.state === 3} margin='0px 10px 0px 0px' border='0px' color={BColor} widthButton='150px' bgColor={'transparent'} family='PFont-Regular' onClick={() => tabs.state !== 3 && handleShow(3)}>Reports</RippleButton>
            </TabsListWrapper>
            {tabs.state === 1
              ? <div>
                    <Content>
                        1
                        <Card justify='flex-end' width='90%'>
                            <Image
                                src="/images/company-finance.jpg"
                                alt="Picture of the author"
                                width={1000}
                                layout='responsive'
                                height={500}
                                objectFit={'cover'}
                            />
                        </Card>
                        <Card bgColor={'#f4f5f8'} width='50%'>
                            <Text lineHeight={'2.25rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='1.75rem' margin='30px auto' >Work from anywhere on multiple devices</Text>
                            <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                                Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                            </Paragraph>
                        </Card>
                    </Content>

                </div>
              : tabs.state === 2
                ? <div>
                        <Content>
                            2
                            <Card justify='flex-end' width='90%'>
                                <Image
                                    src="/images/company-finance.jpg"
                                    alt="Picture of the author"
                                    width={1000}
                                    layout='responsive'
                                    height={500}
                                    objectFit={'cover'}
                                />
                            </Card>
                            <Card bgColor={'#f4f5f8'} width='50%'>
                                <Text lineHeight={'2.25rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='1.75rem' margin='30px auto' >Work from anywhere on multiple devices</Text>
                                <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                                    Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                                </Paragraph>
                            </Card>
                        </Content>
                    </div>
                : <div>     <Content>
                        3
                        <Card justify='flex-end' width='90%'>
                            <Image
                                src="/images/company-finance.jpg"
                                alt="Picture of the author"
                                width={1000}
                                layout='responsive'
                                height={500}
                                objectFit={'cover'}
                            />
                        </Card>
                        <Card bgColor={'#f4f5f8'} width='50%'>
                            <Text lineHeight={'2.25rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='1.75rem' margin='30px auto' >Work from anywhere on multiple devices</Text>
                            <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                                Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                            </Paragraph>
                        </Card>
                    </Content></div>}
        </Section>
  )
}
export const PricingCard = () => {
  const show = useSetState(0)
  const Switch = useSetState(0)
  const handleShow = index => {
    show.setState(index === show.state ? false : index)
  }
  useEffect(() => {
    if (show) window.addEventListener('keyup', e => e.code === 'Escape' && show.setState(false))
    return () => window.removeEventListener('keyup', () => { })
  }, [show])
  return (
        <Section>
            <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='2.125rem' margin='30px auto'>There’s a QuickBooks for every business</Text>
            <ContentToggle>
                <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='1.5rem' margin='0 .625rem' width='auto' >Monthly</Text>
                <ButtonTheme onClick={() => Switch.setState(!Switch.state)}>
                    <SwitchButton active={Switch.state ? '36px' : '3.5px'} />
                </ButtonTheme>
                <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='1.5rem' margin='0 .625rem' width='auto' >Annual</Text>
            </ContentToggle>
            <ContentPricing>
                <ContentCarPrice>
                    {[1, 2, 3].map(x => (
                        <Card height='700px' key={x} alignContent='flex-start' radius='.25rem' shadow='0 0.125rem 0.5rem 0 rgb(0 0 0 / 20%)' maxWidth='16.5625rem' width="16.5625rem" margin='1.5rem .625rem 0' padding='0 1.25rem' justify='flex-start'>
                            <Text color={BColor} lineHeight='1.4' bold='500' size='1.25rem' margin='2.5rem 0 0'>Simple Start</Text>
                            <Line />
                            <Text margin='0px 0px 1.25rem 0'>Start your business</Text>
                            <Pricing>
                                <s>
                                    {Switch.state ? 'US$172' : 'US$16'}
                                </s>

                            </Pricing>
                            <ContentPrice>
                                <Text lineHeight={'1.3'} font='PFont-Bold' bold='700' color={SECColor} size='2.5rem' margin='.5rem 0'>{Switch.state ? 'US$151' : 'US$8'}</Text>
                                <span id='number'>{!Switch.state && 36}</span>
                                <span id='letters'>{Switch.state ? '/yr' : '/mo'}</span>
                            </ContentPrice>
                            <RippleButton margin='0px 10px 0px 0px' border='624.9375rem' color={BGColor} widthButton='150px' bgColor={'#0e8900'} family='PFont-Medium'>Buy now</RippleButton>
                            <RippleButton borderSolid='.125rem solid #393a3d' margin='15px 10px 40px 0px' border='624.9375rem' color={BColor} widthButton='150px' bgColor={'transparent'} family='PFont-Medium'>Free 30-day trial</RippleButton>
                            <FeatureItem>
                                <IconArrowBottom color={BColor} size='17px' />&nbsp;
                                <BtnItem onClick={() => handleShow(1)}>Track income & expenses</BtnItem>
                            </FeatureItem>
                            <FeatureItem>
                                <IconArrowBottom color={BColor} size='17px' />&nbsp;
                                <BtnItem onClick={() => console.log('')}>Track income & expenses</BtnItem>
                            </FeatureItem>
                            <FeatureItem>
                                <IconArrowBottom color={BColor} size='17px' />&nbsp;
                                <BtnItem onClick={() => console.log('')}>Track income & expenses</BtnItem>
                            </FeatureItem>
                            <FeatureItem>
                                <IconArrowBottom color={BColor} size='17px' />&nbsp;
                                <BtnItem onClick={() => console.log('')}>Track income & expenses</BtnItem>
                            </FeatureItem>
                            <FeatureItem>
                                <IconArrowBottom color={BColor} size='17px' />&nbsp;
                                <BtnItem onClick={() => console.log('')}>Track income & expenses</BtnItem>
                            </FeatureItem>
                            <FeatureItem>
                                <IconArrowBottom color={BColor} size='17px' />&nbsp;
                                <BtnItem onClick={() => console.log('')}>Track income & expenses</BtnItem>
                            </FeatureItem>
                        </Card>
                    ))}
                </ContentCarPrice>
            </ContentPricing>
            <Overline bgColor='rgba(0,0,0,.4)' show={show.state} onClick={() => show.setState(false)} />
            <ModuleInfo show={show.state}>
                <Module>
                    <BtnClose onClick={() => show.setState(false)}>
                        <IconCancel size='20px' />
                    </BtnClose>
                    <Text color={SECColor} lineHeight='1.4' bold='600' size='2rem' margin='2.5rem 0 0'>Track income & expenses</Text>
                    <ul>
                        <li>See how your business is doing in real-time on your dashboard.</li>
                        <li>Connect your bank accounts to categorise your expenses.</li>
                        <li>Sort your income and expenses fully-customisable categories.</li>
                    </ul>
                </Module>
            </ModuleInfo>
            <ContentToggle>
                <RippleButton padding='0 15px' size='15px' family='PFont-Regular' margin='50px 0' bgColor={SECColor} minHeight='3em' border='624.9375rem' height='calc(100% + .625rem)' >See all features</RippleButton>
            </ContentToggle>
        </Section>
  )
}

export const Modules = () => {
  return (
        <div style={{ backgroundColor: '#f4f5f8' }}>
            <Section>
            <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='2.125rem' margin='30px auto'>Features that help you run your business</Text>
                <ContentCarPrice >
                    {[1, 2, 3, 4, 5].map(x => (
                        <Card mediax key={x} height="min-content" bgColor='transparent' width='33.33%' padding='0 1.25rem' justify='center'>
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
                    ))}
                </ContentCarPrice>
            </Section>
        </div>
  )
}
export const PQR = () => {
  const [active, setActive] = useState(false)
  const handleClick = index => setActive(index === active ? false : index)
  return (
        <Section>
            <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='2.125rem' margin='30px auto'>Frequently Asked Questions</Text>

            <div >
                <Options color={SECColor} size='20px' label='What is online accounting software?' active={active === 1} handleClick={() => handleClick(1)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconSearch size='25px' color={PLColor} />}>
                    <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                    <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                    <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                </Options>
                <Options color={SECColor} size='20px' label='Is there a trial period and how do I sign up?' active={active === 2} handleClick={() => handleClick(2)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconSearch size='25px' color={PLColor} />}>
                <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                </Options>
                <Options aph color={SECColor} size='20px' label='Will QuickBooks online accounting software work on my Apple Mac?' active={active === 3} handleClick={() => handleClick(3)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconSearch size='25px' color={PLColor} />}>
                    <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                    <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                    <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                </Options>
                <Options aph color={SECColor} size='20px' label='Can I access QuickBooks Online accounting software on my mobile phone or tablet?' active={active === 4} handleClick={() => handleClick(4)} icon={<IconArrowBottom size='10px' color={PLColor} />} iconTwo={<IconSearch size='25px' color={PLColor} />}>
                    <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                    <Paragraph color={SECColor} lineHeight='1.5' size='1rem' margin='0'>
                        Access and manage your books from your computer, laptop, tablet, or smartphone anytime you choose. Create access privileges so that your colleague or accountant can login and work with your data online.
                    </Paragraph>
                </Options>
            </div>
        </Section>
  )
}

export const Item = () => {
  return (
        <div style={{ backgroundColor: '#f4f5f8' }}>
            <Section>
            <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='2.125rem' margin='30px auto'>Send better invoices and get paid faster</Text>
            </Section>
        </div>
  )
}
TabList.propTypes = {

}
Hero.propTypes = {

}
HeroCard.propTypes = {

}
