import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/navbar.css';

const NavbarTitle = ({setAuth})=>{
    const navigate = useNavigate();
    const logOut = async () =>{
        const token = localStorage.getItem('token');
        const body = {token};
        const res = await fetch("http://localhost:5000/auth/logout",{
            method:"POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        });
        setAuth(0);
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
      }
    return(
        <nav>
            <div>
                <div>
                    <ul className="menu">
                        <li><a id="logout-button" onClick={logOut}>Log Out</a></li>
                        <li id='profile-name' >{localStorage.getItem('name') == 'undefined' ? '': localStorage.getItem('name') }</li>
                        <i style={{fontSize:"15px"}} class="material-icons" id='icon'>person</i>
                        <li className='rb' onClick={()=>navigate('/homescreen')}>ResumeBuilder</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavbarTitle;
