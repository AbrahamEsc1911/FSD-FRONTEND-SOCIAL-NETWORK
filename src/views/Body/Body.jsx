import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Register } from '../Register/Register'
import { Home } from '../Home/Home'
import { Login } from '../Login/Login'
import { Profile } from '../Profile/Profile'
import { SiglePost } from '../SiglePost/SiglePost'
import { Timeline } from '../Timeline/Timeline'
import { AnyUserProfile } from '../AnyUserProfile/AnyUserProfile'
import { NewPost } from '../NewPost/NewPost'

export const Body = () => {
  return (
    <>
    <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/post/:id' element={<SiglePost />} />
        <Route path='/timeline' element={<Timeline />} />
        <Route path='/newpost' element={<NewPost />} />
        <Route path='/user/:id' element={<AnyUserProfile />} />
    </Routes>
    </>
  )
}
