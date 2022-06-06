import React,{useEffect,useState, Fragment} from 'react';
import Review from './Review';
import Navbar from './Navbar';
import { toast } from "react-toastify";
import '../styles/skills.css';
import SkillsTemplate from './skillsTemplate';

const Skills = (props) => {
    const [tags, setTags] = React.useState([]);
    const [resumeId,setResumeId] = useState();
    const [userId,setUserId] = useState();

    const [sId,setSid] = useState([]);

	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        if(sId[indexToRemove]){
            fetch(`http://localhost:5000/skills/delete/${sId[indexToRemove]}`, { method: 'DELETE' })
            .then(() => console.log('Delete successful'))
            .catch(e=>console.log(e.message))
		setSid([...sId.filter((_, index) => index !== indexToRemove)]);
        }

	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};

    useEffect(()=>{
        const resume_id = localStorage.getItem('resumeId');
        const user_id = localStorage.getItem('userId');

        setResumeId(resume_id);
        setUserId(user_id);
    },[]);

    useEffect(()=>{
        fetchData(resumeId);
    },[resumeId]);

    async function fetchData(id){
        const data = await fetch(`http://localhost:5000/skills/data/${id}`);
        const parseData = await data.json();
    
        let fetched_tags=[], serial_ids=[];;
        for(let i = 0; i < parseData.length; i++){
            fetched_tags.push(parseData[i]["skill"]);
            serial_ids.push(parseData[i]["id"]);

        }
            setTags([...fetched_tags]);
            setSid([...serial_ids]);

    }
    
function handleSave(event){
    event.preventDefault();
    try {
        for(let i=0;i<=tags.length-1;i++){
            if(!sId[i]){
                const skills = tags[i];
                const user_id = userId;
                const resume_id = resumeId;
                const body = {user_id, resume_id, skills};
                fetch("http://localhost:5000/skills/skills",{
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
    }
    } catch (error) {
        console.log(error.message);
    }
    // fetchData(resumeId);
    // window.top.location.reload();

}
	return (
        <Fragment>
            <Navbar setAuth={props.setAuth} />
            <div>
                <SkillsTemplate handleSave={handleSave} removeTags={removeTags} addTags={addTags} tags={tags}/>
            </div>
        </Fragment>
	);
};

export default Skills;
