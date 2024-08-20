import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './CNavigation.css'
import { NavBarContext } from '../../Context/NavBarContext/NavBarContext'

export const CNavigation = ({path, content, isActive}) => {

    const navigate = useNavigate()
    const { setNavBar } = useContext(NavBarContext);

  return (
    <>
    <div className={`nav-item ${isActive ? 'active' : ''}`} onClick={() => navigate(path)}>{content}</div>
    </>
  )
}
