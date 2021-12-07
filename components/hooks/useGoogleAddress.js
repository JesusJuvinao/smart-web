import { useState, useEffect } from 'react'

export const UseGoogleAddress = address => {
    const [map, setMap] = useState({})
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${ address }&key=AIzaSyAiX9HY2mo-a8fjdrFxbAA3SFuECY0r5SI`
    // useEffect(async () => {
    //     const response = await API.
    // })
    useEffect(() => {
        fetch(API)
            .then(response => response.json())
            .then(response => {
                setMap(response?.data?.results)
            })
            .catch(() => {
            })
    }, [])
    return (map)
}
