import React,{Fragment,useEffect, useState} from 'react';
import Navbar from './Navbar';
import Previous from './previous';
import '../styles/chooseTemplate.css'
import Review from './Review';
import Next from './next';
import Template from './templateOne';
import TemplateTwo from './templateTwo';
import TemplateThree from './templateThree';

const ResumeReview = (props) => {
    const [resumeId,setResumeId] = useState();
    useEffect(()=>{
        const temp = localStorage.getItem('resumeId');
        setResumeId(temp);
    },[])
    const review = () =>{
        const id = localStorage.getItem('rf');
        switch(id) {
            case 'template-1':
                return <Template resume_id={resumeId}/>
            case 'template-2':
                return <TemplateTwo resume_id={resumeId}/>
            case 'template-3':
                return <TemplateThree  resume_id={resumeId}/>
            case 'template-4':
                return <Review resume_id={resumeId}/>
              default:
                break;
          }
    }
    return (
        <Fragment>
            <Navbar setAuth={props.setAuth}/>
            <Previous id="prev-button" point={'choose-template'}/>
                {review()}
            {/* <Review resume_id={resumeId}/> */}
            {/* <Next id='next-button' point={'choose-template'}/> */}
            <button className='link-btn' onClick={()=>window.print()}> printOut</button>
            
        </Fragment>
    );
};

export default ResumeReview;