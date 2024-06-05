import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './components/create.jsx'
import Update from './components/update.jsx'
import Home from './components/home.jsx'
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/create' element={<Create />}></Route>
      <Route path='/update/:id' element={<Update />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
