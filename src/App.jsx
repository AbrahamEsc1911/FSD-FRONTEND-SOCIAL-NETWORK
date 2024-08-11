import { useState } from 'react'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Body } from './views/Body/Body'
import { NavBar } from './views/NavBar/NavBar'

function App() {

  return (
    <>
      <div className="app-container">
        <div className="navbar-container">
          <NavBar />
        </div>
        <div className="content-container">
          <Body />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
