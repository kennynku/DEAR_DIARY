"use client"
import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken)

  const updatePassword = async () => {
    try {
      await axios.put('/user/update', { password: newPassword, user_id: userId });
      // Clear the input field
      setNewPassword('');
      console.log('Password updated');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const updateEmail = async () => {
    try {
      await axios.put('http://localhost:4000/user/update', { email: newEmail, user_id: userId }, {headers: {Authorization: `Bearer ${accessToken}`}});
      // Clear the input field
      setNewEmail('');
      console.log('Email updated');
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const updateUsername = async () => {
    try {
      await axios.put('/user/update', { username: newUsername, user_id: userId });
      // Clear the input field
      setNewUsername('');
      console.log('Username updated');
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  return (
    <main>
      {/* ... Your other content ... */}
      <div>
        <label htmlFor="change_password">Password</label>
        <input
          type="text"
          id="change_password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={updatePassword}>Update</button>
      </div>
      <div>
        <label htmlFor="change_email">Email</label>
        <input
          type="email"
          id="change_email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={updateEmail}>Update</button>
      </div>
      <div>
        <label htmlFor="change_userName">Change Username</label>
        <input
          type="text"
          id="change_userName"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button onClick={updateUsername}>Update</button>
      </div>
    </main>
  );
};

export default UserProfile;
