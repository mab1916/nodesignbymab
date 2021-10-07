import React from 'react';
import './homepage.css';
import { useHistory } from "react-router-dom";

export default function HomePage({ updateUser }) {

    const history = useHistory();

    return (
        <div className='homepage'>
            <h1>Hello Homapage</h1>
            <div className="button" onClick={() => { updateUser({}) }}>Logout</div>
        </div>
    )
}
