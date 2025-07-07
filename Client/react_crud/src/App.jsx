// App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './componets/Navbar'
import BookForm from './componets/BookForm'
// import BookList from './componets/BookList'
import BookList from './componets/s'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<BookForm/>} />
        <Route path='/books' element={<BookList/>} />
      </Routes>
    </Router>
  )
}

export default App

