import React, { useEffect, useState } from 'react'
import { updateProfile, userProfile } from '../../Services/user.services'
import { useNavigate } from 'react-router-dom'
import { CInputs } from '../../components/CInputs/CInputs'
import './Profile.css'
import { likeDislike } from '../../Services/posts.services'

export const Profile = () => {

    const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    if (passport) { token = passport.token }

    const [userData, setUserData] = useState(
        {
            _id: "",
            name: "",
            email: "",
            createdAt: "",
            posts: [],
            followers: []
        }
    )

    const [userUpdate, setUserUpdate] = useState(
        {
            name: "",
            email: ""
        }
    )

    const [newComment, setNewComment] = useState(
        {
            comment: ""
        }
    )

    const navigate = useNavigate()
    const [editProfileData, setEditProfileData] = useState(false)
    const [wargingMessage, setWargingMessage] = useState(false)
    const [errorUpdatingUser, setErrorUpdatingUser] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {

        if (passport) {

            const bringprofile = async () => {

                const response = await userProfile(token)

                if (response) {
                    setUserData(response.data)
                }
            };

            bringprofile()

        } else {
            navigate("/login")
        }

    }, [])

    const editProfile = () => {
        setEditProfileData(!editProfileData)
        setWargingMessage(false)
        setErrorUpdatingUser(!errorMessage)
    }

    const handleNewData = (e) => {
        setUserUpdate(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            })
        )
    }

    const saveChangesButton = async () => {

        if (userUpdate.name.length === 0 && userUpdate.email.length === 0) {
            return setWargingMessage(true)
        } else {
            setWargingMessage(false)
        }

        if (userUpdate.name.length === 0) {
            const { name, ...newUserUpdate } = userUpdate
            const result = await updateProfile(token, newUserUpdate)
            if (result.success) {
                setEditProfileData(false)
                setErrorUpdatingUser(false)
                const userUpdated = await userProfile(token)
                setUserData(userUpdated.data)
            } else {
                setErrorUpdatingUser(true)
                setErrorMessage(result.message)
            }

        } else if (userUpdate.email.length === 0) {
            const { email, ...newUserUpdate } = userUpdate
            const result = await updateProfile(token, newUserUpdate)
            if (result.success) {
                setEditProfileData(false)
                setErrorUpdatingUser(false)
                const userUpdated = await userProfile(token)
                setUserData(userUpdated.data)
            } else {
                setErrorUpdatingUser(true)
                setErrorMessage(result.message)
            }

        } else {
            const result = await updateProfile(token, userUpdate)
            if (result.success) {
                setEditProfileData(false)
                setErrorUpdatingUser(false)
                const userUpdated = await userProfile(token)
                setUserData(userUpdated.data)
            } else {
                setErrorUpdatingUser(true)
                setErrorMessage(result.message)
            }
        }
    }

    const likeThisPosts = async (e) => {
        const postId = e.target.name
        await likeDislike(token, postId)
        const userUpdated = await userProfile(token)
        setUserData(userUpdated.data)
        
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
    }


    return (
        <>
            <p className={editProfileData ? "hidden-content" : ""}>nombre: {userData.name}</p>
            <CInputs type="text" name="name" placeholder="name" className={editProfileData ? "" : "hidden-content"} onChange={handleNewData} />
            <p className={editProfileData ? "hidden-content" : ""}>email: {userData.email}</p>
            <CInputs type="email" name="email" placeholder="email" className={editProfileData ? "" : "hidden-content"} onChange={handleNewData} />
            <p className={wargingMessage ? "" : "hidden-content"}>name or email required</p>
            <p className={errorUpdatingUser ? "" : "hidden-content"}>{errorMessage}</p>
            <p>id: {userData._id}</p>
            <p>desde: {userData.createdAt}</p>
            <p>followers: {userData.followers.length}</p>
            <p>Está activo: {userData.is_active ? "Si" : "No"}</p>
            <CInputs type="button" value={editProfileData ? "Cancel" : "Edit profile"} onClick={editProfile} />
            <CInputs type="button" value="guardar" className={editProfileData ? "" : "hidden-content"} onClick={saveChangesButton} />
            <div>posts: {
                userData.posts.map((posts) => {
                    return (
                        <div key={posts._id}>
                            <div>post: {posts.post_message}</div>
                            <div>createdAt: {posts.updatedAt}</div>
                            <div>likes: {posts.likes.length}</div>
                            <div>Comments: {posts.comments.length}</div>
                            <CInputs type="button" value="like" name={posts._id} onClick={likeThisPosts} />
                            <CInputs type="text" placeholder="add a comment" name="comment" onChange={addComments} maxLength={250}/>
                            <CInputs type="button" value="send" name={posts._id} onClick={sendComment} />
                        </div>
                    )
                })
            }</div>

        </>
    )
}
