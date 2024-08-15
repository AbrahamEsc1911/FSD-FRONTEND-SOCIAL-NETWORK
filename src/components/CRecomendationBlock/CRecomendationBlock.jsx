import React from "react";
import "./CRecomendationBlock.css";

export const CRecomendationBlock = ({profile, userName, buttonName, buttonOnClick, classNameButton }) => {
  return (
    <>
      <div className="block-user-recomendation">
        <div className="recomendation-profile">
          <img src={profile} alt="profile-image" />
        </div>
        <div className="recomendation-content">
          <h4 className="text-no-margin">{userName}</h4>
          <input type="button" value="follow" name={buttonName} onClick={buttonOnClick} className={classNameButton}/>
        </div>
      </div>
    </>
  );
};
