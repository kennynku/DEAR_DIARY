'use client'
import './navbar_styles.scss';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(''); // State to store the search input value
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchValue.trim() !== '') {
      // Use the Link component to navigate to the search page
      window.location.href = `/search?search_key=${searchValue}`;
    }
  };
  return (
    <nav>
      <ul className='nav-items'>
        <li>Dear Diary</li>
        <Link href="/">Home</Link>
        <Link href="/Categories">Categories</Link>
        <Link href="/Profile">Profile</Link>
      </ul>
      <div className='search-bar'>
        <div><img src="./search.png" alt="" /></div>
        <input onChange={(e) => setSearchValue(e.target.value)} onKeyPress={handleKeyPress} type="text" name="search_bar" id="" placeholder='Search' />
      </div>
    </nav>
  )
}

export default Navbar
