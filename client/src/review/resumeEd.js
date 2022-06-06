import React, { Fragment, useEffect, useState } from 'react';

const ResumeEd = ({resumeId}) => {
    const [institution,setInstitution] = useState([]);
    const [specialization,setSpecialization] = useState([]);
    const [course,setCourse] = useState([]);

    async function fetchData(id){
        const data = await fetch(`http://localhost:5000/homepage/data/${id}`);
        const parseData = await data.json();
        
        let courses=[],institutions=[],specializations=[];
        for(let i = 0; i < parseData.length; i++){
            institutions.push(parseData[i]["institution"]);
            courses.push(parseData[i]["course"]);
            specializations.push(parseData[i]["specialization"]);
        }
            setCourse([...courses]);
            setSpecialization([...specializations]);
            setInstitution([...institutions]);
    }
    useEffect(()=>{
        const localId = localStorage.getItem('resumeId'); 
        resumeId === undefined ? fetchData(localId) :  fetchData(resumeId);
        fetchData(resumeId);
    },[])

    function createUI(){
        const array=[];
        for(let i = 0; i < institution.length; i++){
            array.push(
                <ul key={i} className='rEducation'>
                   <li> 
                    <span id="title-ed">{institution[i]}</span>
                    <br/>
                    <span id="title-co">{course[i]}</span>          
                    <br/>
                    <span id="title-sp">{specialization[i]}</span>   
                    </li>
             </ul>
            )
        }
        return array;
    }

    return (
    <div className='rEducation-container'>
        {createUI()}
    </div>);
};
export default ResumeEd;