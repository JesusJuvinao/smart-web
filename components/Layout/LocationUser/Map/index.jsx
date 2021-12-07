/* eslint no-console: "error" */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api'
import mapStyle from './mapStyles'
import { IconArrowLeft } from '../../../../public/icons'
import { BGColor, PColor } from '../../../../public/colors'
import { Span } from './styled'

export const Map = ({ showModal, setShowModal, modal, handleClickMap }) => {
  // const [animationTrans, setAnimationTrans] = useState(false)
  const mapContainerStyle = {
    height: '70vh',
    width: '100%',
    position: 'absolute'
  }
  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false

  }
  const defaultCenter = {
    lat: 10.999881951815418,
    lng: -74.80783927407826
  }
  // eslint-disable-next-line
  const [map, setMap] = useState(null)
  // const [handleDrag, setHandelDrag] = React.useState(0)
  // eslint-disable-next-line
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])
  const [markers, setMarkers] = React.useState([])
  const onMapClick = React.useCallback(e => {
    setMarkers(() => [{
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date()
    }
    ])
  })
  // const handleSave = () => {
  //   setAnimationTrans(!animationTrans)
  // }
  return (
    <ContainerModal showModal={showModal} onClick={() => setShowModal(!showModal)}>
      <AwesomeModal onClick={e => e.stopPropagation()} showModal={showModal}>
        {/* {modal === 1 ? <Container modal={true}>
          <InputHooks
            title='Department'
            required
            // errors={values?.user}
            // value={values?.user}
            // onChange={handleChange}
            name='department'
          />
          <InputHooks
            title='City'
            required
            // errors={values?.user}
            // value={values?.user}
            // onChange={handleChange}
            name='city'
          />
          <InputHooks
            title='Type of Street'
            required
            // errors={values?.user}
            // value={values?.user}
            // onChange={handleChange}
            name='typeStreet'
          />
          <InputHooks
            title='Main Street'
            required
            // errors={values?.user}
            // value={values?.user}
            // onChange={handleChange}
            name='mainStreet'
          />
          <InputHooks
            title='# Secondary Street'
            required
            // errors={values?.user}
            // value={values?.user}
            // onChange={handleChange}
            name='secondaryStreet'
          />
          <InputHooks
            title='- Number'
            required
            // errors={values?.user}
            // value={values?.user}
            // onChange={handleChange}
            name='number'
          />
          <RippleButton onClick={() =>  handleClickMap(2) }><Text>Search Address</Text></RippleButton>

        </Container> : */}
          <Container>
            <MapHeader>
              <button style={{ backgroundColor: 'transparent' }} onClick={() => handleClickMap(1)} >
                <IconArrowLeft size={20} color={PColor} />
              </button>
              <Span>{markers[0]?.lat}</Span><div></div>
            </MapHeader>
            <LoadScript googleMapsApiKey='AIzaSyBjsZdzx04Ol7DQ7v4BXimgxC1JwNCAnj0'>
              <GoogleMap /* onDragStart={() => setHandelDrag(0)} onDragEnd={() => setHandelDrag(1)} */
                mapContainerStyle={mapContainerStyle}
                zoom={19}
                onLoad={onLoad}
                options={options}
                onClick={onMapClick}
                center={defaultCenter}
              >
                <Marker
                  position={!defaultCenter ? defaultCenter : { lat: parseInt(markers[0]?.lat), lng: parseInt(markers[0]?.lng) }}
                />
              </GoogleMap>
              {/* {1 && <ContentButton>
                <button style={{ width: '40%' }} onClick={handleSave}>Confirmar</button>
              </ContentButton>} */}
            </LoadScript>
          </Container>
      </AwesomeModal>
    </ContainerModal>
  )
}

Map.propTypes = {
  google: PropTypes.func,
  setShowModal: PropTypes.func,
  handleClickMap: PropTypes.func,
  showModal: PropTypes.bool,
  modal: PropTypes.number

}

const Container = styled.div`
width: 100%;
${props => props.modal && css`
padding: 30px;
`}
background-color: ${BGColor};
`
const AwesomeModal = styled.div`
    width: 700px;
    height: 60vh;
    border-radius: 10px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    opacity: 0;
    top: 50%;
    position: absolute;
    transition: 500ms ease;
    overflow-y: auto;
  ${({ showModal }) => showModal
    ? css`  
            top: 80px;
            transform: translateY(95px);
            border-radius: 4px;
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
    backdrop-filter: blur(.8px);
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
        z-index: 10000;
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
// const ContentButton = styled.div`
//     width: 100%;
//     position: absolute;
//     margin: auto;
//     display: flex;
//     justify-content: center;
//     z-index: 99999;
//     bottom: -550px;
// `
