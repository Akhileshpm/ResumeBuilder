import React,{useState,Fragment} from "react";
import { Link } from "react-router-dom";
import {toast } from 'react-toastify';


export default function Login({setAuth}){

    const [LoginDetails, setLoginDetails] = useState({
        email:"",
        password:""
    })
    
    const {email, password} = LoginDetails;

    const onChange = e =>{
        setLoginDetails({
            ...LoginDetails,
            [e.target.name]:e.target.value
        })
    }

    const onSubmitForm = async (e)=>{
        const body = {email, password};
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/login",{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify(body)
            })
            const parseRes = await response.json();
            
            if(parseRes.token){
                localStorage.setItem("token",parseRes.token);
                localStorage.setItem("Refreshtoken",parseRes.refreshToken);
                
                toast("Logged in successfully");
                setAuth(true);
            }else{
                setAuth(false);
                toast(parseRes);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return(
        <Fragment>
            <h1 className="text-align my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="email" onChange={onChange} value={email}  className="form-control my-3"/>
                <input type="password" name="password" placeholder="password" onChange={onChange} value={password}  className="form-control my-3"/>
                <button className="btn btn-success btn-block">LOGIN</button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
    );
}