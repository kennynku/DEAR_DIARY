"use client"
import Banner from '../Components/Banner';
import './home_style.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../Components/Spinner/Spinner';

const HomeContent = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:4000/home/blogs')
            .then(res => {
                setBlogs(res.data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
                setLoading(false); // Set loading to false on error as well
            });
    }, []);

    const handleLike = async (event, blogId) => {
        try {
            event.stopPropagation(); // Stop event propagation
    
            const accessToken = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userId');
    
            // Send a request to add a like
            await axios.put(
                'http://localhost:4000/blog/like',
                { blogId, userId },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    
            // Update the local state to reflect the change in likes
            setBlogs(prevBlogs =>
                prevBlogs.map(prevBlog =>
                    prevBlog._id === blogId
                        ? {
                            ...prevBlog,
                            likes: prevBlog.likes.includes(userId) ? prevBlog.likes.filter(id => id !== userId) : [...prevBlog.likes, userId],
                        }
                        : prevBlog
                )
            );
        } catch (error) {
            console.error('Error liking blog:', error);
        }
    };
    
    

    return (
        <section>
            <Banner></Banner>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className='recommended-blogs'>
                    {blogs.map(blog => (
                        <div onClick={() => window.location.href=`/Blog/${blog._id}`} className="blog-card" key={blog.id}>
                            <div className='blog-image'><img src={blog.image} alt="" /></div>
                            <div className='author-image'><img src="" alt="" /></div>
                            <div className='overview'>{blog.snippet}</div>
                            <div className='impressions'>
                                <div className='hearts' onClick={(event) => handleLike(event, blog._id)}>
                                    <img src="empty_heart.png" alt="" />
                                    {blog.likes.length}
                                </div>
                                <div className='number-comments'><img src="comments.png" alt="" />{blog.comments.length}</div>
                                <div className='views'><img src="impressions.png" alt="" />{blog.views.length}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default HomeContent;
