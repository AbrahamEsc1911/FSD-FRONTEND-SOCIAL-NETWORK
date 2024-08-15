import React from 'react'
import './CSectionTwoProfile.css'

export const CSectionTwoProfile = ({bornDate, phone, city, onClick, value, buttonName, className}) => {
  return (
    <>
    
    <div className='section-two-profile'>
                <div className='section-two-block'>
                    <div className='section-two-icon'>
                        <img src="./images/phone.svg" alt="city-icon" className='section-two-icon-size' />
                    </div>
                    <div className='section-two-text'>
                        <p className='p-section-two'>{phone}</p>
                    </div>
                </div>
                <div className='section-two-block'>
                    <div className='section-two-icon'>
                        <img src="./images/born.svg" alt="city-icon" className='section-two-icon-size' />
                    </div>
                    <div className='section-two-text'>
                        <p className='p-section-two'>{bornDate}</p>
                    </div>
                </div>
                <div className='section-two-block'>
                    <div className='section-two-icon'>
                        <img src="./images/city.svg" alt="city-icon" className='section-two-icon-size' />
                    </div>
                    <div className='section-two-text'>
                        <p className='p-section-two'>{city}</p>
                    </div>
                </div>
                <div className='section-two-block'>
                    <input type="button" value={value} name={buttonName} className={className} onClick={onClick} />
                </div>
            </div>
    </>
  )
}
