import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Login({ updateUser }) {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const { email, password } = user;
        if (email && password) {
            // alert('done')
            axios.post('http://localhost:3456/login', user)
                .then(res => {
                    alert(res.data.message)
                    updateUser(res.data.user)
                    history.push("/")
                })
        } else {
            alert('Email or Password Did not match')
        }
    }

    const history = useHistory();

    return (
        <div className='login'>
            {console.log('user', user)}
            <h1>Login</h1>
            <input type='email' name='email' value={user.email} placeholder='Enter your Email' onChange={handleChange} />
            <input type="password" name='password' value={user.password} placeholder='Enter your Password' onChange={handleChange} />
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => { history.push("/register") }}>Register</div>
        </div>
    )
}
