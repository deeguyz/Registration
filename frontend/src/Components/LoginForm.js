import React, { useState} from 'react';
import {InputEmail, InputPassword} from './Input.js'
import {useNavigate} from 'react-router-dom'

function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("loading")
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
                setErrorMessage(false)
                navigate('home')
            } else {
                setErrorMessage(data)
            }
        })
        .catch((error) => {
            setErrorMessage("Server Error")
            console.log("reset client error-------",error)
        })
    }

    const navigate = useNavigate();

    return(
        <>
        <form className="loginForm" onSubmit={handleSubmit}>
            <InputEmail onChange={(e) => setEmail(e.target.value)}/>
            <InputPassword onChange={(e) => setPassword(e.target.value)}/>
            <div className="buttonDiv">
                <button type="submit">Login</button> 
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </form>
        <div className="errorContainer">
            {errorMessage ? 
                <div className="errorDiv">
                    <p>{errorMessage}</p>
                </div>
                :
                <>
                </>
                }
            </div>
        </>
    );
}

export default Form;