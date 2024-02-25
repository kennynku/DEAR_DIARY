"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

function LoginForm() {
    const { login, userId, accessToken } = useAuth();

    function handleLogin (event) {
        event.preventDefault();

        const body ={
            email:document.getElementById('login_email').value,
            password: document.getElementById('login_password').value
        }

        try{
            axios.post('http://localhost:4000/login', body)
            .then(async res => {
                const {accessToken, user_id} = await res.data;
                console.log("response: ", res);
                await login(accessToken, user_id);

                //Store the accessToken and user_id in localStorage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('userId', user_id);
                console.log("loggedin");
                console.log(localStorage.getItem(userId));
                
            });
        }catch (err) {
            console.error("login failed: ", err);
        }
    }
    //Runs as soons as userID is received ->redirects to user profile
    useEffect(() => {
        //get invisble link to user profile and set the href to user id
        if (userId !== null) {
            const user_link = document.getElementById('user_page_link');
            user_link.click();
        }
    }, [userId]);
    return (
        <form className="authForms login_form" onSubmit={handleLogin}>
            <h1>Welcome back</h1>
            <label htmlFor="login_email">Email</label>
            <input  id='login_email' type="text" placeholder="Enter your email"/>
            <label htmlFor="login_password" name="">Password</label>
            <input  id='login_password' type="password" placeholder="Ener your password" required/>
            <input type="submit" value="Login" />
        </form>
    )
}
export default LoginForm