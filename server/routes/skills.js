import { pool } from '../db.js';
import express from "express";
const router = express.Router();

router.post('/skills', async (req,res)=>{
    try {
        const {user_id,resume_id, skills} = req.body;       
        const newUser = await pool.query("INSERT INTO skill(user_id,resume_id, skill) VALUES($1,$2,$3) RETURNING *",[user_id, resume_id, skills]);
        res.send(newUser.rows[0]);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("server error");
    }
})
router.get('/data/:id',async (req,res)=>{
    try {
        const resume_id = req.params.id;
        const result = await pool.query("SELECT * FROM skill where resume_id = $1",[resume_id]);
        res.send(result.rows);

    } catch (error) {
        console.error("routes/getid",error.message);
        return res.status(500).send("server error");
    }
})
router.delete('/delete/:id',async (req,res)=>{
    try {
        const s_id = req.params.id;
        const result = await pool.query("DELETE FROM skill where id = $1",[s_id]);
        res.send(result.rows);

    } catch (error) {
        console.error("routes/delete option",error.message);
        return res.status(500).send("server error");
    }
})
export default router;