import React from 'react'
import { Content, Section, Title } from './styled'
import { RouterCrumbs } from '../Breadcrumb'

export const HomePageComponent = () => {
  return (
    <Content>
      <RouterCrumbs />
      <Section>
        <Title>
          Enter your bills and sales invoices
        </Title>
      </Section>
      {/* <SectionRegular>
        <Paragraph>
        </Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga repellat ratione eaque hic, deleniti numquam. Molestias non et praesentium ea ratione sunt magnam neque veritatis quos! Ipsum inventore ipsam ex!
      </SectionRegular> */}
    </Content>
  )
}
