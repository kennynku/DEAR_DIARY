"use client"
import '../Home/home_style.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const page = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const searchParams =  new URLSearchParams(window.location.search);
        const search_key = searchParams.get("search_key");
        axios.get(`http://localhost:4000/search?search_key=${search_key}`)
        .then((response) => {
          console.log('response', response.data);
          setBlogs(response.data);
        })
        .catch((error) => {
          console.error('Error fetching blogs:', error);
        });
    }, []);


  return (
    <section>
        <h1>Search Results</h1>
        <div className='recommended-blogs'>
            {blogs && blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
                <div className='blog-image'><img src={blog.image} alt="" /></div>
                <div className='author-image'><img src="" alt="" /></div>
                <div className='overview'>{blog.snippet}</div>
                <div className='impressions'>
                    <div className='hearts'><img src="empty_heart.png" alt="" />{blog.likes.length}</div>
                    <div className='number-comments'><img src="comments.png" alt="" /></div>
                    <div className='views'><img src="impressions.png" alt="" />{blog.views.length}</div>
                </div>
            </div>))}
        </div>
    </section>
  )
}


export default page
