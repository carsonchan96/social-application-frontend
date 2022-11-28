import React, { useState } from "react";
import {Alert} from "./alert";
import {Link} from 'react-router-dom';

async function formSubmit(requestData){
    return fetch('/register',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(requestData)
    }).then((data)=>{
        return data.json();
    });
}

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [alert, setAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let requestData = {
            email: email,
            password: pass,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            company: company,
            profile_picture: ""
        };

        const response = await formSubmit(requestData);

        if(response.detail != undefined){
            setAlert(true)
        }else{
            window.location.href="/";
        }
    }

    return (
        <div className="flex flex-col w-full items-center pt-4">
            <div className="flex flex-col items-center border border-white w-96 rounded-md text-white space-y-4 p-10">
            <h2>Register</h2>
            <Alert show={alert}/>
            <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>

                <label htmlFor="first-name">First name</label>
                <input className="text-black p-2 rounded-md" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="first_name" id="first-name"/>

                <label htmlFor="last-name">Last name</label>
                <input className="text-black p-2 rounded-md" value={lastName} onChange={(e) => setLastName(e.target.value)} name="last_name" id="last-name"/>

                <label htmlFor="company">Company Name</label>
                <input className="text-black p-2 rounded-md" value={company} onChange={(e) => setCompany(e.target.value)} name="company" id="company"/>

                <label htmlFor="phone">Phone number</label>
                <input className="text-black p-2 rounded-md" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" id="phone"/>

                <label htmlFor="email">Email</label>
                <input className="text-black p-2 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input className="text-black p-2 rounded-md" value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />

                <button type="submit">Register</button>
            </form>
            <button>
                <Link to="/">Already have an account? Login here.</Link></button>
            </div>
        </div>
    )
}