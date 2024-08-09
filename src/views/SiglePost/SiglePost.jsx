import React, { useEffect, useState } from 'react'
import { getPostById, likeDislike } from '../../Services/posts.services'
import { useNavigate, useParams } from 'react-router-dom'
import { CInputs } from '../../components/CInputs/CInputs'

export const SiglePost = () => {

    const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    if (passport) { token = passport.token }

    const { id } = useParams()
    const [post, setPost] = useState(
        {
            comments: [],
            createdAt: "",
            likes: [],
            post_message: "",
            user: {},
            _id: ""
        }
    )
    const navigate = useNavigate()

    useEffect(() => {

        const bringPostById = async () => {
            const res = await getPostById(id)
            setPost(res.data)
        };

        bringPostById()

    }, [])

    const likeThisPosts = async (e) => {
        const postId = e.target.name
        if (token) {
            await likeDislike(token, postId)
            const res = await getPostById(id)
            setPost(res.data)
        } else {
            navigate('/login')
        }
    }

    return (
        <>
            <p>{post.user.name}</p>
            <p>{post.post_message}</p>
            <p>{post.createdAt}</p>
            <p>likes: {post.likes.length}</p>
            <p>comentarios: {post.comments.length}</p>
            <CInputs type="button" value="like" name={post._id} onClick={likeThisPosts} />
            <div> Comentarios:
                {post.comments.map((comments) => {
                    return (
                        <div key={comments._id}>
                            <div>{comments.user.name}</div>
                            <div><img src={comments.user.profile} alt="user-profile" /></div>
                            <div>{comments.message}</div>
                            <div>{comments.createdAt}</div>
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}
