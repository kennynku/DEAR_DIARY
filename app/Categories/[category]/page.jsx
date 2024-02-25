'use client'
import { handleLike } from '@/app/Helpers/likeBlog';
import '../../Home/home_style.scss';
import { useAuth } from "@/app/Components/AuthContext";
import { useEffect } from 'react';
import axios from 'axios';

const page = ({ params }) => {
    const category = params.category;
    const { blogs, setBlogs } = useAuth();
    const [loading, setLoading] = useState(true);

    //Get blogs with related category
    useEffect(() => {
        const queryParams = {
            params: {
                category: category
            }
        }
        axios.get('http://localhost:4000/categories/category', queryParams)
            .then(res => {
                console.log(res);
                setBlogs(res.data)});
                setLoading(false);

    }, [])
  return (
    <main>
        <h1 className='category-heading'>{category}</h1>
        <section className='blogs'>
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
        </section>
    </main>
  )
}

export default page
