import React from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from './styled'
import { EColor } from '../../public/colors'
import { IconDelete } from '../../public/icons'
import styled, { css } from 'styled-components'
const AttachmentsList = ({
  width,
  dataFiles,
  getFileUrl
}) => {
  return (
    <ContainerAttachment width={width}>
      <Text margin='10px 0 30px 0' size='20px'>Add to Bill</Text>
      <>
        {!!dataFiles?.length > 0 && dataFiles?.map(x => (
          <WrapperCard width={width} key={x._id}>
            <div>
              <a className='link' target="_blank" onClick={() => getFileUrl({ BillLink: x.BillLink })} >{x.BillLink}</a>
              &nbsp;&nbsp; &nbsp;
            </div>
            <Option>
              {dataFiles &&
                <Option>
                  <Button type="button" display='inline-grid' onClick={() => getFileUrl({ BillLink: x.BillLink, Delete: true, idFile: x._id })} >
                    <IconDelete size='20px' color={EColor} />
                  </Button>
                  <Button type="button" display='inline-grid' onClick={() => getFileUrl({ BillLink: x.BillLink, Delete: true, idFile: x._id })} >
                    <span className="link">Download</span>
                  </Button>
                </Option>}
            </Option>
          </WrapperCard>
        ))}
      </>
    </ContainerAttachment>
  )
}
export const Option = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 7px;
  text-align: center;
  cursor: pointer;

`
export const WrapperCard = styled.div`
    font-size: 14px;
    ${({ width }) => width
    ? css`
                width: 225px;
                  `
    : css`
                opacity: 0;
                width: 0%;
              `}
    display: grid;
    place-content: center;
    align-items: center;
    color: #393A3D;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 0 rgb(51 51 51 / 15%);
    border: 1px solid #c7c7c7;
    transform: translate3d(0, 0, 0);
`
export const ContainerAttachment = styled.div`
    position: relative;
    height: min-content;
    max-height: 100vh;
    overflow-y: auto;
    display: grid;
    justify-content: center;
    align-items: flex-start;
    transition: all 200ms ease-in-out;
    ${({ width }) => width
    ? css`
                width: 20%;
                  `
    : css`
                
                width: 0%;
              `}

`
AttachmentsList.propTypes = {
  dataFiles: PropTypes.array,
  width: PropTypes.bool,
  getFileUrl: PropTypes.func
}

export default AttachmentsList
