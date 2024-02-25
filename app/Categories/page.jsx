'use client'
import './categories_style.scss';

const page = () => {
  return (
    <main>
        <h1 className='heading'>Categories</h1>
        <div className='categories-container'>
            <div className="category" id='fitness' onClick={() => window.location.href='/Categories/fitness'}>
                <img src="../fitness.jpg" alt="" />
                <h1>Health & Fitness</h1>
            </div>
            <div className="category" onClick={() => window.location.href='/Categories/lifestyle'}>
                <img src="../lifestyle.jpg" alt="" />
                <h1>Lifestyle</h1>
            </div>
            <div className="category" onClick={() => window.location.href='/Categories/travel'}>
                <img src="../travel.jpg" alt="" />
                <h1>Travel</h1>
            </div>
            <div className="category" onClick={() => window.location.href='/Categories/sports'}>
                <img src="../sports.jpg" alt="" />
                <h1>Sports</h1>
            </div>
            <div className="category" onClick={() => window.location.href='/Categories/science'}>
                <img src="../science.jpg" alt="" />
                <h1>Science</h1>
            </div>
        </div>
    </main>
  )
}

export default page
