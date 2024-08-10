import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CNavigation = ({path, content}) => {

    const navigate = useNavigate()

  return (
    <>
    <div onClick={() => navigate(path)}>{content}</div>
    </>
  )
}
