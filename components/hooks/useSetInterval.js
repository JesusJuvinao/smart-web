import React, { useState, useEffect, useRef } from 'react'

const STATUS = {
    STARTED: 'Started'
}

const INITIAL_COUNT = 50
function useInterval(callback, delay) {
    const savedCallback = useRef()
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])
    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}
const twoDigits = num => String(num).padStart(0, '0')

export default function CountdownApp() {
    const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
    const [status, setStatus] = useState(STATUS.STOPPED)
    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60
    const handleStart = () => {
        setStatus(STATUS.STARTED)
    }
    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1)
            } else {
                setStatus(STATUS.STOPPED)
            }
        },
        status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
    )
    const component = (
        <div>
            {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
            {twoDigits(secondsToDisplay)}
        </div>
    )
    return [status, component, handleStart]
}

