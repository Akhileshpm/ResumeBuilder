import express from 'express';
import { pool } from '../db.js';
import authorization from '../Middleware/authorization.js';
const router =  express.Router();

router.get('/',authorization,async (req, res)=>{
    try {
        const result = await pool.query("SELECT * FROM users WHERE user_id=$1",[req.user]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("SERVER ERROR")
    }
})
router.post('/data',async (req,res)=>{
    try {
        const newUser = await pool.query("UPDATE users SET github_id=$1, phone=$2 WHERE id=$3 RETURNING *",[github_id,phone,user_id]);
        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR")
    }
})
export default router;