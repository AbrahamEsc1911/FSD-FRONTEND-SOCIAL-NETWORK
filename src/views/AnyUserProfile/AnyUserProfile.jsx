import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  followUser,
  getUserById,
  userProfile,
} from "../../Services/user.services";
import { CInputs } from "../../components/CInputs/CInputs";
import { AnyUserContex } from "../../Context/AnyUserProfileContext/anyUserProfileContext";
import { CBlockContent } from "../../components/CBlockContent/CBlockContent";
import { CSectionOneProfile } from "../../components/CSectionOneProfile/CSectionOneProfile";
import { CSectionTwoProfile } from "../../components/CSectionTwoProfile/CSectionTwoProfile";
import "./AnyUserProfile.css";
import { CPostBlock } from "../../components/CPostBlock/CPostBlock";
import { newComments } from "../../Services/comments.services";
import { likeDislike } from "../../Services/posts.services";

export const AnyUserProfile = () => {
  const passport = JSON.parse(localStorage.getItem("passport"));
  let token = null;
  let userId = null;
  if (passport) {
    (token = passport.token), (userId = passport.tokenData.id);
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const { setNavigationPath } = useContext(AnyUserContex);
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

  const [userToken, setUserToken] = useState({
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

  const [newComment, setNewComment] = useState({
    comment: "",
  });

  useEffect(() => {
    if (passport) {
      const bringUser = async () => {
        const allProfile = await getUserById(id);
        const userToken = await userProfile(token);
        if (allProfile.success) {
          setUserData(allProfile.data);
          setUserToken(userToken.data);
        }
      };
      bringUser();
    } else {
      navigate("./login");
    }
  }, []);

  const followUnfollow = async (e) => {
    const id = e.target.name;
    if (passport) {
      await followUser(token, id);
      const res = await getUserById(id);
      setUserData(res.data);
    } else {
      setNavigationPath(id);
      navigate("/login");
    }
  };

  const postById = async (e) => {
    const id = e.target.name;
    navigate(`/post/${id}`);
  };

  const likeThisPosts = async (e) => {
    let postId = null;
    if (e) {
      postId = e.target.name;
    }
    await likeDislike(token, postId);
    const userUpdated = await getUserById(id);
    setUserData(userUpdated.data);
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
      const userUpdated = await getUserById(id);
      setUserData(userUpdated.data);
    } else {
      console.log("error creating a new comment");
    }
  };

  const userById = async (userId) => {
    navigate(`../user/${userId}`);
  };

  return (
    <>
      <div className="any-user-profile-body">
        <div className="any-user-profile-section-one">
          <CBlockContent
            content={
              <div>
                <div>
                  <CSectionOneProfile
                    portada={"../images/portada.jpg"}
                    profile={`../${userData.profile}`}
                    name={userData.name}
                    email={userData.email}
                    posts={userData.posts.length}
                    followers={userData.followers.length}
                    following={userData.following.length}
                  />
                  <div>
                    <CSectionTwoProfile
                      bornDate={userData.born}
                      phone={userData.phone}
                      city={userData.city}
                      value={
                        userData.followers.includes(userId)
                          ? "Unfollow"
                          : "Follow"
                      }
                      buttonName={userData._id}
                      onClick={followUnfollow}
                      className={
                        userData.followers.includes(userId)
                          ? "unfollow-button"
                          : "follow-button"
                      }
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>
        <div className="any-user-profile-section-two">
          {userData.posts.map((posts) => {
            if (posts.likes.includes(userToken._id)) {
              return (
                <div key={posts._id}>
                  <CBlockContent
                    content={
                      <CPostBlock
                        creatorProfile={`../${userData.profile}`}
                        creatorName={userData.name}
                        message={posts.post_message}
                        createdAt={posts.createdAt}
                        likeCount={posts.likes.length}
                        commentCount={posts.comments.length}
                        newCommentProfile={`../${userToken.profile}`}
                        postId={posts._id}
                        value="comment"
                        onClickToPostById={postById}
                        onClickToLike={likeThisPosts}
                        onChangeComments={addComments}
                        onClickToSentComments={sendComment}
                        creatorId={userData._id}
                        onClickToGoUserProfile={userById}
                        classNameButtonLike={"dislike"}
                      />
                    }
                  />
                </div>
              );
            } else if (!posts.likes.includes(userToken._id)) {
              return (
                <div key={posts._id}>
                  <CBlockContent
                    content={
                      <CPostBlock
                        creatorProfile={`../${userData.profile}`}
                        creatorName={userData.name}
                        message={posts.post_message}
                        createdAt={posts.createdAt}
                        likeCount={posts.likes.length}
                        commentCount={posts.comments.length}
                        newCommentProfile={userToken.profile}
                        postId={posts._id}
                        value="comment"
                        onClickToPostById={postById}
                        onClickToLike={likeThisPosts}
                        onChangeComments={addComments}
                        onClickToSentComments={sendComment}
                        creatorId={userData._id}
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
    </>
  );
};
