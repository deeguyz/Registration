import React, { useState} from 'react';
import {InputEmail, InputPassword} from './Input.js'
import {useNavigate} from 'react-router-dom'

function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/login", {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: {email},
                password: {password}
            }),
        })
        .then(res => res.text() )
        .then(data => {
            if(data === "SUCCESS") {
                navigate('home')
            } else {
                alert(data)
            }
        })
        .catch((error) => {
            console.log("reset client error-------",error)
        })
    }

    const navigate = useNavigate();

    return(
        <form onSubmit={handleSubmit}>
            <InputEmail onChange={(e) => setEmail(e.target.value)}/>
            <InputPassword onChange={(e) => setPassword(e.target.value)}/>
            <div className="buttonDiv">
                <button type="submit">Login</button> 
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </form>
    );
}

export default Form;