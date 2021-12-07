/* eslint no-console: "error" */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { BColor, BGColor, EColor } from '../../../public/colors'
import { Context } from 'context'
import { useRouter } from 'next/router'

export const AlertError = () => {
  const { alert, authData } = useContext(Context)
  const location = useRouter()

  return (
    <>
      {!['/login', '/', '/register', '/forgotpassword', '/teams/invite/[id]', '/terms_and_conditions', '/email/confirm/[code]', '/autho', '/contact', '/teams/invite/[id]'].find(x => x === location.pathname) && (
        <ContainerModal showModal={alert}>
          <AwesomeModal onClick={e => e.stopPropagation()} showModal={alert}>
            <Text>Select a company to continue </Text>
          </AwesomeModal>
        </ContainerModal>
      )}
    </>
  )
}

const Text = styled.h5`
  color: ${BColor};
  font-family: PFont-Regular;
`
const AwesomeModal = styled.div`
    padding: 10px;
    width: 250px;
    height: 60px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    opacity: 0;
    top: 50%;
    background: ${BGColor};
    position: absolute;
    transition: 500ms ease;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow-y: auto;
  ${({ showModal }) => showModal
    ? css`  
            bottom: 0px;
            transform: translateY(850px);
            opacity: 1;
            `
    : css`
            margin: 0;
            opacity: 0;
            z-index: -99999;
              `}
    &::-webkit-scrollbar {
        width: 3px;
        background-color: #dcdcdc;
        border-radius: 5px;
    }
`
const ContainerModal = styled.div`
    display: flex;
    height: min-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    transition: opacity 150ms ease-in-out;
    ${({ showModal }) => showModal
    ? css`  
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background-color:rgba(0, 0, 0, 0.322);
        
        `
    : css`
          z-index: -10000;
          visibility: hidden;
          opacity: 0;
              `}
    `
const MapHeader = styled.div`
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    grid-template-columns: 50px 1fr 50px;
    padding: 27px 20px;
    z-index: 9999;
    background: linear-gradient(
    0deg
    , rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.8) 25%, white 100%);
`