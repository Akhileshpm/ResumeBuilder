import express from 'express';
import { pool } from '../db.js';
const router =  express.Router();

router.get('/saved/:id', async (req, res)=>{
    try { 
        const user_id = req.params.id;
        const result = await pool.query("SELECT * FROM resume WHERE user_id=$1",[user_id]);
        res.json(result.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("SERVER ERROR")
    }
})
router.post('/add',async (req,res)=>{
    try {
        const {user_id} = req.body;
        const newUser = await pool.query("INSERT INTO resume(user_id) VALUES($1) RETURNING *",[user_id]);

        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR")
    }
})
export default router;