import React, { useEffect, useState } from 'react'
import axios from 'axios'

function BookList() {
  const [books, setBooks] = useState([])
  const [editId, setEditId] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)

  const fetchBooks = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/books/')
    setBooks(res.data)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`)
    fetchBooks()
  }

  const handleEdit = (book) => {
    setEditId(book.id)
    setTitle(book.title)
    setAuthor(book.author)
    setDescription(book.description)
    setImage(null) // Reset image, optional
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('author', author)
    formData.append('description', description)
    if (image) {
      formData.append('image', image)
    }

    await axios.put(`http://127.0.0.1:8000/api/books/${editId}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    setEditId(null)
    setTitle('')
    setAuthor('')
    setDescription('')
    setImage(null)
    fetchBooks()
  }

  const cancelEdit = () => {
    setEditId(null)
    setTitle('')
    setAuthor('')
    setDescription('')
    setImage(null)
  }

  return (
    <div>
      <h3>Book List</h3>
      {books.map((book) => (
        <div key={book.id} style={{ marginBottom: '20px' }}>
          {editId === book.id ? (
            <div>
              <input value={title} onChange={(e) => setTitle(e.target.value)} /><br />
              <input value={author} onChange={(e) => setAuthor(e.target.value)} /><br />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} /><br />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              /><br />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <b>{book.title}</b> by {book.author}
              <p>{book.description}</p>
              {book.image && (
                <img
                  src={`http://127.0.0.1:8000${book.image}`}
                  alt="Book"
                  width="100"
                />
              )}
              <br />
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default BookList
