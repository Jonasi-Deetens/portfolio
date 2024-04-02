import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode }from 'jwt-decode';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch('https://portfolioserver-vjpfi8hb.b4a.run/auth/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    username: formData.get("username"),
                    password: formData.get("password")
                })
            })
            if (!response.ok) {
                const error = await response.json();
                console.log(error);
            } else {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                navigate('/');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const isTokenExpired = (token) => {
        if (!token) return true; 
        const decodedToken = jwtDecode(token); 
        return decodedToken.exp < Date.now() / 1000;;
    };

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        return !isTokenExpired(token);
    };
    
    const logout = () => {
        localStorage.removeItem('token'); 
        navigate('/')
    };

    return (
        <UserContext.Provider value={{ login, isLoggedIn, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }