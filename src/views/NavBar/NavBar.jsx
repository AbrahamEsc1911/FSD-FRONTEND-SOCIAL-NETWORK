import React, { useContext, useState } from 'react'
import { CNavigation } from '../../components/CNavigation/CNavigation'
import { CInputs } from '../../components/CInputs/CInputs'
import { useNavigate } from 'react-router-dom'
import { NewPostContext } from '../../Context/NewPostContext/NewPostContext'
import { createPost } from '../../Services/posts.services'

export const NavBar = () => {

  const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    if (passport) { token = passport.token }

  const navigate = useNavigate()
  const { setNewPostPop } = useContext(NewPostContext)
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
    await createPost(token, newPost)
    setNewPostPop(false)
  }

  const logout = () => {
    localStorage.removeItem("passport")
    navigate("/login")
  }

  return (
    <>
      <div>
        <CInputs type="text" placeholder="New Post" name="message" onChange={handleMessage} maxLength={250} />
        <CInputs type="button" value="send" name="message" onClick={sendPosts} />
      </div>

      <CNavigation path="/" content="home" />
      <CNavigation path="/profile" content="profile" />
      <div onClick={newPostPopUp}>New Post</div>
      <CInputs type="button" value="logout" onClick={logout} />
    </>
  )
}