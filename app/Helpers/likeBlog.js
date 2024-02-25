// Implementation of like and unlike
import axios from 'axios';

export function handleLike(event, blogId) {

    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    if (!accessToken) return;

    const body = {
        blogId: blogId,
        userId: userId
    }
    const header = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    axios.put('http://localhost:4000/blog/like', body, header)
        .then(res => console.log(res));
    console.log('handleLike ran')
    console.log(accessToken)
    console.log(userId)
    console.log(blogId)
    event.stopPropagation();
}