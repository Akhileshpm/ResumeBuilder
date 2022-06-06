import {React,Fragment, useEffect,useState} from "react";

const Dashboard = ({setAuth})=>{
    const [name,setName] = useState("");

    async function getName(){
        try {
            const response = await fetch("http://localhost:5000/dashboard/",{
                method:"GET",
                headers:
                {
                    token:localStorage.token
                }
            });
            const parseRes = await response.json();
            setName(parseRes.user_name);
            
        } catch (error) {
            console.error(error.message);
        }
    }
        
    useEffect(()=>{
        getName();
    },[])
    
    function logout(e){
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }
    return(
        <Fragment>
            <h1> {name}'s dashboard</h1>
            <button className="btn btn-primary" onClick={logout}>LogOut</button>
        </Fragment>
    );
}
export default Dashboard;