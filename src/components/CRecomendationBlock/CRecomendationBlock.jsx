import React from "react";
import "./CRecomendationBlock.css";

export const CRecomendationBlock = ({profile, userName, buttonName, buttonOnClick, classNameButton, userProfile, onClickToGoUserProfile }) => {
  return (
    <>
      <div className="block-user-recomendation">
        <div className="recomendation-profile">
          <img src={profile} alt="profile-image" id={userProfile} onClick={() => onClickToGoUserProfile(userProfile)}/>
        </div>
        <div className="recomendation-content">
          <div className="text-name-navigation">
          <h4 className="text-no-margin" id={userProfile} onClick={() => onClickToGoUserProfile(userProfile)}>{userName}</h4>
          </div>
          <input type="button" value="follow" name={buttonName} onClick={buttonOnClick} className='follow-button-recomendation'/>
        </div>
      </div>
    </>
  );
};
