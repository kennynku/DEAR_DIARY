"use client"
import axios from 'axios';
import { useAuth } from '../Components/AuthContext';
import './newBlog_style.scss';
import { useState } from 'react';

const NewBlog = () => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
    const [file, setFile] = useState(null);

    function handleFileChange(event) {
      const file = event.target.files[0];
    
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          setFile(dataUrl);
        };
    
        reader.readAsDataURL(file);
      }
    }
    

    function handleSubmitBlog(event) {
        event.preventDefault();

        const body = {
          title: document.getElementById('blog_title').value,
          snippet: document.getElementById('blog_snippet').value,
          content: document.getElementById('blog_content').value,
          author: userId,
          image: file,
          category: document.getElementById('blog_category').value
        }
        
        const header = {
          headers: {'Authorization': `Bearer ${accessToken}`}
        }

        axios.post('http://localhost:4000/blog/new', body, header)
            .then(res => console.log(res));
    }
  return (
    <form className='new-blog' onSubmit={handleSubmitBlog}>
        <label htmlFor="blog_title">Title</label>
        <input id="blog_title" type="text" placeholder='title' required/>
        <label htmlFor="blog_snippet">Snippet</label>
        <input id="blog_snippet" type="text" placeholder='Snippet' required/>
        <label htmlFor="blog_category">Category</label>
        <select name="" id="blog_category">
          <option value="fitness">fitness</option>
          <option value="science">science</option>
          <option value="sports">sports</option>
          <option value="lifestyle">lifestyle</option>
          <option value="travel">travel</option>
        </select>
        <label htmlFor="blog_content" >Body</label>
        <textarea  id="blog_content" cols="100" rows="30" placeholder='Enter your diary content here' required></textarea>
        <label htmlFor="blog_image">Image</label>
        <input id='blog_image' type="file" onChange={handleFileChange}/>
        <input accept='image/' type="submit" name="blog_image" value="Post"/>
    </form>
  )
}

export default NewBlog
