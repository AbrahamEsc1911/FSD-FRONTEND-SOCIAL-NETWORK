import React, { useContext, useEffect, useState } from 'react'
import { PassportContext } from '../../Context/Passport/PassportContext'
import { userProfile } from '../../Services/user.services'
import { useNavigate } from 'react-router-dom'
import { CInputs } from '../../components/CInputs/CInputs'

export const Profile = () => {

    const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    if(passport){token = passport.token}

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

    const likeThisPosts = (e) => {
        const id = e.target.name
        console.log(id)
    }

    return (
        <>
            <p>nombre: {userData.name}</p>
            <p>email: {userData.email}</p>
            <p>id: {userData._id}</p>
            <p>email: {userData.createdAt}</p>
            <p>followers: {userData.followers.length}</p>
            <p>posts: {
            userData.posts.map((posts) => {
                return (
                    <div key={posts._id}>
                        <div>post: {posts.post_message}</div>
                        <div>createdAt: {posts.updatedAt}</div>
                        <CInputs type="button" value="like" name={posts._id} onClick={likeThisPosts}/>
                    </div>
                )
            })
            }</p>
            <p>Está activo: {userData.is_active ? "Si" : "No"}</p>
        </>
    )
}
