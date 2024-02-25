"use client"
import Link from "next/link";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import { useAuth } from "../Components/AuthContext";
import './register_style.scss';
const Account = () => {

  const { userId } = useAuth();
  return (
    <div className='authentication_tab'>
        <LoginForm></LoginForm>
        <RegisterForm></RegisterForm>
        <Link id="user_page_link" href={`/Profile/${userId}`}></Link>
    </div>
  )
}

export default Account
