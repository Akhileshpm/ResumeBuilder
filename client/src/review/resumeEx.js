import React, { Fragment, useEffect, useState } from 'react';

const ResumeEx = ({resumeId}) => {
    const [institution,setInstitution] = useState([]);
    const [role,setRole] = useState([]);
    const [duration,setDuration] = useState([]);
    const [responsibility,setResponsibility] = useState([]);

    async function fetchData(id){
        const data = await fetch(`http://localhost:5000/expcomponent/data/${id}`);
        const parseData = await data.json();

        let institutions=[],roles=[],durations=[],responsibilities=[];
        for(let i = 0; i < parseData.length; i++){
            institutions.push(parseData[i]["company"]);
            roles.push(parseData[i]["role"]);
            durations.push(parseData[i]["duration"]);
            responsibilities.push(parseData[i]["responsibility"]);
        }
            setRole([...roles]);
            setDuration([...durations]);
            setInstitution([...institutions]);
            setResponsibility([...responsibilities]);
    }
    useEffect(()=>{
        const localId = localStorage.getItem('resumeId'); 
        resumeId === undefined ? fetchData(localId) :  fetchData(resumeId);
    },[])

    function createUI(){
        const array=[];
        for(let i = 0; i < institution.length; i++){
            array.push(
                <ul key={i} className='rExperience'>
                   <li> 
                   <span id="title-ro">{role[i]}</span> | <span id="title-du">{duration[i]}</span> 
                    <br/>
                    <span id="title-in">{institution[i]}</span>
                    <br/>
                    <span id="title-re">{responsibility[i]}</span>          
                    <br/>  
                    </li>
             </ul>
            )
        }
        return array;
    }

    return (
    <div className='rExperience-container'>
        {createUI()}
    </div>);
};
export default ResumeEx;