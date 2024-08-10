import { useState } from 'react'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Body } from './views/Body/Body'
import { NavBar } from './views/NavBar/NavBar'

function App() {

  return (
    <>
      <NavBar />
      <Body />
      <Footer />
    </>
  )
}

export default App
