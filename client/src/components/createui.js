import React,{useEffect,useState} from "react";


 function CreateUI(props){

    const [Props, setProps] = useState(props);
    
    useEffect( () => { 
        async function fetchData() {
            try {
                const res = await props; 
                setProps(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [props]);

    if(props.CreateUI === 1){
    const {values,helper,collectCourse,collectInfo,collectSpec} = Props;
    

    const array=[];
    for(let j = 0; j < values.length; j++){
        array.push(
        <div key={j+helper} className='edForms'>
            <label for="Course">Choose the Course:</label>
            <select name="Education" id="Education" onChange={event=>collectCourse(event,j+helper)} >
                <option value="Masters">Masters</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor of Technology">Bachelor of Technology</option>
                <option value="High School">High School</option>
            </select>
            <br/><br/>
            <label>Institution name:
                <input type="text" name="iname" onChange={(event)=>collectInfo(event,j+helper)} />
            </label>
            <label>Specialization:
                <input type="text" name="specs" onChange={(event)=>collectSpec(event,j+helper)} />
            </label>            
        </div>)
    }
    return (array)
}
    const {val,collectCourse,collectInfo,collectSpec,institution,spec,course} = Props;
    const array=[];
    for(let j = 0; j < val.length; j++){
        array.push(
        <div key={j} className='edForms'>
            <label for="Course">Choose the Course:</label>
            <select name="Education" id="Education" onChange={event=>collectCourse(event,j)} >
                <option value={course[j] ? course[j] : val[j]["course"]}>{course[j] ? course[j] : val[j]["course"]}</option>
                <option value="Masters">Masters</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor of Technology">Bachelor of Technology</option>
                <option value="High School">High School</option>
            </select>
            <br/><br/>
            <label>Institution name:
                <input type="text" name="iname" onChange={(event)=>collectInfo(event,j)} value={institution[j] ? institution[j] : val[j]["institution"] } />
            </label>
            <label>Specialization:
                <input type="text" name="specs" onChange={(event)=>collectSpec(event,j)} value={spec[j] ? spec[j] : val[j]["specialization"]}/>
            </label>            
        </div>
        )
    }
return array
}
export default CreateUI;

    // createUI(helper){
    //     return this.state.values.map((el,i) => 
    //     <div key={i+helper} className='edForms'>
    //         <label for="Course">Choose the Course:</label>
    //         {/* i+helper because of the '1' passed to key at default education details form */}
    //         <select name="Education" id="Education" onChange={event=>this.collectCourse(event,i+helper)} >
    //             <option value="Masters">Masters</option>
    //             <option value="Diploma">Diploma</option>
    //             <option value="Bachelor of Technology">Bachelor of Technology</option>
    //             <option value="High School">High School</option>
    //         </select>
    //         <br/><br/>
    //         <label>Institution name:
    //             <input type="text" name="iname" onChange={(event)=>this.collectInfo(event,i+helper)} />
    //         </label>
    //         <label>Specialization:
    //             <input type="text" name="specs" onChange={(event)=>this.collectSpec(event,i+helper)} />
    //         </label>            
    //     </div>
    //     )
    // }
    // const ui = values.map((el,i) => 
    // <div key={i+helper} className='edForms'>
    //     <label for="Course">Choose the Course:</label>
    //     {/* i+helper because of the '1' passed to key at default education details form */}
    //     <select name="Education" id="Education" onChange={event=>collectCourse(event,i+helper)} >
    //         <option value="Masters">Masters</option>
    //         <option value="Diploma">Diploma</option>
    //         <option value="Bachelor of Technology">Bachelor of Technology</option>
    //         <option value="High School">High School</option>
    //     </select>
    //     <br/><br/>
    //     <label>Institution name:
    //         <input type="text" name="iname" onChange={(event)=>collectInfo(event,i+helper)} />
    //     </label>
    //     <label>Specialization:
    //         <input type="text" name="specs" onChange={(event)=>collectSpec(event,i+helper)} />
    //     </label>            
    // </div>)
    // return(
    //     {ui}
    //     )