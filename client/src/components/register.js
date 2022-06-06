import React,{Fragment,useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Register({setAuth}){

    const[inputs, setInputs] = useState({
        email:"",
        password:"",
        user:"",
        github:"",
        phone:""
    });
    const {email,password,user,github,phone}  = inputs;

    const onChange = e => {
        setInputs({...inputs,[e.target.name]:e.target.value})
    }
    const onSubmitForm = async (e) => {
        const body = {user,email,password,github,phone};

        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/register",{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();

            if(parseRes.token){
                localStorage.setItem("token",parseRes.token);
                setAuth(true);
                toast("Registered successfully")
            }
            else{
                setAuth(false);
                toast(parseRes)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return(
        <Fragment>
            <h1 className="my-5 text-center">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="user" placeholder="user" className="form-control my-3" value={user} onChange={onChange}/>
                <input type="email" name="email" placeholder="email" className="form-control my-3"  value={email} onChange={onChange}/>
                <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={onChange}/>
                <input type="text" name="github" placeholder="github ID" className="form-control my-3" value={github} onChange={onChange}/>
                <input type="text" name="phone" placeholder="Phone No:" className="form-control my-3" value={phone} onChange={onChange}/>

            <button className="btn btn-success btn-block">SUBMIT</button>
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    );
}