import React,{Fragment,useEffect,useState} from 'react';
import Previous from './previous';
import Next from './next';
import Navbar from './Navbar';
import {useNavigate} from 'react-router';
import rfOne from '../components/template-1.jpg'
import rfTwo from '../components/template-2.jpg'
import rfThree from '../components/template-3.jpg'
import rfFour from '../components/template-4.jpg'
import rfFive from '../components/template-5.jpg'
import rfSix from '../components/template-6.jpg'

import Template from './templateOne';
import TemplateTwo from './templateTwo';
import TemplateThree from './templateThree';

const ChooseTemplate = (props) => {
    const [resumeId,setResumeId] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        const temp = localStorage.getItem('resumeId');
        setResumeId(temp);
    },[])
    const setAndNavigate = (resume_id)=>{
        localStorage.setItem('rf',resume_id);
        navigate(`/review`);
      }
    return (
        <Fragment>
        <Navbar setAuth={props.setAuth}/>
        <div className='template-container'>
            <div className='template-1 templates' onClick={()=>setAndNavigate('template-1')} >
                <img src={rfThree} alt='Resume Demo'/>
            </div>
            <div className='template-2 templates' onClick={()=>setAndNavigate('template-4')}>
                <img src={rfOne} alt='Resume Demo'/>
            </div>
            <div className='template-3 templates' onClick={()=>setAndNavigate('template-3')}>
                <img src={rfFour} alt='Resume Demo'/>
            </div> 
            <div className='template-1 templates' onClick={()=>setAndNavigate('template-2')}>
                <img src={rfFive} alt='Resume Demo'/>
            </div>
            <div className='template-2 templates' onClick={()=>setAndNavigate('template-5')}>
                <img src={rfSix} alt='Resume Demo'/>
            </div>
            <div className='template-3 templates' onClick={()=>setAndNavigate('template-6')}>
                <img src={rfTwo} alt='Resume Demo'/>
            </div> 
        </div>
        <Previous point={'skills'} id='prev-button'/>
        <Next point={'review'} id='prev-button'/>
        </Fragment>
    );
};

export default ChooseTemplate;