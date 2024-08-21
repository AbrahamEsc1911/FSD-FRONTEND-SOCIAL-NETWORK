import React from "react";
import "./CNewPost.css";

export const CNewPost = ({
  userName,
  profile,
  buttonName,
  onChange,
  onClick,
  inputName,
  clasNameforErrorMessage,
  clasNameForEmtyMessage,
  onClickClose,
  showOrNotIconClose,
  classTextArea
}) => {
  return (
    <>
      <div className="new-post-section">
        <div className={`new-post-close ${showOrNotIconClose}`} >
          <img
            src="../images/close.png"
            alt="close-icon"
            className="close-icon"
            onClick={onClickClose}
          />
        </div>
        <div className="new-post-header">
          <div className="new-post-profile">
            <img src={`../${profile}`} alt="close-icon" />
          </div>
          <div className="new-post-name">
            <h4 className="text-no-margin">{userName}</h4>
            <p className="text-no-margin small-font-size">Public</p>
          </div>
        </div>
        <div>
          <textarea
            name={inputName}
            id="new-post-message"
            placeholder="What are you thinking"
            maxLength={280}
            onChange={onChange}
            className={classTextArea}
          ></textarea>
        </div>
        <div className={clasNameforErrorMessage}>
          Error creating a new posts, try again later
        </div>
        <div className={clasNameForEmtyMessage}>new post coulnt be empty</div>
        <div className="new-post-button">
          <input
            type="button"
            value="Send"
            name={buttonName}
            className="new-post-send-button"
            onClick={onClick}
          />
        </div>
      </div>
    </>
  );
};
