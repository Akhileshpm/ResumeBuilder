import React,{Fragment} from 'react';
import '../styles/index.css';
import Next from './next';
import BasicInfo from './basicInfo';
import Navbar from './Navbar';

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            user_id:"",
            mail:"",
            github:'',
            phone:''
        };
        this.getName = this.getName.bind(this);
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
                user_id:result.user_id,
                mail:result.user_email,
                github:result.githubid,
                phone:result.phone
                })
                localStorage.setItem('name',result.user_name);
            })
        } catch (error) {
            console.error(error.message);
        }
    }
    componentDidMount(){
        this.getName();
    }

    render(){
        return(
            <Fragment>
                <Navbar setAuth={this.props.setAuth}/>
                <div>
                    <BasicInfo name={this.state.name} mail={this.state.mail} github={this.state.github} phone={this.state.phone}/>
                    <Next point={'education'}/>
                </div>
            </Fragment>)
    }
}

export default HomePage;