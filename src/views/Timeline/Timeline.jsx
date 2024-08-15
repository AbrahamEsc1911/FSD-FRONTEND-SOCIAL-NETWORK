import React, { useEffect, useState } from "react";
import { likeDislike, timeline } from "../../Services/posts.services";
import { CInputs } from "../../components/CInputs/CInputs";
import { newComments } from "../../Services/comments.services";
import { userProfile } from "../../Services/user.services";
import { useNavigate } from "react-router-dom";
import { CPostBlock } from "../../components/CPostBlock/CPostBlock";
import { CBlockContent } from "../../components/CBlockContent/CBlockContent";

export const Timeline = () => {
  const passport = JSON.parse(localStorage.getItem("passport"));
  let token = null;
  let userId = null;
  if (passport) {
    token = passport.token;
    userId = passport.tokenData.id;
  }
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState({
    comment: "",
  });

  useEffect(() => {
    if (passport) {
      const timelinePosts = async () => {
        const res = await timeline(token);
        setAllPosts(res.data);
      };
      timelinePosts();
    }
  }, []);

  const postById = async (e) => {
    const id = e.target.name;
    navigate(`/post/${id}`);
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
      const res = await timeline(token);
      setAllPosts(res.data);
    } else {
      console.log("error creating a new comment");
    }
  };

  const likeThisPosts = async (e) => {
    const postId = e.target.name;
    const response = await likeDislike(token, postId);
    console.log(response);
    const res = await timeline(token);
    setAllPosts(res.data);
  };

  return (
    <>
      <div>
        {allPosts.map((post) => {
          return (
            <div key={post._id}>
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
                    onClickToPostById={postById}
                    onClickToLike={likeThisPosts}
                    onChangeComments={addComments}
                    onClickToSentComments={sendComment}
                  />
                }
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
