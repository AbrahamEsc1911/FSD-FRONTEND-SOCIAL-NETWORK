import React, { useContext, useEffect, useState } from "react";
import { getPostById, likeDislike } from "../../Services/posts.services";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../../Context/postContext/postContex";
import { newComments } from "../../Services/comments.services";
import { CBlockContent } from "../../components/CBlockContent/CBlockContent";
import { CPostBlock } from "../../components/CPostBlock/CPostBlock";
import { CCommentsBlock } from "../../components/CCommentsBlock/CCommentsBlock";
import { CRecomendationBlock } from "../../components/CRecomendationBlock/CRecomendationBlock";
import { getAllUsers } from "../../Services/user.services";
import './SiglePost.css'

export const SiglePost = () => {
  const passport = JSON.parse(localStorage.getItem("passport"));
  let token = null;
  let userId = null;
  if (passport) {
    token = passport.token;
    userId = passport.tokenData.id;
  }

  const { id } = useParams();
  const [post, setPost] = useState({
    comments: [],
    createdAt: "",
    likes: [],
    post_message: "",
    user: {},
    _id: "",
  });

  const [newComment, setNewComment] = useState({
    comment: "",
  });
  const [usersToFollow, setusersToFollow] = useState([]);

  const navigate = useNavigate();
  const { setPostId } = useContext(PostContext);

  useEffect(() => {
    const bringPostById = async () => {
      const res = await getPostById(id);
      setPost(res.data);
      if(passport){
        const bringUsers = await getAllUsers(token);
        setusersToFollow(bringUsers.data)
      }
    };
    bringPostById();
    
  }, []);

  const likeThisPosts = async (e) => {
    const postId = e.target.name;
    if (token) {
      await likeDislike(token, postId);
      const res = await getPostById(id);
      setPost(res.data);
    } else {
      setPostId(id);
      navigate("/login");
    }
  };

  const addComments = (e) => {
    setNewComment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendComment = async (e) => {
    const postId = e.target.name;
    const response = await newComments(token, postId, newComment);
    if (response.success) {
      const res = await getPostById(id);
      setPost(res.data);
    } else {
      console.log("error creating a new comment");
    }
  };

  const follow = async (e) => {
    const followId = e.target.name;
    if (followId) {
      await followUser(token, followId);
      const bringUsers = await getAllUsers(token);
      setusersToFollow(bringUsers.data);
    }
  };

  const userById = async (userId) => {
    navigate(`../user/${userId}`)
  }

  return (
    <>
      <div className="single-post-body">
        <div className="single-post-section-one">
          <CBlockContent
            content={
              <CPostBlock
                creatorProfile={post.user.profile}
                creatorName={post.user.name}
                message={post.post_message}
                createdAt={post.createdAt}
                likeCount={post.likes.length}
                commentCount={post.comments.length}
                newCommentProfile={post.user.profile}
                postId={post._id}
                onClickToLike={likeThisPosts}
                onChangeComments={addComments}
                onClickToSentComments={sendComment}
                creatorId={post.user._id}
                onClickToGoUserProfile={userById}
              />
            }
          />
          <CBlockContent
            content={post.comments.map((comments) => {
              return (
                <div key={comments._id}>
                  <CCommentsBlock
                    profile={comments.user.profile}
                    name={comments.user.name}
                    message={comments.message}
                    createdAt={comments.createdAt}
                    creatorId={comments.user._id}
                    onClickToGoUserProfile={userById}
                  />
                </div>
              );
            })}
          />
        </div>
        <div className="single-post-section-two">
        <CBlockContent
          content={usersToFollow.map((user) => {
            return (
              <div key={user._id}>
                {!user.followers.includes(userId) && user._id !== userId && (
                  <CRecomendationBlock
                    profile={user.profile}
                    userName={user.name}
                    buttonName={user._id}
                    buttonOnClick={follow}
                  />
                )}
              </div>
            );
          })}
        />
        </div>
      </div>
    </>
  );
};
