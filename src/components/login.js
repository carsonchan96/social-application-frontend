import React, { useState } from "react";
import {Alert} from "./alert";
import {Link} from 'react-router-dom';

async function loginUser(credentials){
    return fetch("/token",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(credentials)
    }).then(data=>data.json());
}

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [alert, setAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert(false);
        const response = await loginUser({
            email,
            password
        });

        if('access_token' in response){
            localStorage.setItem('access_token', response.access_token)
            window.location.href="/profile";
        }else{
            setAlert(true)
        }
    }

    return (
        <div className="flex flex-col w-full items-center pt-36">
            <div className="flex flex-col items-center border border-white w-96 rounded-md text-white space-y-4 p-10">
                <h2>Login</h2>
                <Alert show={alert}/>
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input className="text-black p-2 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)}type="email" id="email" name="email" />
                    <label htmlFor="password">password</label>
                    <input className="text-black p-2 rounded-md" value={password} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
                    <button className="bg-white text-red-300 rounded-md p-3" type="submit">Log In</button>
                </form>
                <button>
                    <Link to="/register">Don't have an account? Register here.</Link>
                </button>
            </div>
        </div>
    )
}