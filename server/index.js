import express from "express";
import cors from "cors";
import routePath from './routes/jwtAuth.js';
import dashRoute from './routes/dashboard.js';
import HomePageRoute from './routes/HomePage.js';
import expRoute from './routes/experience.js';
import projects from './routes/project.js';
import skills from './routes/skills.js';
import homeScreen from './routes/homescreen.js';
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
//register and login
app.use('/auth', routePath);
//dashboard route
app.use('/dashboard',dashRoute);
//HomePage Route
app.use('/homepage', HomePageRoute);
//experience route
app.use('/expcomponent', expRoute);
//projects route
app.use('/projects',projects);
//homeScreen route
app.use('/homescreen', homeScreen);
//skills route
app.use('/skills', skills);
app.listen(5000,()=>{
    console.log("port 5000 connected");
})
