import React from 'react'
import { Offline, Online } from 'react-detect-offline'

export const UserOnlineStatusComponent = () => (
    <div>
        <Online>Only shown when youre online</Online>
        <Offline>Only shown offline (surprise!)</Offline>
    </div>
)
