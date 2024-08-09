import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { followUser, getUserById } from '../../Services/user.services'
import { CInputs } from '../../components/CInputs/CInputs'
import { AnyUserContex } from '../../Context/AnyUserProfileContext/anyUserProfileContext'

export const AnyUserProfile = () => {

    const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    let userId = null
    if (passport) { token = passport.token, userId = passport.tokenData.id }

    const { id } = useParams()
    const navigate = useNavigate()
    const {setNavigationPath} = useContext(AnyUserContex)
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
            //TODO AGREGAR REDIRECCION A 404 SI EL RESPONSE ES FALSE
        };
        bringUser()

    }, [])
    
    const followUnfollow = async (e) => {
        const id = e.target.name
        if(passport){
            await followUser(token, id)
            const res = await getUserById(id)
            setUserData(res.data)
        } else {
            setNavigationPath(id)
            navigate('/login')
            //Usar context para guardar el link en un state para que cuando se logee vuelva aca
        }
        
    }
    
  return (
    <>
    <div>name: {userData.profile}</div>
    <div>name: {userData.name}</div>
    <div>Email: {userData.email}</div>
    <div>followers: {userData.followers.length}</div>
    <div>following: {userData.following.length}</div>
    <CInputs type="button" value={userData.followers.includes(userId) ? "Unfollow" : "Follow"} name={userData._id} onClick={followUnfollow}/>
    
    </>
  )
}
