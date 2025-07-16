import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'

function App() {

  return (
    <>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>

      {/* <Footer/> */}
    </>
  )
}

export default App
