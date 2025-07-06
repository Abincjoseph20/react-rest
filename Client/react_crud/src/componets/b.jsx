import React,{ useState,useEffect } from "react";
import axios from "axios";


function BookList(){


    const [book,setBooks] = useState('')
    const [edit,SetEdit] = useState(null)
    const [title,setTitle]= useState('')
    const [img,SetImg] = useState(null)

    const fetchBook = async()=>{
       const res = await axios.get('http://8000/api/books/')
        setBooks(res.data)
    }

    useEffect(()=>{
        fetchBook()
    },[])

}

export default BookList;