import React, { useState } from 'react'
import { CInputs } from '../../components/CInputs/CInputs'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../Services/posts.services'

export const NewPost = () => {

    const navigate = useNavigate()
    const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    if (passport) {
        token = passport.token
    } else {
        navigate('/login')
    }


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

    const sendPosts = async () => {
        const res = await createPost(token, newPost)
        console.log(res)
    }

    return (
        <>
            <CInputs type="text" placeholder="New Post" name="message" onChange={handleMessage} maxLength={250} />
            <CInputs type="button" value="send" name="message" onClick={sendPosts} />
        </>
    )
}
