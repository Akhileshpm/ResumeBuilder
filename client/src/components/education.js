import React,{Fragment} from 'react';
import '../styles/index.css';
import { toast } from "react-toastify";
import CreateUI from './createui.js';
import Next from './next';
import Previous from './previous';
import EdTemplate from './EdTemplate';
import Navbar from './Navbar';
class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            values : [],
            institutions : [],
            specs : [],
            course:[],
            resume_id:"",
            data:{},
            name:"",
            user_id:"",
            s_id:[]
        };
        this.handleSave = this.handleSave.bind(this);
        this.collectInfo = this.collectInfo.bind(this);
        this.collectSpec = this.collectSpec.bind(this);
        this.collectCourse = this.collectCourse.bind(this);
        this.addClick = this.addClick.bind(this);
        this.fetchInfo = this.fetchInfo.bind(this);
    }

    getName(){
        try {
            fetch("http://localhost:5000/dashboard/",{
                method:"GET",
                headers:{token:localStorage.token}
            }).then(res=>{
                return res.json()
            }).then((result)=>{
                this.setState({
                name:result.user_name,
                user_id:result.user_id
                })
            })
        } catch (error) {
            console.error(error.message);
        }
    }
    async fetchInfo(){
        const resumeId = localStorage.getItem('resumeId');
        let result = await fetch(`http://localhost:5000/homepage/data/${resumeId}`);
        let parseResult = await result.json();
        console.log(parseResult);
        this.setState(prevState => ({
            ...prevState,
            resume_id: resumeId,
            data: parseResult
        }));

        let val = parseResult;
        let institutions=[],specs=[],course=[],serial_id=[];
        for(let i = 0; i < val.length; i++){
            institutions.push(val[i]["institution"]);
            specs.push(val[i]["specialization"]);
            course.push(val[i]["course"]);
            serial_id.push(val[i]["id"]);
        }
        this.setState({
            specs:[...specs],
            course:[...course],
            institutions:[...institutions],
            s_id:[...serial_id]
        })
    }
    componentDidMount(){
        this.getName();
        this.fetchInfo();
    }
    collectInfo(event,i){
        let institution = [...this.state.institutions];
        institution[i] = (event.target.value);
        this.setState(prevState => ({
            ...prevState,
            institutions:institution,
        }));
    }
    collectSpec(event, i){
        let spec = [...this.state.specs];
        spec[i] = event.target.value;
        this.setState(prevState => ({
            values: [...prevState.values],
            institutions:[...prevState.institutions],
            specs: spec
        }));
    }
    collectCourse(event, i){
        let courses = [...this.state.course];
        courses[i] = event.target.value;
        this.setState(prevState => ({
            values: [...prevState.values],
            institutions: [...prevState.institutions],
            specs: [...prevState.specs],
            course: courses
        }));
        
    }
    addClick(){
        this.setState(prevState => ({
            values: [...prevState.values,'temporary'],
        }))
    }
    handleSave(event){
        event.preventDefault();
        try {
            for(let i=0;i<this.state.specs.length;i++){

                    const specialization = this.state.specs[i];
                    const institution    = this.state.institutions[i];
                    const user_id        = this.state.user_id;
                    const resume_id      = this.state.resume_id;
                    const course         = this.state.course[i] ? this.state.course[i] : "Masters";
                    const serial_id      = this.state.s_id[i];
                    const body           = {user_id, resume_id, course, institution, specialization, serial_id};

                    fetch("http://localhost:5000/homepage/education",{
                        method:"POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    }).then((parseRes)=>{
                        return parseRes.json();
                    }).then(data=>{
                        if(data){toast("Saved successfully");}
                        else{toast("Error")}
                    })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    render(){
        const one = 1;
        return(
            <Fragment>
                <Navbar setAuth={this.props.setAuth}/>
                <div>
                    <h1>Education Qualifications</h1>
                    { 
                    (this.state.data.length) ? 
                    (<div className='education'>
                        <form className='education-spacing' onSubmit={this.handleSave}>
                            <CreateUI  val={this.state.data} collectCourse={this.collectCourse} 
                            collectInfo={this.collectInfo} collectSpec={this.collectSpec} CreateUI={0}
                            course={this.state.course} spec={this.state.specs} institution={this.state.institutions}/>

                            <CreateUI helper={this.state.data.length} values={this.state.values} collectCourse={this.collectCourse} 
                            collectInfo={this.collectInfo} collectSpec={this.collectSpec} CreateUI={1}/>
                            <input type='button' value='ADD' onClick={this.addClick}/>
                            <input type="submit" value="Update" />
                        </form>
                    </div>) : 
                    (
                    
                        <EdTemplate handlesave={this.handleSave} values={this.state.values} collectCourse={this.collectCourse}
                        collectInfo={this.collectInfo} collectSpec={this.collectSpec} addClick={this.addClick} helper={one}/>
                    )
                     }
                    <Previous point={'dashboard'}/>
                    <Next point={'experience'}/>
                </div>
            </Fragment>
        );
    }

}

export default HomePage;
