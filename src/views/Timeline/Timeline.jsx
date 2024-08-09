import React, { useEffect, useState } from 'react'
import { likeDislike, timeline } from '../../Services/posts.services'
import { CInputs } from '../../components/CInputs/CInputs'
import { newComments } from '../../Services/comments.services'
import { userProfile } from '../../Services/user.services'
import { useNavigate } from 'react-router-dom'

export const Timeline = () => {

    const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    let userId = null
    if (passport) { token = passport.token; userId = passport.tokenData.id }
    const [allPosts, setAllPosts] = useState([])
    const navigate = useNavigate()
    const [newComment, setNewComment] = useState(
        {
            comment: ""
        }
    )

    useEffect(() => {
        if (passport) {
            const timelinePosts = async () => {
                const res = await timeline(token)
                setAllPosts(res.data)
            };
            timelinePosts()
        }
    }, [])

    const postById = async (e) => {
        const id = e.target.name
        navigate(`/post/${id}`)
    }

    const addComments = (e) => {
        setNewComment(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            })
        )
    }

    const sendComment = async (e) => {
        const postId = e.target.name
        const response = await newComments(token, postId, newComment)
        if (response.success) {
            const res = await timeline(token)
            setAllPosts(res.data)
        } else {
            console.log("error creating a new comment")
        }
    }

    const likeThisPosts = async (e) => {
        const postId = e.target.name
        const response = await likeDislike(token, postId)
        console.log(response)
        const res = await timeline(token)
        setAllPosts(res.data)
    }

    return (
        <>
            <div>POSTS
                {
                    allPosts.map((post) => {
                        if (post.likes.includes(userId)) {
                            return (
                                <div key={post._id}>
                                    <div> {post.user.profile}</div>
                                    <div>{post.user.name}</div>
                                    <div>{post.post_message}</div>
                                    <div>likes: {post.likes.length}</div>
                                    <CInputs type="button" value={`Comments ${post.comments.length}`} name={post._id} onClick={postById} />
                                    <CInputs type="text" placeholder="add a comment" name="comment" onChange={addComments} maxLength={250} />
                                    <CInputs type="button" value="send" name={post._id} onClick={sendComment} />
                                    <CInputs type="button" value="dislike" name={post._id} onClick={likeThisPosts} />
                                </div>
                            )
                        } else {

                            return (
                                <div key={post._id}>
                                    <div> {post.user.profile}</div>
                                    <div>{post.user.name}</div>
                                    <div>{post.post_message}</div>
                                    <div>likes: {post.likes.length}</div>
                                    <CInputs type="button" value={`Comments ${post.comments.length}`} name={post._id} onClick={postById} />
                                    <CInputs type="text" placeholder="add a comment" name="comment" onChange={addComments} maxLength={250} />
                                    <CInputs type="button" value="send" name={post._id} onClick={sendComment} />
                                    <CInputs type="button" value="like" name={post._id} onClick={likeThisPosts} />
                                </div>
                            )
                        }


                    })
                }
            </div>

        </>
    )
}
