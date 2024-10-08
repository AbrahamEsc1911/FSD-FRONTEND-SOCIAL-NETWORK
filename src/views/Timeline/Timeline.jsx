import React, { useContext, useEffect, useState } from "react";
import { createPost, likeDislike, timeline } from "../../Services/posts.services";
import { newComments } from "../../Services/comments.services";
import { useNavigate } from "react-router-dom";
import { CPostBlock } from "../../components/CPostBlock/CPostBlock";
import { CBlockContent } from "../../components/CBlockContent/CBlockContent";
import "./Timeline.css";
import { followUser, getAllUsers, userProfile } from "../../Services/user.services";
import { CRecomendationBlock } from "../../components/CRecomendationBlock/CRecomendationBlock";
import { CNewPost } from "../../components/CNewPost/CNewPost";
import { NavigationContext } from "../../Context/NavigationContext/NavigationContext";
import { Loader } from "../../components/Loader/Loader";
import { CSearch } from "../../components/CSearch/CSearch";

export const Timeline = () => {
  const passport = JSON.parse(localStorage.getItem("passport"));
  let token = null;
  let userId = null;
  if (passport) {
    token = passport.token;
    userId = passport.tokenData.id;
  }

  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);
  const [usersToFollow, setusersToFollow] = useState([]);
  const [errorPostMessage, setErrorPostMessage] = useState(false);
  const [errorEmptyPost, setErrorEmptyPost] = useState(false);
  const { setNavigation } = useContext(NavigationContext)
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState({
    message: "",
  });
  const [newComment, setNewComment] = useState({
    comment: "",
  });
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    createdAt: "",
    posts: [],
    followers: [],
    following: [],
    phone: "phone",
    city: "city",
    born: "born",
    profile: "",
  });

  useEffect(() => {
    if (passport) {
      const timelinePosts = async () => {
        const res = await timeline(token);
        const user = await userProfile(token);
        const bringUsers = await getAllUsers(token);

        setAllPosts(res.data);
        setUserData(user.data);
        setusersToFollow(bringUsers.data);
        setNavigation('timeline')
        setTimeout(() => {
          setLoading(false);
        }, 500);
      };
      timelinePosts();
    } else {
      navigate('../')
    }
  }, []);

  const postById = async (e) => {
    const id = e.target.name;
    navigate(`/post/${id}`);
  };

  const handleMessage = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addComments = (e) => {
    setNewComment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendPosts = async () => {
    if (newPost.message.length > 0) {
      const res = await createPost(token, newPost);
      if (res.success) {
        setNewPost({ message: "" });
        const res = await timeline(token);
        setAllPosts(res.data);
        setErrorPostMessage(false);
        setErrorEmptyPost(false);
      } else {
        setErrorPostMessage(true);
      }
    } else {
      setErrorEmptyPost(true);
    }
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

  const follow = async (e) => {
    const followId = e.target.name;
    if (followId) {
      await followUser(token, followId);
      const bringUsers = await getAllUsers(token);
      const res = await timeline(token);
      setusersToFollow(bringUsers.data);
      setAllPosts(res.data);
    }
  };

  const userById = async (userId) => {
    navigate(`../user/${userId}`);
  };

  return (
    <>
      <div>
        {loading && <Loader />}
      </div>
      <div>
        {!loading && (
          <div className="timeline-body">
            <div className="timeline-section-one">
              <div>
                <CSearch />
              </div>
              <div>
                <CBlockContent
                  content={
                    <CNewPost
                      showOrNotIconClose="hidden-content"
                      userName={userData.name}
                      profile={userData.profile}
                      buttonName="message"
                      inputName="message"
                      onChange={handleMessage}
                      onClick={sendPosts}
                      clasNameForEmtyMessage={errorEmptyPost ? "" : "hidden-content"}
                      clasNameforErrorMessage={errorPostMessage ? "" : "hidden-content"}
                      classTextArea="textarea-small-size"
                    />
                  }
                />
              </div>
              <h1 id="main-text-on-feeds">Feeds</h1>
              <div>
                {allPosts.map((post) => {
                  if (post.likes.includes(userData._id)) {
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
                              newCommentProfile={userData.profile}
                              postId={post._id}
                              onClickToPostById={postById}
                              onClickToLike={likeThisPosts}
                              onChangeComments={addComments}
                              onClickToSentComments={sendComment}
                              creatorId={post.user._id}
                              onClickToGoUserProfile={userById}
                              classNameButtonLike={"dislike"}
                            />
                          }
                        />
                      </div>
                    );
                  } else if (!post.likes.includes(userData._id)) {
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
                              newCommentProfile={userData.profile}
                              postId={post._id}
                              onClickToPostById={postById}
                              onClickToLike={likeThisPosts}
                              onChangeComments={addComments}
                              onClickToSentComments={sendComment}
                              creatorId={post.user._id}
                              onClickToGoUserProfile={userById}
                              classNameButtonLike={"like"}
                            />
                          }
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="timeline-section-two">
              <CBlockContent
                content={
                  <div>
                    <h3 id="title-suggested-users">Seggestions for you</h3>
                    {usersToFollow.map((user) => {
                      if (!user.followers.includes(userId) && user._id !== userId) {
                        return (
                          <div key={user._id}>
                            <CRecomendationBlock
                              profile={user.profile}
                              userName={user.name}
                              city={user.city}
                              buttonName={user._id}
                              buttonOnClick={follow}
                              userProfile={user._id}
                              onClickToGoUserProfile={userById}
                            />
                          </div>
                        );
                      }
                      return null; 
                    })}
                  </div>
                }
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
