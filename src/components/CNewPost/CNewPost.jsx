import React from 'react'
import './CNewPost.css'

export const CNewPost = ({userName, profile, buttonName, onChange, onClick, inputName }) => {
  return (
    <>
    <div className="new-post-section">
            <div className="new-post-close">
              <img src={profile} alt="close-icon" className="close-icon"/>
            </div>
            <div className="new-post-header">
              <div className="new-post-profile"></div>
              <div className="new-post-name">
                <h4 className="text-no-margin">{userName}</h4>
                <p className="text-no-margin">Public</p>
              </div>
            </div>
            <div>
              <textarea name={inputName} id="new-post-message" placeholder="New Post" maxLength={280} onChange={onChange}></textarea>
            </div>
            <div className="new-post-button">
              <input type="button" value="Send" name={buttonName} className="new-post-send-button" onClick={onClick}/>
            </div>
          </div>
    </>
  )
}
