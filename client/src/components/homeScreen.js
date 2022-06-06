import React,{useEffect,useState, Fragment} from 'react';
import '../styles/homescreen.css';
import { toast } from "react-toastify";
import Review from './Review';
import rfTwo from '../components/template-2.jpg';
import {useNavigate} from 'react-router';
import NavbarTitle from './NavbarTitle';


const HomeScreen = (props) => {
    const [resume,setResume] = useState([]);
    const navigate = useNavigate(resume);
    const setAndNavigate = (resume_id)=>{
        localStorage.setItem('resumeId',resume_id);
        navigate(`/dashboard`);
      }
    async function fetchData(id){
        const response = await fetch(`http://localhost:5000/homescreen/saved/${id}`);
        const parseRes = await response.json();
        const  resumes = [];
        for(let j=0;j < parseRes.length;j++){
            resumes.push(parseRes[j]["resume_id"]);
        }
        setResume([...resumes]);
    }
    useEffect(()=>{
        localStorage.removeItem('resumeId');
        fetch("http://localhost:5000/dashboard/",{
            method:"GET",
            headers:{token:localStorage.token}
        }).then(res=>{
            return res.json()
        }).then((result)=>{
            const userId = result.user_id;
            localStorage.setItem('name',result.user_name);
            fetchData(userId);
        })
    },[]);

    function savedResumes(){
        const array=[];
        for(let i = 0; i < resume.length; i++){
            array.push(
                // <Review key={i} resume_id={resume[i]}/>
                <div key={i} onClick={()=>setAndNavigate(resume[i])}>
                    <img src={rfTwo} alt='Demo'/>
                </div>
            )
        }
        return array
    }

    function createNewResume(){
        try {
                const user_id = localStorage.getItem('userId');
                const body = {user_id};
                fetch("http://localhost:5000/homescreen/add",{
                    method:"POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                }).then((parseRes)=>{
                    return parseRes.json();
                }).then(data=>{
                    if(data){
                        console.log(data);
                        localStorage.setItem('resumeId')
                        toast("Create new Resume");
                    }
                    else{
                        toast("Error")
                    }
                })
                navigate(`/dashboard`);

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <NavbarTitle setAuth={props.setAuth}/>
            <div className='homeScreen' >
                <span  className='subHeading'><h1 id='myresumes'>My Resume</h1> <h3 onClick={()=>createNewResume()}> Add New</h3></span>
                    <div className='resumeContainer' >
                        {savedResumes()}
                    </div>
                    {/* <div id='create-new' onClick={()=>createNewResume()}> Create New Resume</div> */}
            </div>
        </Fragment>
    );
};

export default HomeScreen;