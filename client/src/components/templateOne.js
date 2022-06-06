import React from 'react';
import '../styles/styles.css';
import ResumeEd from '../review/resumeEd';
import ResumeSkills from '../review/resume_skills';

const TemplateOne = (props) => {
    return (
        <div className='template-one'>
        <section id="save">
            <section class="sheet" data-page-number="1">
                <aside>
                    <section class="contact">
                        <h6>Contact</h6>
                        <ul>
                            <li>
                                <p><i class="fa fa-map-marker-alt" title="Location"></i> San Francisco, CA</p>
                            </li>
                            <li>
                                <p><i class="fa fa-phone" title="Cell phone"></i> <a href="tel:4153234000">(415) 323-4000</a></p>
                            </li>
                            <li>
                                <p><i class="fa fa-envelope" title="Email"></i> <a href="mailto:joe@joesmith.site">joe@joesmith.site</a></p>
                            </li>
                            <li>
                                <p><i class="fa fa-globe-americas" title="Website"></i> <a href="https://joesmith.site">joesmith.site</a></p>
                            </li>
                            <li>
                                <p><i class="fab fa-github" title="GitHub"></i> <a href="https://github.com/Tombarr">github.com/Tombarr</a></p>
                            </li>
                        </ul>
                    </section>
                    <section class="skills">
                        <h6>Skills</h6>
                       
                            {/* <li><span>Responsive Design</span></li>
                            <li><span>Mobile Development</span></li>
                            <li><span>Usability Testing</span></li>
                            <li><span>Data Visualization</span></li>
                            <li><span>A/B Testing</span></li> */}
                            <ResumeSkills resume_id={props.resumeId}/>
                       
                    </section>
                    <section class="skills">
                        <h6>Technologies</h6>
                        <ul>
                            <li><span>JavaScript&nbsp;</span></li>
                            <li><span>PHP</span></li>
                            <li><span>HTML5</span></li>
                            <li><span>CSS3</span></li>
                            <li><span>Bootstrap</span></li>
                            <li><span>React</span></li>
                        </ul>
                    </section>
                    <section class="references">
                        <h6>References</h6>
                        <address>
                            Jane Doe<br/>
                            Alphabet Inc.<br/>
                            (413) 025-1900
                            jane@janedoe.site
                        </address>
                        <address>
                            Luke O'Connor<br/>
                            Facebook<br/>
                            (413) 125-1400
                            luke@facebook.site
                        </address>
                        <p>Typeset in HTML &amp; CSS<br/>
                        See <a href="https://git.io/f4dXp">git.io/f4dXp</a></p>
                    </section>
                </aside>
                <section>
                    <header class="name" aria-label="Joe Smith">
                        <hr/>
                    </header>
                    <section>
                    <section class="experience">
                            <h6>Experience</h6>
                            <ol>
                                <li>
                                    <header>
                                        <p class="sanserif">Senior Software Engineer</p>
                                        <time>2016 – Present</time>
                                    </header>
                                    <span>Google</span>
                                    <ul>
                                        <li>Developed scalable database indexing technology</li>
                                        <li>Created GraphQL APIs for accessing Google Earth</li>
                                        <li>Leveraged Waymo datasets to double traffic statistics accuracy</li>
                                    </ul>
                                </li>
                                <li>
                                    <header>
                                        <p class="sanserif">Software Engineer</p>
                                        <time>2014 – 2016</time>
                                    </header>
                                    <span>Facebook</span>
                                    <ul>
                                        <li>Collected political affiliation data from millions of users</li>
                                        <li>Authored user stories and mapped user journeys</li>
                                        <li>Introduced regression testing to Yoga layout framework</li>
                                    </ul>
                                </li>
                                <li>
                                    <header>
                                        <p class="sanserif">Software Engineer Intern</p>
                                        <time>2013 – 2014</time>
                                    </header>
                                    <span>Twitter</span>
                                    <ul>
                                        <li>Analyzed and optimized code coverage across Scala architecture</li>
                                        <li>Created project environment setup XML files</li>
                                        <li>Maintained TCP/IP connections with 250,000 concurrent users</li>
                                    </ul>
                                </li>
                                <li>
                                    <header>
                                        <p class="sanserif">Independent iOS Engineer</p>
                                        <time>2012 – Present</time>
                                    </header>
                                    <ul>
                                        <li>Developed SuperUltraCoolWeather app using AccuWeather API</li>
                                        <li>Shipped products to more than 1,000,000 daily active users</li>
                                    </ul>
                                </li>
                            </ol>
                    </section>
                        <section class="education">
                            <h6>Education</h6>
                            <ResumeEd/>
                        </section>
                    </section>
                </section>
            </section>
        </section>
</div>
    );
};

export default TemplateOne;