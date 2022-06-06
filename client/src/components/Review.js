import React, { useEffect, useState, Fragment } from 'react';
import ResumeEd from '../review/resumeEd';
import ResumeEx from '../review/resumeEx';
import ResumeProject from '../review/resumeProjects';
import ResumeSkills from '../review/resume_skills';
import { datas } from '../review/rbasicInfo';
import Navbar from './Navbar';
import html2PDF from 'jspdf-html2canvas';
import {useNavigate} from 'react-router';
import '../styles/review.css';

const Review = (props) => {
  const navigate = useNavigate();
  const [name,setName] = useState();
  useEffect(()=>{
    const Name = localStorage.getItem('name');
    setName(Name);
  },[])
  const savePDf = async () =>{
    const pages = document.getElementsByClassName('A4');
    html2PDF(pages, {
      jsPDF: {
        unit: 'px',
        format: 'a4'
      },
      imageType: 'image/jpeg',
      output: './generate.pdf'
    });
  }
  const setAndNavigate = ()=>{
    localStorage.setItem('resumeId',props.resume_id);
    navigate(`/dashboard`);
  }
    return (
      <Fragment>
          <div id='review' onClick={()=>setAndNavigate()}>
          <div className="A4">
            <section className="A5">
              <div id="page1">
                <div id="header">
                  <h1 id="name">{name}</h1>
                  <p>
                  <strong>Ph no:</strong><a id="Ph-number" href={`tel:${datas.contact}`}>{datas.contact}</a> | <strong>Email:</strong>        
                    <a id="email" href={`mailto:${datas.emailId}`}>{datas.emailId}</a>
                  </p>
                  <p>
                    <strong>GitHub:</strong>
                    <a id="github" href={`https://github.com/${datas.githubId}`}>{datas.githubId}</a> 
                  </p>
                </div>
                <div id="education" className="section">
                  <h3 className="section-title">Education</h3>
                    <ResumeEd resumeId={props.resume_id}/>
                </div>
                <div id="work-experience" className="section">
                  <h3 className="section-title">Work Experience</h3>
                  <ResumeEx resumeId={props.resume_id}/>
                </div>
                <div id="projects" className="section">
                  <h3 className="section-title">Projects</h3>
                  <ResumeProject resumeId={props.resume_id}/>
                </div>
                <div id="skills" className="section">
                  <h3 className="section-title">Skills</h3>
                    <ResumeSkills resumeId={props.resume_id}/>
                </div>
              </div>
            </section>

            </div>
            {/* <button className='link-btn' onClick={()=>window.print()}> printOut</button> */}
            </div>
    </Fragment>
    );
};

export default Review;