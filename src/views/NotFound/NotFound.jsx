import React from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {

    const navigation = useNavigate()

    const goBack = () => {
        navigation('./timeline')
    }

    return (
        <>
            <div className='body-not-found'>
                <div className='header-not-found-view'>
                    <img src="./images/logo.svg" alt="" id='logo-not-found-view-size' onClick={goBack} />
                </div>
                <div className='body-not-found-view'>
                    <img src="./images/404.svg" alt="not-found" id='not-found-image-size'/>
                </div>
            </div>
        </>
    )
}
