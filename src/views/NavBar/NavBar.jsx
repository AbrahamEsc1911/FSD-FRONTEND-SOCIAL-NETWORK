import React, { useContext, useState } from 'react'
import { CNavigation } from '../../components/CNavigation/CNavigation'
import { CInputs } from '../../components/CInputs/CInputs'
import { useNavigate } from 'react-router-dom'
import { NewPostContext } from '../../Context/NewPostContext/NewPostContext'
import { createPost } from '../../Services/posts.services'
import './NavBar.css'

export const NavBar = () => {

  const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    if (passport) { token = passport.token }

  const navigate = useNavigate()
  const [errorPostMessage, setErrorPostMessage] = useState(false)
  const [errorEmptyPost, setErrorEmptyPost] = useState(false)
  const { newPostPop,setNewPostPop } = useContext(NewPostContext)
  const [newPost, setNewPost] = useState(
    {
      message: ""
    }
  )

  const handleMessage = (e) => {
    setNewPost(prevState => (
      {
        ...prevState,
        [e.target.name]: e.target.value
      })
    )
  }

  const newPostPopUp = () => {
    setNewPostPop(true)
  }

  const sendPosts = async () => {
    if(newPost.message.length > 0){
      const res = await createPost(token, newPost)
      if(res.success){
      setNewPostPop(false)
      setErrorPostMessage(false)
      setErrorEmptyPost(false)
    } else {
      setErrorPostMessage(true)
    }
    } else {
      setErrorEmptyPost(true)
    }
    
  }

  const logout = () => {
    localStorage.removeItem("passport")
    navigate("/login")
  }

  return (
    <>
      <div className={newPostPop ? "" : "hidden-content"}>
        <CInputs type="text" placeholder="New Post" name="message" onChange={handleMessage} maxLength={250} />
        <CInputs type="button" value="send" name="message" onClick={sendPosts} />
        <div className={errorPostMessage ? "" : "hidden-content"}>Error creating a new posts, try again later</div>
        <div className={errorEmptyPost ? "" : "hidden-content"}>new post coulnt be empty</div>
      </div>

      <CNavigation path="/" content="home" />
      <CNavigation path="/profile" content="profile" />
      <div onClick={newPostPopUp}>New Post</div>
      <CInputs type="button" value="logout" onClick={logout} />
    </>
  )
}