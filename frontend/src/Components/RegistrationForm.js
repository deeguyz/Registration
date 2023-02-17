import React, { useState} from "react";
import Input, { InputEmail, InputPassword, InputName } from "./Input";
import {useNavigate} from 'react-router-dom'

function RegistrationForm(){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/)
    const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

    const navigate = useNavigate();

    const validatePassword = (value) => {
        if(!passwordRegex.test(value)) {
            return false
        }

        return true
    }

    const validateEmail = (value) => {
        if(!emailRegex.test(value)) {
            return false
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validatePassword(password)){
            setErrorMessage("Passwords must contain at least 12 characters with one special character, one number, and one uppercase letter")
            throw new Error("ERROR: Passwords must contain at least 12 characters with one special character, one number, and one uppercase letter")
        }

        if(!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address")
            throw new Error("ERROR: Please enter a valid email address")
        }

        if(password !== password2) {
            setErrorMessage("Passwords do not match")
            throw new Error("ERROR: Passwords do not match")
        }

        setErrorMessage("Loading")
        fetch("http://localhost:3001/register", {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: {name},
                email: {email},
                password: {password}
            }),
        })
        .then(res => res.text() )
        .then(data => {
            if(data === "User successfully created") {
                setErrorMessage(false)
                navigate('/')
            } else {
                setErrorMessage(data)
            }
        })
        .catch((error) => {
            setErrorMessage("Server Error")
            console.log("reset client error-------",error)
        })
    }


    return(
        <>
            <form className="registrationForm" onSubmit={handleSubmit}>
                <InputName onChange={(e) => setName(e.target.value)}/>
                <InputEmail onChange={(e) => setEmail(e.target.value)}/>
                <InputPassword onChange={(e) => setPassword(e.target.value)}/>
                <Input type="password" name="confirm" placeholder="Confirm Password" onChange={(e) => setPassword2(e.target.value)}/>
                <div className="buttonDiv">
                    <button type="submit">Register</button> 
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
    )
}

export default RegistrationForm;