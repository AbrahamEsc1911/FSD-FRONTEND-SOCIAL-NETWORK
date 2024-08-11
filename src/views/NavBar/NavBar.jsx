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
  const {newPostPop, setNewPostPop} = useContext(NewPostContext)
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
    setNewPostPop(!newPostPop)
  }

  const sendPosts = async () => {
    if (newPost.message.length > 0) {
      const res = await createPost(token, newPost)
      if (res.success) {
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
      <div className='nav-bar-block'>
        <div className='nav-bar-block-items'>
          <div className='nav-bar-icon'>
            <img src="./images/home.svg" alt="home-icon" className='nav-bar-icon-content' />
          </div>
          <div className='nav-bar-text'>
            <CNavigation path="/" content="home" />
          </div>
        </div>
        <div className='nav-bar-block-items'>
          <div className='nav-bar-icon'>
            <img src="./images/profile.svg" alt="profile-icon" className='nav-bar-icon-content' />
          </div>
          <div className='nav-bar-text'>
            <CNavigation path="/profile" content="Profile" />
          </div>
        </div>
        <div className='nav-bar-block-items-special'>
          <div className='nav-bar-icon'>
            <img src="./images/post.svg" alt="post-icon" className='nav-bar-icon-content' />
          </div>
          <div className='nav-bar-text-special'>
            <div onClick={newPostPopUp}>New Post</div>
          </div>
        </div>
        <div className='nav-bar-block-items'>
          <div className='nav-bar-icon'>
            <img src="./images/logout.svg" alt="logout-icon" className='nav-bar-icon-content' />
          </div>
          <div className='nav-bar-text'>
            <p onClick={logout}>Logout</p>
          </div>
        </div>
      </div>


      {newPostPop && (
        <div className="overlay">
          <div><CInputs type="text" placeholder="New Post" name="message" onChange={handleMessage} maxLength={250} /></div>
          <div><CInputs type="button" value="send" name="message" onClick={sendPosts} /></div>
          <div className={errorPostMessage ? "" : "hidden-content"}>Error creating a new posts, try again later</div>
          <div className={errorEmptyPost ? "" : "hidden-content"}>new post coulnt be empty</div>
          <div><input type="button" value="Close" onClick={newPostPopUp}/></div>
        </div>
      )
      }
    </>
  )
}