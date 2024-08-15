import React from "react";
import "./CCommentsBlock.css";

export const CCommentsBlock = ({profile, name, message, createdAt}) => {
  return (
    <>
      <div className="comments-main-section">
        <div className="comments-header">
          <div className="comments-header-profile">
            <img src={profile} alt={`photo-profile-${name}`} />
          </div>
          <div className="comments-header-name">
            <h4>{name}</h4>
          </div>
        </div>
        <div className="comments-message">
          <p>
            {message}
          </p>
        </div>
        <div className="comments-creation-date">
          <p>{createdAt}</p>
        </div>
        <div className="comments-division-line"></div>
      </div>
    </>
  );
};
