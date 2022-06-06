import express from 'express';
import { pool } from '../db.js';
const router = express.Router();


router.post('/education', async (req,res)=>{
    try {
        const {user_id, resume_id, course, institution, specialization,serial_id} = req.body;
    
        if(serial_id){
            console.log("server/routes",serial_id);
            const newUser = await pool.query("UPDATE education SET user_id=$1,resume_id=$2, course=$3, institution=$4, specialization=$5  WHERE id=$6 RETURNING *",[user_id,resume_id,course, institution, specialization, serial_id]);
            res.send(newUser.rows[0]);
        }
        else{
            const newUser = await pool.query("INSERT INTO education(user_id,resume_id, course, institution, specialization) VALUES($1,$2,$3,$4,$5) RETURNING *",[user_id, resume_id, course, institution, specialization]);
            res.send(newUser.rows[0]);
        }

    } catch (error) {
        console.error(error.message,"HomePage");
        return res.status(500).send("server error");
    }
})
router.get('/data/:id',async (req,res)=>{
    try {
        const resume_id = req.params.id;
        const result = await pool.query("SELECT * FROM education where resume_id = $1",[resume_id]);
        res.send(result.rows);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("server error");
    }
})
export default router;
