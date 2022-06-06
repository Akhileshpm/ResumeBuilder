import React from 'react';
import '../styles/templateTwo.css'
import ResumeSkills from '../review/resume_skills';
import ResumeProjects from '../review/resumeProjects';
import { datas } from '../review/rbasicInfo';
import ResumeEx from '../review/resumeEx';
import ResumeEd from '../review/resumeEd';


const TemplateTwo = ({resume_id}) => {
    return (
        <div className='template-two'>
            <div className="side-bar">
                <p>Contact:<br/> {datas.contact}</p>
                <p>Github: <br/>{datas.githubId}</p>
                <p>Email: <br/>{datas.emailId}</p><br/>

                <p class="caps side-header">Skills</p>
                    <ResumeSkills resume_id={resume_id}/>
            </div>
            <div className="content-container">
                <h2 class="caps title" style={{background:'grey', padding:'5px 6px'}}>{datas.user_name}</h2>
                <div class="separator"></div>
                <br/>
                <br/>
                <div class="caps greyed" style={{fontSize:20, color:'grey', padding:"10px"}}>Experience</div>
                        <ResumeEx resume_id={resume_id}/>
                
                <br/>
                <div class="caps greyed" style={{fontSize:20, color:'grey',padding:"10px"}}>Education</div>
                        <ResumeEd resume_id={resume_id}/>
                <br/>
                <div class="caps greyed" style={{fontSize:20, color:'grey', padding:"10px"}}>Projects</div>
                        <ResumeProjects resume_id={resume_id}/>
            </div>
</div>);
};

export default TemplateTwo;