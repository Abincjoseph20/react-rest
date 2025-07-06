// App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './componets/Navbar'
import BookForm from './componets/BookForm'
// import BookList from './componets/BookList'
import BookLists from './componets/a'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<BookForm/>} />
        {/* <Route path='/books' element={<BookList/>} /> */}
        <Route path='/books' element={<BookLists/>}/>
      </Routes>
    </Router>
  )
}

export default App

