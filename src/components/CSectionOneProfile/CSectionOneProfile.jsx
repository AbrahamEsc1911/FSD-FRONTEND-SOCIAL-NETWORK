import React from 'react'
import './CSectionOneProfile.css'

export const CSectionOneProfile = ({portada, profile, name, email, posts, followers, following}) => {
    return (
        <>
            <div className='section-one-profile'>
                <div className='block-one'>
                    <img src={portada} alt={`portada-${name}`} />
                </div>
                <div className='block-two'>
                    <div className='element-profile-photo'>
                        <img src={profile} alt={`profile-${name}`} />
                    </div>
                    <div className='element-basic-description'>
                        <h4 className='profile-txt-no-margin'>
                            {name}
                        </h4>
                        <p className='profile-txt-no-margin'>
                            {email}
                        </p>
                    </div>
                </div>
                <div className='block-three'>
                    <div className='profile-follows-data'>
                        <h1 className='profile-txt-no-margin'>
                            {posts}
                        </h1>
                        <p className='profile-txt-no-margin'>Posts</p>
                    </div>
                    <div className='profile-follows-data'>
                        <h1 className='profile-txt-no-margin'>
                            {followers}
                        </h1>
                        <p className='profile-txt-no-margin'>Followers</p>
                    </div>
                    <div className='profile-follows-data'>
                        <h1 className='profile-txt-no-margin'>
                            {following}
                        </h1>
                        <p className='profile-txt-no-margin'>Following</p>
                    </div>
                </div>
                <div className='block-four'></div>
            </div>
        </>
    )
}
