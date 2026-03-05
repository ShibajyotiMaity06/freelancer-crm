import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import './App.css'
import LandingPage from './components/LandingPage'
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element={<LandingPage />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
