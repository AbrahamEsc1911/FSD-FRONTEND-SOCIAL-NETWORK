import React, { useEffect, useState } from 'react'
import { userProfile } from '../../Services/user.services'
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

    const navigate = useNavigate()
    const [editProfileData, setEditProfileData] = useState(false)

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

    const likeThisPosts = async (e) => {
        const postId = e.target.name
        const response = await likeDislike(token, postId)
    }

    const editProfile = () => {
        setEditProfileData(!editProfileData)
    }

    const dataUpdate = () => {

    }

    return (
        <>
            <p className={editProfileData ? "hidden-content" : ""}>nombre: {userData.name}</p>
            <CInputs type="text" name="name" placeholder="name" className={editProfileData ? "" : "hidden-content"} onChange={dataUpdate} />
            <p className={editProfileData ? "hidden-content" : ""}>email: {userData.email}</p>
            <CInputs type="email" name="email" placeholder="email" className={editProfileData ? "" : "hidden-content"} onChange={dataUpdate} />
            <p>id: {userData._id}</p>
            <p>desde: {userData.createdAt}</p>
            <p>followers: {userData.followers.length}</p>
            <CInputs type="button" value="Edit profile" onClick={editProfile} />
            <div>posts: {
                userData.posts.map((posts) => {
                    return (
                        <div key={posts._id}>
                            <div>post: {posts.post_message}</div>
                            <div>createdAt: {posts.updatedAt}</div>
                            <div>likes: {posts.likes.length}</div>
                            <div>Comments: {posts.comments.length}</div>
                            <CInputs type="button" value="like" name={posts._id} onClick={likeThisPosts} />
                        </div>
                    )
                })
            }</div>
            <p>Está activo: {userData.is_active ? "Si" : "No"}</p>
        </>
    )
}
