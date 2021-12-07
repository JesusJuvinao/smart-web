import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { PColor } from '../../public/colors'
import { IconFullscreen, IconScreenNormal } from '../../public/icons'

const useFullscreenMode = () => {
    const [isFullscreen, setFullscreen] = useState(false)
    const elementRef = useRef()

    useEffect(() => {
        const changeHandler = () => setFullscreen(mode => !mode)

        document.addEventListener('fullscreenchange', changeHandler, false)
        document.addEventListener('mozfullscreenchange', changeHandler, false)
        document.addEventListener('MSFullScreenChange', changeHandler, false)
        document.addEventListener(
            'webkitfullscreenchange',
            changeHandler,
            false
        )

        return () => {
            document.removeEventListener('fullscreenchange', changeHandler)
            document.removeEventListener('mozfullscreenchange', changeHandler)
            document.removeEventListener('MSFullScreenChange', changeHandler)
            document.removeEventListener(
                'webkitfullscreenchange',
                changeHandler
            )
        }
    }, [])

    const goFullscreen = () => {
        if (elementRef.current.requestFullscreen) {
            elementRef.current.requestFullscreen()
        } else if (elementRef.current.mozRequestFullscreen) {
            // Firefox
            elementRef.current.mozRequestFullscreen()
        } else if (elementRef.current.webkitRequestFullscreen) {
            // Chrome, safari, opera
            elementRef.current.webkitRequestFullscreen()
        } else if (elementRef.current.msRequestFullscreen) {
            // IE, edge
            elementRef.current.msRequestFullscreen()
        }
    }

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
    }

    const ToggleIcon = (
        <Button onClick={() => (!isFullscreen ? goFullscreen() : exitFullScreen())}>{!isFullscreen ? <IconFullscreen color={PColor} size='17px' /> : <IconScreenNormal size='17px' color={PColor} />}</Button>
    )
    return [elementRef, ToggleIcon] // Icon, ref
}
const Button = styled.button`
  background-color: transparent;
`
export default useFullscreenMode
