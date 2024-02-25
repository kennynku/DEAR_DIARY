"use client"
import Link from "next/link";
import './profile_style.scss';
import { useEffect } from "react";
const Profile = () => {
  const accessToken = localStorage.getItem('accessToken');
  //redirect logged in user
  function redirect() {
    const user_id = localStorage.getItem('userId')
    window.location.href = `/Profile/${user_id}`;

  }
  useEffect(() => {
    console.log(localStorage.getItem('userId'))
    if (accessToken) {
    redirect();
    }
  }, [])
  if (accessToken === null) {
    return(
      <main>
        <div className="profile-unauth">
            <h4>Oops it seems like you not logged in login/signup to view your profile</h4>
            <Link href="/Account">Login or Signup</Link>
        </div>
      </main>
    )
  } else {    
      redirect();
  }
}

export default Profile
