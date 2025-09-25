import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import './App.css'
import Body from './components/body'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <Body/>
    </>
  )
}

export default App
