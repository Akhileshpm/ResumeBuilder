//Default template for new users
import React, { Fragment } from 'react';
import CreateUI from './createui';

const EdTemplate = (props) => {

    return (
        <Fragment>
            <form className='education-spacing' onSubmit={props.handlesave}>
                        <div  key={0} className='edForms'>
                            <label for="Course">Choose the Course:</label>
                            <select name="Education" id="Education" onChange={event=>props.collectCourse(event,0)} >
                                <option value="Masters">Masters</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor of Technology">Bachelor of Technology</option>
                                <option value="High School">High School</option>
                            </select>
                            <br/><br/>
                            <label>Institution name:
                                <input type="text" name="iname" onChange={(event)=>props.collectInfo(event,0)} />
                            </label>
                            <label>Specialization:
                                <input type="text" name="specs" onChange={(event)=>props.collectSpec(event,0)} />
                            </label>            
                        </div>
                            <CreateUI CreateUI={1} helper={props.helper} values={props.values} collectCourse={props.collectCourse} collectInfo={props.collectInfo} collectSpec={props.collectSpec} />
                        <input className='ads' type='button' value='ADD' onClick={props.addClick}/>
                        <input className='ads' type="submit" value="SAVE" onClick={props.handlesave}/>          
                    </form>
        </Fragment>
    );
};

export default EdTemplate;