import React from 'react'
import Lottie from 'lottie-react-web'
import LockedOut from '../5270-locked.json'

export const Animation = () => {

    return (
        <Lottie
            options={{
                animationData: LockedOut,
            }}
            width='400px'
            height='400px'

            autoPlay
        />
    )
}
