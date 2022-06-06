import React, { useEffect, useState } from 'react';

const ResumeSkills = ({resumeId}) => {
    const [tag, setTag] = useState([]);


    async function fetchData(id){
        const data = await fetch(`http://localhost:5000/skills/data/${id}`);
        const parseData = await data.json();

        let tags=[];
        for(let i = 0; i < parseData.length; i++){
            tags.push(parseData[i]["skill"]);
        }
            setTag([...tags]);
    }
    useEffect(()=>{
        const localId = localStorage.getItem('resumeId'); 
        resumeId === undefined ? fetchData(localId) :  fetchData(resumeId);
        
    },[])

    function createUI(){
        const array=[];
        for(let i = 0; i < tag.length; i++){
            array.push(
                <ul key={i} className='rTag'>
                   <li> 
                        <span id="title-tag">{tag[i]}</span>
                    <br/>
                    </li>
             </ul>
            )
        }
        return array;
    }

    return (
    <div className='rTag-container'>
        {createUI()}
    </div>);
};
export default ResumeSkills;