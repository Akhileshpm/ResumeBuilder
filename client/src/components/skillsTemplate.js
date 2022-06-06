import React from 'react';
import Next from './next';
import '../styles/skills.css';
import Previous from './previous';

const skillsTemplate = (props) => {
    return (
            <div className='tags-container'>
                        <h1>Skills</h1>
                        <div className="tags-input">
                            <ul id="tags">
                                {props.tags.map((tag, index) => (
                                    <li key={index} className="tag">
                                        <span className='tag-title'>{tag}</span>
                                        <span className='tag-close-icon' onClick={() => props.removeTags(index)}>
                                            <i style={{fontSize:"15px"}} class="material-icons">delete</i>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <input
                                type="text"
                                onKeyUp={event => event.key === "Enter" ? props.addTags(event) : null}
                                placeholder="Press enter to add skills"/>
                        </div>
                        <Previous id="prev-button" point={'projects'}/>
                        <Next id="prev-button" point={'choose-template'}/>
                        <button id="save-button" onClick={props.handleSave}><span>Save</span></button>
                    </div>
    );
};
export default skillsTemplate;