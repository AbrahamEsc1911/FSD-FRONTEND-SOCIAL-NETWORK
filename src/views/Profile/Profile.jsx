import React, { useContext, useEffect, useState } from "react";
import {
  getUserById,
  updateProfile,
  userProfile,
} from "../../Services/user.services";
import { useNavigate } from "react-router-dom";
import { CInputs } from "../../components/CInputs/CInputs";
import "./Profile.css";
import { createPost, likeDislike } from "../../Services/posts.services";
import { newComments } from "../../Services/comments.services";
import { NewPostContext } from "../../Context/NewPostContext/NewPostContext";
import { CBlockContent } from "../../components/CBlockContent/CBlockContent";
import { CSectionOneProfile } from "../../components/CSectionOneProfile/CSectionOneProfile";
import { CSectionTwoProfile } from "../../components/CSectionTwoProfile/CSectionTwoProfile";
import { CPostBlock } from "../../components/CPostBlock/CPostBlock";
import { CNewPost } from "../../components/CNewPost/CNewPost";

export const Profile = () => {
  const passport = JSON.parse(localStorage.getItem("passport"));
  let token = null;
  let userProfileId = null
  if (passport) {
    token = passport.token;
    userProfileId = passport.tokenData.id
  }

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
    portada: ""
  });

  const [userUpdate, setUserUpdate] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [newComment, setNewComment] = useState({
    comment: "",
  });

  const [newPost, setNewPost] = useState({
    message: "",
  });

  const navigate = useNavigate();
  const [editProfileData, setEditProfileData] = useState(false);
  const [wargingMessage, setWargingMessage] = useState(false);
  const [errorUpdatingUser, setErrorUpdatingUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { newPostPop } = useContext(NewPostContext);
  const [errorPostMessage, setErrorPostMessage] = useState(false);
  const [errorEmptyPost, setErrorEmptyPost] = useState(false);

  useEffect(() => {
    if (passport) {
      const bringprofile = async () => {
        const response = await userProfile(token);
        if (response.success) {
          setUserData(response.data);
        }
      };

      bringprofile();
    } else {
      navigate("/login");
    }
  }, [newPostPop]);

  const editProfile = () => {
    setEditProfileData(!editProfileData);
    setWargingMessage(false);
    setErrorUpdatingUser(!errorMessage);
  };

  const handleNewData = (e) => {
    setUserUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMessage = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendPosts = async () => {
    if (newPost.message.length > 0) {
      const res = await createPost(token, newPost);
      if (res.success) {
        const userUpdated = await userProfile(token);
        setNewPost({ message: "" });
        setUserData(userUpdated.data);
        setErrorPostMessage(false);
        setErrorEmptyPost(false);
        setTextPost('')
      } else {
        setErrorPostMessage(true);
      }
    } else {
      setErrorEmptyPost(true);
    }
  };

  const saveChangesButton = async () => {
    if (
      userUpdate.name.length === 0 &&
      userUpdate.email.length === 0 &&
      userUpdate.phone.length === 0
    ) {
      return setWargingMessage(true);
    } else {
      setWargingMessage(false);
    }

    if (userUpdate.name.length === 0 && userUpdate.email.length === 0) {
      const { name, email, ...newUserUpdate } = userUpdate;
      const result = await updateProfile(token, newUserUpdate);
      if (result.success) {
        setEditProfileData(false);
        setErrorUpdatingUser(false);
        const userUpdated = await userProfile(token);
        setUserData(userUpdated.data);
      } else {
        setErrorUpdatingUser(true);
        setErrorMessage(result.message);
      }
    } else if (userUpdate.name.length === 0 && userUpdate.phone.length === 0) {
      const { name, phone, ...newUserUpdate } = userUpdate;
      const result = await updateProfile(token, newUserUpdate);
      if (result.success) {
        setEditProfileData(false);
        setErrorUpdatingUser(false);
        const userUpdated = await userProfile(token);
        setUserData(userUpdated.data);
      } else {
        setErrorUpdatingUser(true);
        setErrorMessage(result.message);
      }
    } else if (userUpdate.email.length === 0 && userUpdate.phone.length === 0) {
      const { phone, email, ...newUserUpdate } = userUpdate;
      const result = await updateProfile(token, newUserUpdate);
      if (result.success) {
        setEditProfileData(false);
        setErrorUpdatingUser(false);
        const userUpdated = await userProfile(token);
        setUserData(userUpdated.data);
      } else {
        setErrorUpdatingUser(true);
        setErrorMessage(result.message);
      }
    } else if (userUpdate.name.length === 0) {
      const { name, ...newUserUpdate } = userUpdate;
      const result = await updateProfile(token, newUserUpdate);
      if (result.success) {
        setEditProfileData(false);
        setErrorUpdatingUser(false);
        const userUpdated = await userProfile(token);
        setUserData(userUpdated.data);
      } else {
        setErrorUpdatingUser(true);
        setErrorMessage(result.message);
      }
    } else if (userUpdate.email.length === 0) {
      const { email, ...newUserUpdate } = userUpdate;
      const result = await updateProfile(token, newUserUpdate);
      if (result.success) {
        setEditProfileData(false);
        setErrorUpdatingUser(false);
        const userUpdated = await userProfile(token);
        setUserData(userUpdated.data);
      } else {
        setErrorUpdatingUser(true);
        setErrorMessage(result.message);
      }
    } else if (userUpdate.phone.length === 0) {
      const { phone, ...newUserUpdate } = userUpdate;
      const result = await updateProfile(token, newUserUpdate);
      if (result.success) {
        setEditProfileData(false);
        setErrorUpdatingUser(false);
        const userUpdated = await userProfile(token);
        setUserData(userUpdated.data);
      } else {
        setErrorUpdatingUser(true);
        setErrorMessage(result.message);
      }
    } else {
      const result = await updateProfile(token, userUpdate);
      if (result.success) {
        setEditProfileData(false);
        setErrorUpdatingUser(false);
        const userUpdated = await userProfile(token);
        setUserData(userUpdated.data);
      } else {
        setErrorUpdatingUser(true);
        setErrorMessage(result.message);
      }
    }
  };

  const likeThisPosts = async (e) => {
    let postId = null;
    if (e) {
      postId = e.target.name;
    }
    await likeDislike(token, postId);
    const userUpdated = await userProfile(token);
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
      const userUpdated = await userProfile(token);
      setUserData(userUpdated.data);
    } else {
      console.log("error creating a new comment");
    }
  };

  const postById = async (e) => {
    const id = e.target.name;
    navigate(`/post/${id}`);
  };

  const userById = async (userId) => {
    if(userId !== userProfileId) {
      navigate(`../user/${userId}`);
    }
  };

  return (
    <>
      <div className="body-profile">
        <div className="profile-section-one">
          <CBlockContent
            content={
              <div className="parent-block-profile">
                <div>
                  <CSectionOneProfile
                    portada={"./images/portada.jpg"}
                    profile={userData.profile}
                    name={userData.name}
                    email={userData.email}
                    posts={userData.posts.length}
                    followers={userData.followers.length}
                    following={userData.following.length}
                  />
                </div>
                <div>
                  {!editProfileData && (
                    <CSectionTwoProfile
                      bornDate={userData.born}
                      phone={userData.phone}
                      city={userData.city}
                      value={editProfileData ? "Cancel" : "Edit profile"}
                      className="common-button"
                      onClick={editProfile}
                    />
                  )}{" "}
                  {editProfileData && (
                    <div className="edit-profile-form">
                      <div className="profile-form-content">
                        <div>
                          <CInputs
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="input-text-main"
                            onChange={handleNewData}
                          />
                        </div>
                        <div>
                          <CInputs
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input-text-main"
                            onChange={handleNewData}
                          />
                        </div>
                        <div>
                          <CInputs
                            type="number"
                            name="phone"
                            placeholder="Phone"
                            className="input-text-main"
                            onChange={handleNewData}
                          />
                        </div>
                        <div>
                          <p className={wargingMessage ? "" : "hidden-content"}>
                            Nothin to update
                          </p>
                          <p
                            className={
                              errorUpdatingUser ? "" : "hidden-content"
                            }
                          >
                            {errorMessage}
                          </p>
                        </div>
                        <div>
                          <CInputs
                            type="button"
                            value={editProfileData ? "Cancel" : "Edit profile"}
                            className="cancel-button"
                            onClick={editProfile}
                          />
                          <CInputs
                            type="button"
                            value="guardar"
                            className="common-button"
                            onClick={saveChangesButton}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            }
          />
        </div>
        <div className="profile-section-two">
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
              />
            }
          />
          {userData.posts.map((posts) => {
            if(posts.likes.includes(userData._id)){
              return (
                <div key={posts._id}>
                  <CBlockContent
                    content={
                      <CPostBlock
                        creatorProfile={userData.profile}
                        creatorName={userData.name}
                        message={posts.post_message}
                        createdAt={posts.createdAt}
                        likeCount={posts.likes.length}
                        commentCount={posts.comments.length}
                        newCommentProfile={userData.profile}
                        postId={posts._id}
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
            } else if(!posts.likes.includes(userData._id)){
              return (
                <div key={posts._id}>
                  <CBlockContent
                    content={
                      <CPostBlock
                        creatorProfile={userData.profile}
                        creatorName={userData.name}
                        message={posts.post_message}
                        createdAt={posts.createdAt}
                        likeCount={posts.likes.length}
                        commentCount={posts.comments.length}
                        newCommentProfile={userData.profile}
                        postId={posts._id}
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
