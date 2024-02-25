import React from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.elements.name.value,
            surname: e.target.elements.surname.value,
            email: e.target.elements.email.value,
            userName: e.target.elements.userName.value,
            password: e.target.elements.password.value
        };

        try {
            const response = await axios.post('http://localhost:4000/register', formData);
            console.log("status",response.status);
            if (response.status === 200) {
              alert('Account created successfully! You can now log in.');
          } else {
              
             
          }
        } catch (error) {
            alert('Registration failed. Please try using a different username or email.');
            console.error('Registration failed:', error);
        }
    };

    return (
        <form className='authForms register_form' onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label htmlFor="name">Name</label>
            <input name='name' id='name' type="text" placeholder='Enter your name' required />
            <label htmlFor="surname">Surname</label>
            <input name='surname' id='surname' type="text" placeholder='Enter your surname' required />
            <label htmlFor="email">Email</label>
            <input name='email' id='email' type="email" placeholder='Enter your email' required />
            <label htmlFor="userName">User Name</label>
            <input name='userName' id='userName' type="text" placeholder='Enter a user name' required />
            <label htmlFor="password">Password</label>
            <input name='password' id='password' type="password" placeholder='Create a password' required />
            <input type="submit" value="Submit" />
        </form>
    );
};

export default RegisterForm;
