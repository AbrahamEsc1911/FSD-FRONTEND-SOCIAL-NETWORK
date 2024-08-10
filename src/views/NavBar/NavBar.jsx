import React from 'react'
import { CNavigation } from '../../components/CNavigation/CNavigation'
import { CInputs } from '../../components/CInputs/CInputs'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {

    const navigate = useNavigate()

    const logout = () => {
       localStorage.removeItem("passport")
       navigate("/login")
    }

  return (
    <>
    <CNavigation path="/" content="home" />
    <CNavigation path="/profile" content="profile" />
    <CNavigation path="/" content="home" />
    <CInputs type="button" value="logout" onClick={logout}/>
    </>
  )
}
