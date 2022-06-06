import React from 'react';
import Forms from './forms' 
import { Fragment } from 'react';

const BasicInfo = ({name,mail,github,phone}) => {

    return (
        <Fragment>
            <h1> {name}'s dashboard</h1>
            <div id="title" >Create Your Resume</div>
            <div className='header'>
                <Forms fieldName = "Full Name:" name={name}/>
                <Forms fieldName = "Contact Info:" name={phone}/>
                <Forms fieldName = "Email ID:" name={mail}/>
                <Forms fieldName = "GitHub Id:" name={github}/>
            </div>
        </Fragment>
    );
};

export default BasicInfo;