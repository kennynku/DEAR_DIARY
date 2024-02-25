"use client"
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
} 
export function UserProvider({ children }) {
    const [blogs, setBlogs] = useState(null);

    const loadBlogs = (userBlogs) => {
        setBlogs(userBlogs);
    };
    const values = {
        blogs,
        loadBlogs,
    };

    return <UserContext.Provider value={values}>{ children }</UserContext.Provider>
}