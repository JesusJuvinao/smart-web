import { useState, useEffect, useCallback } from 'react'

const defaultSettings = {
    enableHighAccuracy: false,
    timeout: Infinity,
    maximumAge: 0
}

export const usePosition = (watch = false, settings = defaultSettings) => {
    const [position, setPosition] = useState({})
    const [error, setError] = useState(null)

    const onChange = ({ coords, timestamp }) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            speed: coords.speed,
            coords,
            timestamp
        })
    }

    const onError = () => {
        setError(error?.message)
    }

    useEffect(() => {
        if (!navigator || !navigator.geolocation) {
            setError('Geolocation is not supported')
            return
        }

        let watcher = null
        if (watch) {
            watcher = navigator.geolocation.watchPosition(
                onChange,
                onError,
                settings
            )
        } else {
            navigator.geolocation.getCurrentPosition(onChange, onError, settings)
        }

        return () => watcher && navigator.geolocation.clearWatch(watcher)
    }, [
        settings,
        settings.enableHighAccuracy,
        settings.timeout,
        settings.maximumAge,
        watch
    ])

    return { ...position, error }
}

export const useContextMenu = () => {
    const [xPos, setXPos] = useState('0px')
    const [yPos, setYPos] = useState('0px')
    const [showMenu, setShowMenu] = useState(false)

    const handleContextMenu = useCallback(
        e => {
            e.preventDefault()

            setXPos(`${ e.pageX }px`)
            setYPos(`${ e.pageY }px`)
            setShowMenu(true)
        },
        [setXPos, setYPos]
    )

    const handleClick = useCallback(() => {
        showMenu && setShowMenu(false)
    }, [showMenu])

    useEffect(() => {
        document.addEventListener('click', handleClick)
        document.addEventListener('contextmenu', handleContextMenu)
        return () => {
            document.addEventListener('click', handleClick)
            document.removeEventListener('contextmenu', handleContextMenu)
        }
    })

    return { xPos, yPos, showMenu }
}
