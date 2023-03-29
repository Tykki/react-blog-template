import { useState } from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './NavBar'
import Home from './pages/Home'
import Err404 from './pages/Err404'
import About from './pages/About'
import Article from './pages/Article'
import ArticleList from './pages/ArticleList'
import Register from './pages/Register'
import Login from './pages/Login'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<Article />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="*" element={<Err404 />} />
            

          </Routes>
        </div>
          
      </div>

    </BrowserRouter>
  )
}

export default App