import React, { Fragment, useEffect, useState } from 'react';

const ResumeProject = ({resumeId}) => {
    const [skill, setSkill] = useState([]);
    const [description, setDescription] = useState([]);
    const [title, setTitle] = useState([]);

    async function fetchData(id){
        const data = await fetch(`http://localhost:5000/projects/data/${id}`);
        const parseData = await data.json();
        let descriptions=[],skills=[],titles=[];
        for(let i = 0; i < parseData.length; i++){
            descriptions.push(parseData[i]["description"]);
            titles.push(parseData[i]["title"]);
            skills.push(parseData[i]["skills"]);
        }
            setTitle([...titles]);
            setDescription([...descriptions]);
            setSkill([...skills]);
    }
    useEffect(()=>{
        const localId = localStorage.getItem('resumeId'); 
        resumeId === undefined ? fetchData(localId) :  fetchData(resumeId);
    },[])

    function createUI(){
        const array=[];
        for(let i = 0; i < title.length; i++){
            array.push(
                <ul key={i} className='rProject'>
                   <li> 
                    <span id="title-ti">{title[i]}</span>
                    <br/>
                    <span id="title-sk">{skill[i]}</span>          
                    <br/>
                    <span id="title-de">{description[i]}</span>   
                    </li>
             </ul>
            )
        }
        return array;
    }

    return (
    <div className='rProject-container'>
        {createUI()}
    </div>);
};
export default ResumeProject;