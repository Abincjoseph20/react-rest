import React, {useState,useEffect} from "react";
import axios from "axios";
import "./s.css"


function BookList(){
    const [books,setBook]=useState([])
    const [title,setTitle]=useState('')
    const [author,setAuthor]=useState('')
    const [description,setDescription]=useState('')
    const[image,setImage]=useState(null)

    const fetchData = async ()=>{
        const res = await axios.get('http://127.0.0.1:8000/api/books/')
        setBook(res.data)
    }
    
    useEffect(()=>{
        fetchData()
    },[])

    const handleDelet = async (id)=>{
        await axios.delete(`http://127.0.0.1:8000/api/books/${id}`)
        fetchData()

    }

    return(
        <table>
            <tr>
                <th>
                    title
                </th>
                <th>
                    author
                </th>
                <th>
                    desc
                </th>
                <th>
                    img
                </th>
            </tr>
           {books.map((book)=>
           <tr >
                <td>
                    {book.title}
                </td>
                <td>
                     {book.author}
                </td>
                <td>
                    {book.description}
                </td>
                <td>
                    {book.image && <img src={book.image} />}
                </td>

                <td>
                   < onClick={()=> handleDelet(book.id)}>delete</a>
                </td>
            </tr>
           
        )}
            
        </table>
    )

}

export default BookList;