import React, { useContext, useEffect, useState } from "react";
import { CNavigation } from "../../components/CNavigation/CNavigation";
import { useNavigate } from "react-router-dom";
import { NewPostContext } from "../../Context/NewPostContext/NewPostContext";
import { createPost } from "../../Services/posts.services";
import "./NavBar.css";
import { CBlockContent } from "../../components/CBlockContent/CBlockContent";
import { CNewPost } from "../../components/CNewPost/CNewPost";
import { userProfile } from "../../Services/user.services";
import { NavBarContext } from "../../Context/NavBarContext/NavBarContext";
import { NavigationContext } from "../../Context/NavigationContext/NavigationContext";

export const NavBar = () => {
  const passport = JSON.parse(localStorage.getItem("passport"));
  let token = null;
  if (passport) {
    token = passport.token;
  }

  const navigate = useNavigate();
  const [errorPostMessage, setErrorPostMessage] = useState(false);
  const [errorEmptyPost, setErrorEmptyPost] = useState(false);
  const { newPostPop, setNewPostPop } = useContext(NewPostContext);
  const {navigation} = useContext(NavigationContext)
  const {setNavBar} = useContext(NavBarContext)
  const [newPost, setNewPost] = useState({
    message: "",
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
      const bringprofile = async () => {
        const response = await userProfile(token);
        if (response) {
          setUserData(response.data);
          console.log(navBar)
        }
      };

      bringprofile();
    } else {
      navigate("/login");
    }
  }, []);

  const handleMessage = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const newPostPopUp = () => {
    setNewPostPop(!newPostPop);
    setErrorPostMessage(false);
    setErrorEmptyPost(false);
    setNewPost({message: "",});
  };

  const sendPosts = async () => {
    if (newPost.message.length > 0) {
      const res = await createPost(token, newPost);
      if (res.success) {
        setNewPost({message: "",});
        setNewPostPop(false);
        setErrorPostMessage(false);
        setErrorEmptyPost(false);
      } else {
        setErrorPostMessage(true);
      }
    } else {
      setErrorEmptyPost(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("passport");
    setNavBar(false)
    navigate("/login");
  };

  return (
    <>
      <div className="nav-bar-block">
        <div className="nav-bar-block-items">
          <div className="nav-bar-icon">
            <img
              src="../images/home.svg"
              alt="home-icon"
              className="nav-bar-icon-content"
            />
          </div>
          <div className="nav-bar-text">
            <CNavigation path="/" content="home" isActive={navigation === 'timeline'} />
          </div>
        </div>
        <div className="nav-bar-block-items">
          <div className="nav-bar-icon">
            <img
              src="../images/profile.svg"
              alt="profile-icon"
              className="nav-bar-icon-content"
            />
          </div>
          <div className="nav-bar-text">
            <CNavigation path="/profile" content="Profile" isActive={navigation === 'profile'} />
          </div>
        </div>
        <div className="nav-bar-block-items-special">
          <div className="nav-bar-icon">
            <img
              src="../images/post.svg"
              alt="post-icon"
              className="nav-bar-icon-content"
            />
          </div>
          <div className="nav-bar-text-special">
            <div onClick={newPostPopUp}>New Post</div>
          </div>
        </div>
        <div className="nav-bar-block-items">
          <div className="nav-bar-icon">
            <img
              src="../images/logout.svg"
              alt="logout-icon"
              className="nav-bar-icon-content"
            />
          </div>
          <div className="nav-bar-text">
            <p onClick={logout}>Logout</p>
          </div>
        </div>
      </div>

      {newPostPop && (
        <div className="overlay">
          <CBlockContent
            content={
              <CNewPost
                userName={userData.name}
                profile={userData.profile}
                buttonName="message"
                inputName="message"
                onChange={handleMessage}
                onClick={sendPosts}
                clasNameForEmtyMessage={errorEmptyPost ? "" : "hidden-content"}
                clasNameforErrorMessage={
                  errorPostMessage ? "" : "hidden-content"
                }
                onClickClose={newPostPopUp}
              />
            }
          />
        </div>
      )}
    </>
  );
};
