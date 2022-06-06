import React from "react";
import { Link } from "react-router-dom";
import '../styles/header.css'
export const Header = (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                        <li><Link to={"/dashboard"} activeStyle={{color: "red"}}>Dashboard</Link></li>
                        <li><Link to={"/education"} activeClassName={"active"}>Education</Link></li>
                        <li><Link to={"/experience"} activeClassName={"active"}>Experience</Link></li>
                        <li><Link to={"/projects"} activeClassName={"active"}>Projects</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};