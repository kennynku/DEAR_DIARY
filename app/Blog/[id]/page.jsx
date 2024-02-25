"use client"
import { useEffect } from 'react';
import './blog_style.scss';
import axios from 'axios';
import { useState } from 'react';
import imageProcesser from '../../Helpers/imageProcess';

const page = ({params}) => {
    const [blogData, setBlogData] = useState(null);
    const [comment, setComment] = useState(''); // Add this line
    
    useEffect(() => {
        const id = params.id;
        const queryParams = {
            params: {
                blogId: id
            }
        };
        axios.get('http://localhost:4000/blogs/view', queryParams)
            .then(res => {
                console.log('Response data: ', res.data)
                setBlogData(res.data);
            })
    }, [])

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            const blogId = params.id; // Assuming you have access to the blogId
            const userId = localStorage.getItem('userId'); // Assuming you have access to the accessToken
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(
                'http://localhost:4000/blogs/comment',
                {
                    blogId: blogId,
                    comment: comment,
                    userId: userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 201) {
                // Comment added successfully, you can update the UI or take any other action
                console.log('Comment added successfully');
                
                // Refresh the blog data or re-fetch it after adding the comment
                const queryParams = {
                    params: {
                        blogId: blogId,
                    },
                };
                const updatedBlogData = await axios.get('http://localhost:4000/blogs/view', queryParams);
                setBlogData(updatedBlogData.data);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };
  return (
    <main >
        <div className='blog_body'>
            {blogData && (
            <>
                <section className='blog'>
                    <div className='image_container'><img src={blogData.blog.image} alt="" /></div>
                    <h1>{blogData.blog.title}</h1>
                    <p className='blog_content'>{blogData.blog.content}</p>
                </section>
                <section className='comments-section'>
                    <ul>
                    {blogData.comments.map(comment => (<li>
                            <p className='user-name'><b>{comment.userId.userName}</b></p>
                            <p>{comment.comment}</p>
                        </li>))}
                    </ul>
                </section>
            </>)}
            <div className="comment_input_section">
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        placeholder="Add comment"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit">Submit Comment</button>
                </form>
            </div>
        </div>
    </main>
  )
}

export default page
