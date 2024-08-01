import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Register } from '../Register/Register'

export const Body = () => {
  return (
    <>
    <Routes>
        <Route path='/register' element={<Register/>} />
    </Routes>
    </>
  )
}
