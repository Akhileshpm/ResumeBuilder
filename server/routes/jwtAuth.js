import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { blacklist, blackListed } from '../Middleware/authorization.js';
import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { jwtGenerator } from "../utils/jwtGenerator.js";
import validInfo from "../Middleware/validInfo.js";
import authorizationInfo from "../Middleware/authorization.js"
const router = express.Router();

// REGISTER ROUTE
router.post('/register', validInfo, async (req,res) => {
    try{
        // 1.destructuring the req.body 
        const {user, email, password, github, phone} = req.body;

        // 2.check if new user
        const text ="SELECT * FROM users WHERE user_email = $1";
        const values = [email];
        const result = await  pool.query(text,values);

        if(result.rows.length !== 0){
            return res.status(401).json("user already exists");
        }

        // 3.Bcrypt user's password
        const saltRound =  10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password,salt);

        // 4.enter the new user inside our database
        const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password, githubid, phone) VALUES($1,$2,$3,$4,$5) RETURNING *",[user,email,bcryptPassword,github,phone]);

        // 5.generating our new token
        const token = jwtGenerator(newUser.rows[0].user_id);
        return res.json({token});
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send("server error");   
    }
})
// LOGIN ROUTE
router.post('/login', validInfo,async (req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
        if(user.rows[0].length === 0){
            return res.status(401).json("user not found");
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if(!validPassword){
            return res.status(401).json("password is incorrect");
        }
        const token = jwtGenerator(user.rows[0].user_id);
        const refreshToken = jwt.sign(user.rows[0].user_id,process.env.refreshSecret);

        return res.json({ token, refreshToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})
// AUTHORIZATION
router.get('/is-verify', authorizationInfo,(req,res)=>{
    try {
        console.log("hi");
        res.json(true);
    } catch (err) {
        console.error(rr.message);
        res.status(500).send("Server Error");
}});
router.post('/logout', (req,res)=>{
    try{
        const { token } = req.body;
        blacklist(token);
        return res.json(blackListed);
    }
    catch(er){
        console.error(er);
        res.status(500).send("Couldn't blacklist");
    }
})
export default router;