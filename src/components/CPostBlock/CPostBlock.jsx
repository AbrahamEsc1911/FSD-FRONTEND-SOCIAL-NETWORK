import React from "react";
import "./CPostBlock.css";

export const CPostBlock = ({
  creatorProfile,
  creatorName,
  message,
  createdAt,
  likeCount,
  commentCount,
  newCommentProfile,
  postId,
  onClickToPostById,
  onClickToLike,
  onChangeComments,
  onClickToSentComments,
  value,
  creatorId,
  onClickToGoUserProfile,
  classNameButtonLike,
}) => {
  return (
    <>
      <div className="basic-block-post">
        <div className="block-post-header">
          <div className="post-header-profile">
            <img src={creatorProfile} alt="profile-creator" id={creatorId} onClick={() => onClickToGoUserProfile(creatorId)}/>
          </div>
          <div className="post-header-name" id={creatorId} onClick={() => onClickToGoUserProfile(creatorId)}>
            <h3 className="text-no-margin">{creatorName}</h3>
            <p className="text-no-margin small-font-size">Public</p>
          </div>
        </div>
        <div className="block-post-message">
          <p>{message}</p>
        </div>
        <div className="block-post-creation-date">
          <p className="small-font-size text-no-margin">
            {createdAt}
          </p>
        </div>
        <div className="block-post-likes-comments">
          <div className="post-likes-comments">
            <div className="post-likes-comments-icon">
              <input
                type="button"
                value=""
                className={classNameButtonLike}
                name={postId}
                onClick={onClickToLike}
              />
            </div>
            <div className="post-likes-comments-text">
              <input
                type="button"
                value={`${likeCount} likes`}
                name={postId}
                onClick={onClickToPostById}
                className="like-comments-button"
              />
            </div>
            <div className="post-likes-comments-text">
              <input
                type="button"
                value={`${commentCount} comments`}
                name={postId}
                onClick={onClickToPostById}
                className="like-comments-button"
              />
            </div>
          </div>
        </div>
        <div className="block-post-new-comment">
          <div className={"new-comment-image-profile"}>
            {" "}
            <img src={newCommentProfile} alt="" />
          </div>
          <input
            type="text"
            placeholder="New Comments"
            name="comment"
            className="new-comment-input"
            onChange={onChangeComments}
          />
          <div className="send-button">
          <input
                type="button"
                value={value}
                className="send-icon"
                name={postId}
                onClick={onClickToSentComments}
              />
          </div>
        </div>
      </div>
    </>
  );
};
