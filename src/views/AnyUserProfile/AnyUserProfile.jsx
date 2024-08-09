import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { followUser, getUserById } from '../../Services/user.services'
import { CInputs } from '../../components/CInputs/CInputs'

export const AnyUserProfile = () => {

    const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    if (passport) { token = passport.token }

    const { id } = useParams()
    const [userData, setUserData] = useState(
        {
            _id: "",
            profile: "",
            email: "",
            name: "",
            followers: [],
            following: [],
            posts: []
        }
    )

    useEffect(() => {
      
        const bringUser = async () => {
            const res = await getUserById(id)
            if(res.success){
                setUserData(res.data)
            }
        };
        bringUser()

    }, [])
    
    const followUnfollow = async (e) => {
        const id = e.target.name
        const res = await followUser(token, id)
        console.log(res)
    }
    
  return (
    <>
    <div>name: {userData.profile}</div>
    <div>name: {userData.name}</div>
    <div>Email: {userData.email}</div>
    <div>followers: {userData.followers.length}</div>
    <div>following: {userData.following.length}</div>
    <CInputs type="button" value="follow" name={userData._id} onClick={followUnfollow}/>
    
    </>
  )
}
