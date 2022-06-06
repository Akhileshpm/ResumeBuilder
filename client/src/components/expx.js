import React from 'react';
import '../styles/ExpComponents.css';
import { toast } from "react-toastify";
import Previous from './previous';
import Next from './next';
import CreateUIEx from './creatuiEx';


class Experience extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            values : [],
            company : [],
            responsibility : [],
            role:[],
            duration:[],
            name:"",
            user_id: "",
            s_id:[]
        };

        this.handleSave = this.handleSave.bind(this);
        this.collectCompany = this.collectCompany.bind(this);
        this.collectRes = this.collectRes.bind(this);
        this.collectRole = this.collectRole.bind(this);
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
        let val = await this.props.data;
        let companies=[],roles=[],durations=[],responsibilities=[],serial_id=[];
        for(let i = 0; i < val.length; i++){
            companies.push(val[i]["company"]);
            roles.push(val[i]["role"]);
            durations.push(val[i]["duration"]);
            responsibilities.push(val[i]["responsibility"])
            serial_id.push(val[i]["id"]);
        }
        this.setState({
            company:[...companies],
            role:[...roles],
            duration:[...durations],
            responsibility:[...responsibilities],
            s_id:[...serial_id]
        })
    }
    componentDidMount(){
        this.getName();
        this.fetchInfo();
    }

    collectCompany(event,i){
        let institution = [...this.state.company];
        institution[i] = (event.target.value);
        this.setState(prevState => ({
            values: [...prevState.values],
            company:institution,
            responsibility: [...prevState.responsibility]
        }));
    }

    collectRes(event, i){
        
        let spec = [...this.state.responsibility];
        spec[i] = event.target.value;
        this.setState(prevState => ({
            values: [...prevState.values],
            company:[...prevState.company],
            responsibility: spec
        }));
    }

    collectRole(event, i){
        let roles = [...this.state.role];
        roles[i] = event.target.value;
        this.setState(prevState => ({
            values: [...prevState.values],
            company: [...prevState.company],
            responsibility: [...prevState.responsibility],
            role: roles
        }));
    }

    collectDuration(event, i){
        let durations = [...this.state.duration];
        durations[i] = event.target.value;
        this.setState(prevState => ({
            values: [...prevState.values],
            company: [...prevState.company],
            responsibility: [...prevState.responsibility],
            role: [...prevState.role],
            duration: durations
        }));
    }

    addClick(){
        this.setState(prevState => ({
            values: [...prevState.values,'temporary'],
        }))
    }

    // createUI(){
    //     return this.state.values.map((el,i) => 
    //             <div  key={i+1} className='exForms'>
    //                 <label>Role:
    //                     <input type="text" name="role" onChange={(event)=>this.collectRole(event,i+1)} />
    //                 </label>
    //                 <label>Company:
    //                     <input type="text" name="company" onChange={(event)=>this.collectCompany(event,i+1)} />
    //                 </label>
    //                 <label>Responsibility:
    //                     <input type="text" name="responsibility" onChange={(event)=>this.collectRes(event,i+1)} />
    //                 </label>
    //                 <label>Duration:
    //                     <input type="text" name="duration" onChange={(event)=>this.collectDuration(event,i+1)} />
    //                 </label>            
    //             </div>
    //     )
    // }

    // loadUI(val){
    //     const array=[];
    //     for(var i = 0; i < val.length; i++){
    //         array.push(
    //         <div key={i+1} className='exForms'>
    //             <label>Role:
    //                 <input type="text" name="role" onChange={(event)=>this.collectRole(event,i+1)} value={val[i]["role"]}/>
    //             </label>
    //             <label>Company:
    //                 <input type="text" name="company" onChange={(event)=>this.collectCompany(event,i+1)} value={val[i]["company"]} />
    //             </label>
    //             <label>Responsibility:
    //                 <input type="text" name="responsibility" onChange={(event)=>this.collectRes(event,i+1)} value={val[i]["responsibility"]}/>
    //             </label>
    //             <label>Duration:
    //                         <input type="text" name="duration" onChange={(event)=>this.collectDuration(event,i+1)} value={val[i]["duration"]} />
    //             </label>
    //         </div>)
    //     }
    //     return array.map(e=>e)
    // }

    handleSave(event){
        event.preventDefault();
        try {
            for(var i=0;i<=this.state.responsibility.length-1;i++){
                    const Responsibility = this.state.responsibility[i];
                    const company = this.state.company[i];
                    const duration = this.state.duration[i];
                    const user_id = this.state.user_id;
                    console.log("ExpComponents.js/",this.state.user_id);
                    const role = this.state.role[i];
                    const body = {user_id, role, company, Responsibility, duration};
                    fetch("http://localhost:5000/expcomponent/experience",{
                        method:"POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    }).then((parseRes)=>{
                        return parseRes.json();
                    }).then(data=>{
                        if(data){
                            toast("Saved successfully");
                        }
                        else{
                            toast("Error")
                        }
                    })
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    render(){
        const one = 1;
        return(
                <div>
                    <h1>Experience</h1>
                   {
                    (this.props.ex.length) ? 
                    (
                    <form className='experience-spacing' onSubmit={this.handleSave}>
                        <CreateUIEx  val={this.props.data} collectCompany={this.collectCompany} 
                        collectRole={this.collectRole} collectDuration={this.collectDuration} collectRes={this.collectRes} CreateUI={0}
                        company={this.state.company} role={this.state.role} responsibility={this.state.responsibility} duration={this.state.duration}/>

                        <CreateUIEx helper={this.props.data.length} values={this.state.values} collectCompany={this.collectCompany} 
                        collectRole={this.collectRole} collectDuration={this.collectDuration} collectRes={this.collectRes} CreateUI={1}/>
                        <input type='button' value='ADD' onClick={this.addClick}/>
                        <input type="submit" value="Update" />
                    </form>
                    ) 
                    : 
                    <form className='experience-spacing' onSubmit={this.handleSave}>
                        <div  key={0} className='exForms'>
                            <label>Role:
                                <input type="text" name="role" onChange={(event)=>this.collectRole(event,0)} />
                            </label>
                            <label>Company:
                                <input type="text" name="company" onChange={(event)=>this.collectCompany(event,0)} />
                            </label>
                            <label>Responsibility:
                                <input type="text" name="responsibility" onChange={(event)=>this.collectRes(event,0)} />
                            </label>
                            <label>Duration:
                                <input type="text" name="duration" onChange={(event)=>this.collectDuration(event,0)} />
                            </label>            
                        </div>
                        {this.createUI()}
                        <input className='add-btn' type='button' value='ADD' onClick={this.addClick}/>
                        <input className='save-btn' type="submit" value="SAVE" />                
                    </form>
                    }
                    <Previous point={'education'}/>
                    <Next point={'projects'}/>
                </div>
        );
    }
}

export default Experience;
