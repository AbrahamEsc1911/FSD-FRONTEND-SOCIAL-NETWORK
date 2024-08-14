import React from 'react'
import './CPostBlock.css'

export const CPostBlock = ({creatorProfile, creatorName, message, createdAt, likeCount, commentCount, newCommentProfile, postId, onClickToPostById, onClickToLike}) => {
  return (
    <>
    
    <div className="basic-block-post">
        <div className="block-post-header">
          <div className="post-header-profile">
            <img src={creatorProfile} alt="profile-creator" />
          </div>
          <div className="post-header-name">
            <h3 className="text-no-margin">{creatorName}</h3>
            <p className="text-no-margin small-font-size">Public</p>
          </div>
        </div>
        <div className="block-post-message">
          <p>
            {message}
          </p>
        </div>
        <div className="block-post-creation-date">
          <p className="small-font-size text-no-margin">
            posted since {createdAt}
          </p>
        </div>
        <div className="block-post-likes-comments">
          <div className="post-likes-comments">
            <div className="post-likes-comments-icon">
                <input type="button" value="" className='like-icon' name={postId} onClick={onClickToLike} />
            </div>
            <div className="post-likes-comments-text" >
                <input type="button" value={`${likeCount} likes`} name={postId} onClick={onClickToPostById} className='like-comments-button'/>
              </div>
              <div className="post-likes-comments-icon">
                <img src="./images/comments.png" alt="commen-icon" className="likes-comments-icon" onClick={onClickToLike} name={postId} />
              </div>
              <div className="post-likes-comments-text">
              <input type="button" value={`${commentCount} comments`} name={postId} onClick={onClickToPostById} className='like-comments-button'/>
              </div>
          </div>
        </div>
        <div className="block-post-new-comment">
          <div className={"new-comment-image-profile"}> <img src={newCommentProfile} alt="" /></div>
          <input type="text" placeholder="New Comments" name="message" className="new-comment-input"/>
          <div className="send-button">
            <img src="./images/send.png" alt="send-icon" className="send-icon" />
          </div>
        </div>
      </div>
    </>
  )
}
