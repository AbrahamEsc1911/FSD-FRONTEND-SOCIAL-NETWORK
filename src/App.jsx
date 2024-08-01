import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Body } from './views/Body/Body'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Body />
      <Footer />
    </>
  )
}

export default App
