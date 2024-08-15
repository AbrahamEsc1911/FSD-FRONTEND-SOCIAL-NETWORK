import React, { useContext, useEffect, useState } from 'react'
import { getPostById, likeDislike } from '../../Services/posts.services'
import { useNavigate, useParams } from 'react-router-dom'
import { CInputs } from '../../components/CInputs/CInputs'
import { PostContext } from '../../Context/postContext/postContex'
import { newComments } from '../../Services/comments.services'
import { CBlockContent } from '../../components/CBlockContent/CBlockContent'
import { CPostBlock } from '../../components/CPostBlock/CPostBlock'

export const SiglePost = () => {

    const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    let userId = null
    if (passport) {
        token = passport.token
        userId = passport.tokenData.id
    }

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

    const [newComment, setNewComment] = useState(
        {
            comment: ""
        }
    )

    const navigate = useNavigate()
    const { setPostId } = useContext(PostContext)

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
            setPostId(id)
            navigate('/login')
        }
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
            const res = await getPostById(id)
            setPost(res.data)
           
        } else {
            console.log("error creating a new comment")
        }
    }

    return (
        <>
        < CBlockContent 
        content={
            (
                <CPostBlock
                creatorProfile={post.user.profile}
                creatorName={post.user.name}
                message={post.post_message}
                createdAt={post.createdAt}
                likeCount={post.likes.length}
                commentCount={post.comments.length}
                newCommentProfile={post.user.profile}
                postId={post._id}
                onClickToLike={likeThisPosts}
                onChangeComments={addComments}
                onClickToSentComments={sendComment}
                />
            )
        }   
        />
        
            <p>{post.user.name}</p>
            <p>{post.post_message}</p>
            <p>{post.createdAt}</p>
            <p>likes: {post.likes.length}</p>
            <p>comentarios: {post.comments.length}</p>
            <div></div>
            <CInputs type="button" value={post.likes.includes(userId) ? "Dislike" : "like"} name={post._id} onClick={likeThisPosts} />
            <CInputs type="text" placeholder="add a comment" name="comment" onChange={addComments} maxLength={250} />
            <CInputs type="button" value="send" name={post._id} onClick={sendComment} />


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
