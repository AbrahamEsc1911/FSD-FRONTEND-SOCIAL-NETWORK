import React, { useContext, useEffect, useState } from 'react'
import { updateProfile, userProfile } from '../../Services/user.services'
import { useNavigate } from 'react-router-dom'
import { CInputs } from '../../components/CInputs/CInputs'
import './Profile.css'
import { likeDislike } from '../../Services/posts.services'
import { newComments } from '../../Services/comments.services'
import { NewPostContext } from '../../Context/NewPostContext/NewPostContext'
import { CBlockContent } from '../../components/CBlockContent/CBlockContent'
import { CSectionOneProfile } from '../../components/CSectionOneProfile/CSectionOneProfile'
import { CSectionTwoProfile } from '../../components/CSectionTwoProfile/CSectionTwoProfile'

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
            followers: [],
            following: [],
            phone: 'phone',
            city: 'city',
            born: 'born'
        }
    )

    const [userUpdate, setUserUpdate] = useState(
        {
            name: "",
            email: "",
            phone: "",
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
    const { newPostPop } = useContext(NewPostContext)

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

    }, [newPostPop])

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

        if (userUpdate.name.length === 0 && userUpdate.email.length === 0 &&  userUpdate.phone.length === 0) {
            return setWargingMessage(true)
        } else {
            setWargingMessage(false)
        }

        if (userUpdate.name.length === 0 && userUpdate.email.length === 0) {
            const { name, email, ...newUserUpdate } = userUpdate
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

        } else if (userUpdate.name.length === 0 && userUpdate.phone.length === 0) {
            const { name, phone, ...newUserUpdate } = userUpdate
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

        } else if (userUpdate.email.length === 0 && userUpdate.phone.length === 0) {
            const { phone, email, ...newUserUpdate } = userUpdate
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
        } else if (userUpdate.name.length === 0 ) {
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
        } else if (userUpdate.email.length === 0 ) {
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
        } else if (userUpdate.phone.length === 0 ) {
            const { phone, ...newUserUpdate } = userUpdate
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
        const response = await likeDislike(token, postId)
        console.log(response)
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
        if (response.success) {
            const userUpdated = await userProfile(token)
            setUserData(userUpdated.data)
        } else {
            console.log("error creating a new comment")
        }
    }

    const postById = async (e) => {
        const id = e.target.name
        navigate(`/post/${id}`)
    }

    return (
        <>

            <CBlockContent content={
                (
                    <div>
                        <div>
                            <CSectionOneProfile
                                profile={userData.profile}
                                name={userData.name}
                                email={userData.email}
                                posts={userData.posts.length}
                                followers={userData.followers.length}
                                following={userData.following.length}
                            />
                        </div>
                        <div>
                            {!editProfileData && <CSectionTwoProfile
                                bornDate={userData.born}
                                phone={userData.phone}
                                city={userData.city}
                                value={editProfileData ? "Cancel" : "Edit profile"}
                                onClick={editProfile}
                            />} {
                                editProfileData && <div className='edit-profile-form'>
                                    <div className='profile-form-content'>
                                        <div>
                                            <CInputs type="text" name="name" placeholder="Name" className='input-text-main' onChange={handleNewData} />
                                        </div>
                                        <div>
                                            <CInputs type="email" name="email" placeholder="Email" className='input-text-main' onChange={handleNewData} />
                                        </div>
                                        <div>
                                            <CInputs type="number" name="phone" placeholder="Phone" className='input-text-main' onChange={handleNewData} />
                                        </div>
                                        <div>
                                           <p className={wargingMessage ? "" : "hidden-content"}>Nothin to update</p>
                                           <p className={errorUpdatingUser ? "" : "hidden-content"}>{errorMessage}</p>
                                        </div>
                                        <div>
                                            <CInputs type="button" value={editProfileData ? "Cancel" : "Edit profile"} className='cancel-button' onClick={editProfile} />
                                            <CInputs type="button" value="guardar" className='common-button' onClick={saveChangesButton} />
                                        </div>
                                    </div>

                                </div>
                            }
                        </div>
                    </div>
                )
            } />

            <CBlockContent content={
                (
                    <div>POSTS: {
                        userData.posts.map((posts) => {
                            if (posts.likes.includes(userData._id)) {
                                return (
                                    <div key={posts._id}>
                                        <div> <img id='profile-photo' src={userData.profile} alt="foto perfil" /></div>
                                        <div>{userData.name}</div>
                                        <div>post: {posts.post_message}</div>
                                        <div>createdAt: {posts.createdAt}</div>
                                        <div>likes: {posts.likes.length}</div>
                                        <CInputs type="button" value="Dislike" name={posts._id} onClick={likeThisPosts} />
                                        <CInputs type="button" value={`Comments ${posts.comments.length}`} name={posts._id} onClick={postById} />
                                        <CInputs type="text" placeholder="add a comment" name="comment" onChange={addComments} maxLength={250} />
                                        <CInputs type="button" value="send" name={posts._id} onClick={sendComment} />
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={posts._id}>
                                        <div> <img id='profile-photo' src={userData.profile} alt="foto perfil" /></div>
                                        <div>{userData.name}</div>
                                        <div>post: {posts.post_message}</div>
                                        <div>createdAt: {posts.createdAt}</div>
                                        <div>likes: {posts.likes.length}</div>
                                        <CInputs type="button" value="like" name={posts._id} onClick={likeThisPosts} />
                                        <CInputs type="button" value={`Comments ${posts.comments.length}`} name={posts._id} onClick={postById} />
                                        <CInputs type="text" placeholder="add a comment" name="comment" onChange={addComments} maxLength={250} />
                                        <CInputs type="button" value="send" name={posts._id} onClick={sendComment} />
                                    </div>
                                )
                            }
                        })
                    }</div>
                )
            } />
        </>
    )
}
