import { pool } from '../db.js';
import express from "express";
const router = express.Router();

router.post('/project', async (req,res)=>{
    try {
        const {resume_id, user_id, tytle, skills, desc, serial_id} = req.body;
            console.log("server/routes",serial_id)
            // res.send({'tea':'no'})
        if(serial_id){
            console.log("server/routes",serial_id)
            const newUser = await pool.query("UPDATE project SET resume_id=$1, title=$2, skills=$3, description=$4, user_id=$6  WHERE id=$5 RETURNING *",[resume_id, tytle, skills, desc, serial_id, user_id]);
            res.send(newUser.rows[0]);
        }
        else if(tytle !== null){
            const newUser = await pool.query("INSERT INTO project(resume_id,user_id, title, skills, description) VALUES($1,$2,$3,$4,$5) RETURNING *",[resume_id, user_id, tytle, skills, desc]);
            res.send(newUser.rows[0]);
        }

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("server error");
    }
})
router.get('/data/:id',async (req,res)=>{
    try {
        const resume_id = req.params.id;
        const result = await pool.query("SELECT * FROM project where resume_id = $1",[resume_id]);
        res.send(result.rows);

    } catch (error) {
        console.error("routes/getid",error.message);
        return res.status(500).send("server error");
    }
})
router.delete('/delete/:id',async (req,res)=>{
    try {
        const s_id = req.params.id;
        const result = await pool.query("DELETE FROM project where id = $1",[s_id]);
        res.send(result.rows);

    } catch (error) {
        console.error("routes/delete option",error.message);
        return res.status(500).send("server error");
    }
})
export default router;