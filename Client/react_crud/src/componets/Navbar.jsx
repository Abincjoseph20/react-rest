// Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    
    <div style={{ background: '#f0f0f0', padding: '10px' }}>
      <h2>📘 Book Manager</h2>
      <Link to="/" style={{ background: '#f0f0f0', padding: '10px' }}>HOME</Link>
      {/* <Link to='/books'>Books</Link> */}
      <Link to="/books">Book</Link>
    </div>
  )
}

export default Navbar;
