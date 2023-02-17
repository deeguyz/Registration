import React from "react";

function Input(props) {
    return(
        <>
            <input type={props.type} name={props.name} placeholder={props.placeholder} onChange={props.onChange} required/>
        </>
    );
}

function InputEmail(props) {
    return(
        <>
            <input type="email" name="email" placeholder="Email" onChange={props.onChange} required/>
        </>
    );  
}

function InputPassword(props) {
    return(
        <>
            <input type="password" name="password" placeholder="Password" onChange={props.onChange} required/>
        </>
    );  
}

function InputName(props) {
    return(
        <>
            <input type="text" name="name" placeholder="Name" onChange={props.onChange} required/>
        </>
    );  
}

export{
    InputEmail,
    InputPassword,
    InputName
}

export default Input;