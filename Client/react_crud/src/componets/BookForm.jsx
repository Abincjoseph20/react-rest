import React, { useState } from 'react'
import axios from 'axios'

function BookForm() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault() // by defalt reload entire field

    const formData = new FormData()
    formData.append('title', title)
    formData.append('author', author)
    formData.append('description', description)
    if (image) {
      formData.append('image', image)
    }

    await axios.post('http://127.0.0.1:8000/api/books/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    alert('Book Added')
    setTitle('')
    setAuthor('')
    setDescription('')
    setImage(null)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Book</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /> <br/><br />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      /><br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      /><br /><br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      /><br /><br />

      <button type="submit">Add Book</button>
    </form>
  )
}

export default BookForm
