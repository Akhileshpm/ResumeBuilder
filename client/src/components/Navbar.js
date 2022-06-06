import React from "react";
import '../styles/navbar.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = ({setAuth})=>{
    const navigate = useNavigate();

    const logOut = async () =>{
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
                        <li><button id="logout-button" onClick={logOut}>Log Out</button></li>
                        <li className="rb" onClick={()=>navigate('/homescreen')} >ResumeBuilder</li>
                        <li><Link to={"/review"}>Review</Link></li>
                        <li><Link to={"/skills"}>Skills</Link></li>
                        <li><Link to={"/projects"}>Projects</Link></li>
                        <li><Link to={"/experience"}>Experience</Link></li>
                        <li><Link to={"/education"}>Education</Link></li>
                        <li><Link to={"/dashboard"}>Dashboard</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
