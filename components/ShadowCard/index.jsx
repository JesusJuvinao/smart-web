/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { HeadCard, ShadowCardContainer } from './styles'

export const ShadowCard = ({ children, title, hover }) => {
  return (
        <ShadowCardContainer hover={hover}>
            <HeadCard>{title}</HeadCard>
            <div>
                {children}
            </div>
        </ShadowCardContainer>
  )
}
ShadowCard.propTypes = {
  children: PropTypes.object || PropTypes.array,
  title: PropTypes.string,
  hover: PropTypes.string
}
