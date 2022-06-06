import './styles/App.css';
import React,{Fragment, useEffect, useState} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import NavbarTitle from './components/NavbarTitle.js';
import Register from './components/register.js';
import Login from './components/login.js';
import HomePage from './components/HomePage';
import Education from './components/education';
import Experience from './components/ExpComponents';
import Project from './components/project';
import Navbar from './components/Navbar';
import Skill from './components/skills';
import Review from './components/Review';
import ResumeReview from './components/resumeReview';
import HomeScreen from './components/homeScreen';
import ChooseTemplate from './components/chooseTemplate';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({});
  const [exp, SetExp] = useState({});

  const setEx = ex =>{
    SetExp(ex);
  }
  const setEd = val => {
    setData(val);
  }
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  
  async function isAuth(){
    try {
        const response = await fetch("http://localhost:5000/auth/is-verify",{
          method:"GET",
          headers:{token:localStorage.token}
        })
        const parseRes = await response.json();
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    }
    catch(error) {
      console.error(error.message);
    }
  }
  
  function getName(){
  try {
      fetch("http://localhost:5000/dashboard/",{
          method:"GET",
          headers:{token:localStorage.token}
      }).then(res=>{
          return res.json()
      }).then((result)=>{
          const userId = result.user_id;
          localStorage.setItem('userId',userId);
          return fetch(`http://localhost:5000/homepage/data/${userId}`)
      }).then((response)=>{
          return response.json()
      }).then((last)=>{
          setEd(last);
          // const id = last[0].user_id;
          const id = localStorage.getItem('resumeId');
          return fetch(`http://localhost:5000/expcomponent/data/${id}`)
      }).then(res=>{
          return res.json();
      }).then(id=>{
          setEx(id);
      })
  } catch (error) {
      console.error(error.message);
  }
}
  //to authorize every time the app refreshes   
  useEffect(()=>{
    isAuth();
  },[])
  useEffect(()=>{
    getName();
  },[])

  return (
    <Fragment>
      <BrowserRouter>
        <div className="App-container">
          <Routes>
                <Route exact path="/" element={
                  !isAuthenticated ? 
                  (<Login authed={true} setAuth={setAuth} />) : (<Navigate replace to = "/homescreen"/>)
                } />
                <Route exact path="/homescreen" element={
                  isAuthenticated ? 
                  (<HomeScreen authed={true} setAuth={setAuth}/>) : (<Navigate replace to = "/"/>)
                } />
                <Route exact path="/dashboard"  element={
                  isAuthenticated ?
                  (<HomePage authed={true} setAuth={setAuth} data={data} ex={exp} />) : (<Navigate replace to="/" />)
                } />
                <Route exact path="/education"  element={
                  isAuthenticated ?
                  (<Education authed={true} setAuth={setAuth} data={data} />) : (<Navigate replace to="/" />)
                } />
                <Route exact path="/experience"  element={
                  isAuthenticated ?
                  (<Experience authed={true} setAuth={setAuth} data={data} ex={exp} />) : (<Navigate replace to="/" />)
                } />
                <Route exact path="/projects"  element={
                  isAuthenticated ?
                  (<Project authed={true} setAuth={setAuth} />) : (<Navigate replace to="/" />)
                } />
                <Route exact path="/register"  element= {
              !isAuthenticated ? 
              (<Register authed={true} setAuth={setAuth} />) : (<Navigate replace to = '/'/>)
                } />
              <Route exact path="/skills"  element={
                isAuthenticated ?
                (<Skill authed={true} setAuth={setAuth} />) : (<Navigate replace to="/" />)
              } />
              <Route exact path="/choose-template"  element={
                isAuthenticated ?
              (<ChooseTemplate authed={true} setAuth={setAuth} />) : (<Navigate replace to="/" />)
              } />
              <Route exact path="/review"  element={
                isAuthenticated ?
              (<ResumeReview authed={true} setAuth={setAuth} />) : (<Navigate replace to="/" />)
              } />
          </Routes>
      </div>
      </BrowserRouter>
      <ToastContainer />
    </Fragment>
  );
}

export default App;