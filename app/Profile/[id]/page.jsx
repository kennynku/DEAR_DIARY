"use client"
import Link from "next/link";
import '../profile_style.scss';
import '../../Home/home_style.scss'
import axios from 'axios';
import { useAuth } from "@/app/Components/AuthContext";
import { useEffect, useState } from "react";
import { handleLike } from "@/app/Helpers/likeBlog";
import Spinner from '../../Components/Spinner/Spinner';

const UserProfile = ({ params }) => {
    const { blogs, setBlogs } = useAuth();
    const [loading, setLoading] = useState(true);
    
    //Get the users blogs when the component mounts
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access:', accessToken);
        const id = params.id;
        const body = {
            userId: id
        };
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }

        axios.post('http://localhost:4000/profile/blogs', body, header)
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
                console.log(blogs);
            });
        }, []);
  return (
    <main>
        <div className="profile-navbar">
            <input type="text" name="" id="" placeholder="Search" />
            <div>
                <Link href="/NewBlog">New+</Link>
                <Link href="Settings">settings</Link>
            </div>
        </div>
        <hr className="bottom-border"/>
        <h2 className="user_blogs_h2">Your blogs</h2>
        {loading ? (
                <Spinner />
            ) : (
                <div className="recommended-blogs">
                    {blogs.map(blog => (
                        <div onClick={() => window.location.href=`/Blog/${blog._id}`} className="blog-card" key={blog._id}>
                            <div className='blog-image'><img src="background.jpg" alt="" /></div>
                            <div className='author-image'><img src="" alt="" /></div>
                            <div className='overview'>{blog.snippet}</div>
                            <div className='impressions'>
                                <div className='hearts' onClick={(event) => handleLike(event, blog._id)}>
                                    <img src="../empty_heart.png" alt="" />
                                    {blog.likes.length}
                                </div>
                                <div className='number-comments'><img src="../comments.png" alt="" /></div>
                                <div className='views'><img src="../impressions.png" alt="" />{blog.views.length}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
    </main>
  )
}

export default UserProfile
