import express from 'express';
import { pool } from '../db.js';
const router = express.Router();


router.post('/experience', async (req,res)=>{
    try {
        const {user_id,resume_id, role, company, Responsibility, duration, serial_id} = req.body;
        if (serial_id) {
            console.log("server/routes",serial_id);
            const newUser = await pool.query("UPDATE experience SET user_id=$1, resume_id=$7,role=$2, company=$3, responsibility=$4, duration=$5 WHERE id=$6 RETURNING *",[user_id, role, company, Responsibility, duration, serial_id, resume_id]);
            res.send(newUser.rows[0]);
        } else {
            const newUser = await pool.query("INSERT INTO experience(user_id, resume_id, role, company, Responsibility, duration) VALUES($1,$6,$2,$3,$4,$5) RETURNING *",[user_id, role, company, Responsibility, duration, resume_id]);
            res.send(newUser.rows[0]);
        }

    } catch (error) {
        console.error("Experience",error.message);
        return res.status(500).send("server error");
    }
})
router.get('/data/:id',async (req,res)=>{
    try {
        const resume_id = req.params.id;
        const result = await pool.query("SELECT * FROM experience where resume_id = $1",[resume_id]);
        res.send(result.rows);

    } catch (error) {
        console.error("routes/getId",error.message);
        return res.status(500).send("server error");
    }
})
export default router;
