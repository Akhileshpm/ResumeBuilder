import React,{useEffect,Fragment} from 'react';
import { useState } from 'react';
import { toast } from "react-toastify";
import Next from './next';
import Previous from './previous';
import '../styles/project.css';
import Navbar from './Navbar';

const Project = (props) => {
    const [skill, setSkill] = useState([]);
    const [description, setDescription] = useState([]);
    const [title, setTitle] = useState([]);
    const [values,setValues] = useState(0);
    const [current, setCurrent] = useState(0);
    const [userId,setUserId] = useState();
    const [resumeId,setResumeId] = useState();
    const [sId,setSid] = useState([]);

function setSkillFunction(e,i){
    setSkill((prevState)=>{
        let newSkill = [...skill];
        newSkill[i] = e.target.value;
        return newSkill;
    })
}
function setDescriptionFunction(e,i){
    
    setDescription((prevState)=>{
        let newDescription = [...description];
        newDescription[i] = e.target.value;
        return newDescription;
    })
}
function setTitleFunction(e,i){
    setTitle((prevState)=>{
        let newTitle = [...title];
        newTitle[i] = e.target.value;
        return newTitle;
    })
}
function display(e){
    e.preventDefault();
    setValues((prevState)=>{
        return (prevState+1);
    });
}
useEffect(()=>{
    setCurrent(values);
},[values]);
useEffect(()=>{
    const resume_id = localStorage.getItem('resumeId');
    const user_id  = localStorage.getItem('userId');
    setResumeId(resume_id);
    setUserId(user_id);
},[]);
  
useEffect(()=>{
    fetchData(resumeId);
},[resumeId]);

async function fetchData(id){
    const data = await fetch(`http://localhost:5000/projects/data/${id}`);
    const parseData = await data.json();

    let descriptions=[],skills=[],titles=[],serial_ids=[];
    for(let i = 0; i < parseData.length; i++){
        descriptions.push(parseData[i]["description"]);
        titles.push(parseData[i]["title"]);
        serial_ids.push(parseData[i]["id"]);
        skills.push(parseData[i]["skills"]);
    }
        setTitle([...titles]);
        setDescription([...descriptions]);
        setSid([...serial_ids]);
        setSkill([...skills]);
}
function setDisplay(i){
    setCurrent(i);
}
function deleteFtn(i){
    let newDescription = description;
    newDescription.splice(i,1);
    setDescription([...newDescription]);

    let newTitle = title;
    newTitle.splice(i,1);
    setTitle([...newTitle]);

    let newSkill = skill;
    newSkill.splice(i,1);
    setSkill([...newSkill]);

    setCurrent(newSkill.length);

    setValues(newSkill.length);

    fetch(`http://localhost:5000/projects/delete/${sId[i]}`, { method: 'DELETE' })
    .then(() => console.log('Delete successful'))
    .catch(e=>console.log(e.message))

}
function createUI(){
    const array=[];
    for(let i = 0; i < skill.length; i++){
        array.push(
                    <div key={i}>
                    <p id="delete-button" onClick={()=>deleteFtn(i)}>Delete</p>
                        <div  key={i} className='display-mate-mini' onClick={()=>setDisplay(i)}>
                            <p id="titlee">{title[i]}</p>
                            <p id="skill">{skill[i]}</p> 
                            <p id="desc">{description[i]}</p>
                        </div>
                    </div>
        )
    }
    return array;
}

function handleSave(event){ 
    event.preventDefault();
    try {
        for(let i=0;i<=skill.length-1;i++){
                const desc = description[i];
                const skills = skill[i];
                const tytle = title[i];
                const resume_id = resumeId;
                const user_id = userId;
                const serial_id = sId[i];
                const body = {resume_id, user_id,skills, desc, tytle, serial_id};
                fetch("http://localhost:5000/projects/project",{
                    method:"POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                }).then((parseRes)=>{
                    return parseRes.json();
                }).then(data=>{
                    if(data){
                        toast("Saved successfully",data);
                    }
                    else{
                        toast("Error")
                    }
                })
        }
    } catch (error) {
        console.log(error.message);
    }
    // fetchData(userId);

}

return (
    <Fragment>
            <Navbar setAuth={props.setAuth} />
            <div className="project-object">
                <h1>Project</h1>
                <form>
                    <input placeholder="Title" type="text" onChange={(e) => setTitleFunction(e,current)} value={title[current] ? title[current] : ""}></input>
                    <input placeholder="Skills" type="text" value={skill[current] ? skill[current] : ""} onChange={(e) => setSkillFunction(e,current)}></input>
                    <textarea placeholder='Description' value={description[current] ? description[current] : ""} onChange={(e) => setDescriptionFunction(e,current)} required></textarea>
                    <button class="button-27" onClick={display}><span>Add project</span></button>
                </form>
                <Previous id="prev-button" point={'experience'}/>
                <Next id="prev-button" point={'skills'}/>
            </div>
            <div className="display-mate">
                    {createUI()}
            </div>
            <button id="save-button" onClick={handleSave}><span>Save</span></button>
    </Fragment>
    );
};

export default Project;

// function createUI(){
//     return skill.map((element,i) => {
//             return <div key={i}>
//                     <p id="delete-button" onClick={()=>deleteFtn(i)}>Delete</p>
//                         <div  key={i} className='display-mate-mini' onClick={()=>setDisplay(i)}>
//                             <p id="titlee">{title[i]}</p>
//                             <p id="skill">{skill[i]}</p> 
//                             <p id="desc">{description[i]}</p>
//                         </div>
//                     </div>
//         }
//     )
// }
