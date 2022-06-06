import React from 'react';

class Ed extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            values : [],
            institutions : [],
            specs : []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.collectInfo = this.collectInfo.bind(this);
        this.collectSpec = this.collectSpec.bind(this);
        this.addClick = this.addClick.bind(this);
    }

    collectInfo(event,i){
        let institution = [...this.state.institutions];
        institution[i] = (event.target.value);
        this.setState(prevState => ({
            values: [...prevState.values],
            institutions:institution,
            specs: [...prevState.specs]
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
        console.log("SPECS",this.state.specs);
    }

    addClick(){
        this.setState(prevState => ({ values: [...prevState.values,'']}))
        console.log('inst',this.state.institutions);
        console.log("SPECS",this.state.specs);
    }

    createUI(){
        return this.state.values.map((el,i) => 
        <div key={i} className='edForms'>
            <label for="Course">Choose the Course:</label>
            <select name="Education" id="Education">
                <option value="Masters">Masters</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor of Technology">Bachelor of Technology</option>
                <option value="High School">High School</option>
            </select>
            <br/><br/>
            <label>Institution name:
                <input type="text" name="iname" onChange={(event)=>this.collectInfo(event,i)} />
            </label>
            <label>Specialization:
                <input type="text" name="specs" onChange={(event)=>this.collectSpec(event,i)} />
            </label>            
        </div>)
    }

    handleSubmit(event){
        event.preventDefault();
        let obj = [];
        for(var i=0; i<=this.state.specs.length;i++){
            const specs = this.state.specs[i];
            const institutions = this.state.institutions[i];
            const values = this.state.values[i];
            obj.push({specs,institutions,values});
        }
        console.log(obj[0]);
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                {this.createUI()}
            <input type='button' value='ADD' onClick={this.addClick}/>
            <input type="submit" value="Submit" />                
            </form>
        );
    }

}

export default Ed;

