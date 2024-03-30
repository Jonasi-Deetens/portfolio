import React, { useContext } from 'react'
import { UserContext } from '../providers/UserProvider';

const Admin = () => {
    const { login } = useContext(UserContext);

    return (
        <main className='flex items-center justify-center'>
            <form onSubmit={login}>
                <label htmlFor="username">Username:</label><br />
                <input type="text" name="username" id="username" className='p-2'/><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" name="password" id="password" className='p-2'/><br />
                <button type='submit' className='mt-2'>Login</button>
            </form>
        </main>
    )
}

export default Admin