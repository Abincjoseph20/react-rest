import React,{useState,useEffect} from "react";
import axios  from "axios";
import "./s.css"

function BookList(){

    const [books,setBooks]=useState([])
    const [edit,setEdit] = useState('')
    const [title,setTitle]=useState('')
    const [author,setAuthor]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState(null)

    const FetchBook = async ()=>{
        const res = await axios.get('http://127.0.0.1:8000/api/books/')
        setBooks(res.data)
    }

    useEffect(()=>{
        FetchBook()
    },[])

    const HandleDelete = async (id)=>{
        await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`)
        FetchBook()
    } 

    const handleEdit = (book)=>{
        setEdit(book.id)
        setTitle(book.title)
        setAuthor(book.author)
        setDescription(book.description)
        setImage(null)
    }
    const handleUpdate = async () =>{
        const formdata = new FormData()
        formdata.append('title',title)
        formdata.append('author',author)
        formdata.append('description',description)
        if(image){
            formdata.append('image',image)
        }

        await axios.put(`http://127.0.0.1:8000/api/books/${edit}/`,formdata,{
            headers:{'Content-Type':'multipart/form-data'}
        })

        setEdit(null)
        setTitle('')
        setAuthor('')
        setDescription('')
        setImage(null)
        FetchBook()
    }

    const cancelEdit = ()=>{
        setEdit(null)
        setBooks('')
        setTitle('')
        setAuthor('')
        setDescription('')
        setImage(null)
        FetchBook()
    }

    return(
        <> 
        
        <table >
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>desc</th>
                        <th>img</th>
                        <th>save edit</th>
                        <th>cancel edit</th>
                    </tr>
        
                   
            {books.map((book)=>(
                    edit === book.id ? ( 
                    <tr key={book.id}>
                        <td><input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} /></td>
                        <td><input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} /></td>
                        <td><input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} /></td>
                        <td><input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} /></td>


                        <td onClick={handleUpdate}>save.</td>
                        <td onClick={cancelEdit}>cancel.</td>
                    </tr>
                    ):(
                    <tr>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.description}</td>
                        <td>{book.image && <img src={book.image} width="100" height="100"></img> }</td>
                        


                        <td><a onClick={()=>HandleDelete(book.id)}>delete</a></td>
                        <td><a onClick={()=>handleEdit(book)}>edit</a></td>
                    </tr>  
                    
                )
            ))}
            
        </table>
        
    </>

    )
}

export default BookList;