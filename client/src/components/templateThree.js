import React from 'react';
import ResumeEd from '../review/resumeEd';
import ResumeEx from '../review/resumeEx';
import ResumeProject from '../review/resumeProjects';
import ResumeSkills from '../review/resume_skills';
// import '../styles/templateThree.css';

const TemplateThree = ({resume_id}) => {
    return (
        <div>
            <section id="main-section">
                <header id="template3-title">
                    <h1>John Doe</h1>
                </header>
                <section class="main-block">
                    <h2>
                    <i class="fa fa-suitcase"></i> Experience
                    </h2>
                    <ResumeEx resume_id={resume_id}/>
                </section>
                <section class="main-block">
                    <h2>
                    <i class="fa fa-folder-open"></i> Selected Projects
                    </h2>
                    <ResumeProject resume_id={resume_id}/>
                </section>
                <section class="main-block concise">
                    <h2>
                    <i class="fa fa-graduation-cap"></i> Education
                    </h2>
                    <ResumeEd resume_id={resume_id}/>
                </section>
                </section>
                <aside id="sidebar">
                <div class="side-block" id="contact">
                    <h1>
                    Contact Info
                    </h1>
                    <ul>
                    <li><i class="fa fa-globe"></i> johndoe.gtld</li>
                    <li><i class="fa fa-linkedin"></i> linkedin.com/in/john</li>
                    <li><i class="fa fa-envelope"></i> me@johndoe.gtld</li>
                    <li><i class="fa fa-phone"></i> 800.000.0000</li>
                    </ul>
                </div>
                <div class="side-block" id="skills">
                    <h1>
                    Skills
                    </h1>
                    <ul>
                    <li>Omnipresence</li>
                    <li>Anonymity</li>
                    </ul>
                    <ul>
                    <li>Ordinarity</li>
                    <li>No name rights</li>
                    </ul>
                </div>
                <div class="side-block" id="disclaimer">
                    This r&eacute;sum&eacute; was wholly typeset with HTML/CSS &mdash; see <code>git.io/vVSYL</code>
                </div>
                </aside>
        </div>
    );
};

export default TemplateThree;