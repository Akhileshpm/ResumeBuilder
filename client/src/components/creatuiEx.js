import React,{useEffect,useState} from "react";


 function CreateUIEx(props){

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
    const {values,helper,collectRole,collectCompany,collectRes,collectDuration} = Props;
    

    const array=[];
    for(let j = 0; j < values.length; j++){
        array.push(
        <div key={j+helper} className='exForms'>
            <label>Role:
                <input type="text" name="role" onChange={(event)=>collectRole(event,j+helper)} />
            </label>
            <label>Company:
                <input type="text" name="company" onChange={(event)=>collectCompany(event,j+helper)} />
            </label>
            <label>Responsibility:
                <input type="text" name="responsibility" onChange={(event)=>collectRes(event,j+helper)} />
            </label>
            <label>Duration:
                <input type="text" name="duration" onChange={(event)=>collectDuration(event,j+helper)} />
            </label>                     
        </div>)
    }
    return (array)
}
    const {val,collectRole,collectCompany,collectRes,collectDuration,company,role,responsibility,duration} = Props;
    const array=[];
    for(let j = 0; j < val.length; j++){
        array.push(
        <div key={j} className='exForms'>
                <label>Role:
                    <input type="text" name="role" onChange={(event)=>collectRole(event,j)} value={role[j] ? role[j] : val[j]["role"] }/>
                </label>
                <label>Company:
                    <input type="text" name="company" onChange={(event)=>collectCompany(event,j)} value={company[j] ? company[j] : val[j]["company"]} />
                </label>
                <label>Responsibility:
                    <input type="text" name="responsibility" onChange={(event)=>collectRes(event,j)} value={responsibility[j] ? responsibility[j] : val[j]["responsibility"]}/>
                </label>
                <label>Duration:
                            <input type="text" name="duration" onChange={(event)=>collectDuration(event,j)} value={ duration[j] ? duration[j] : val[j]["duration"]} />
                </label>            
        </div>
        )
    }
    return array
}
export default CreateUIEx;