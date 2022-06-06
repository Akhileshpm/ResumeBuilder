import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const jwtGenerator = (userId)=>{
    const payload={
        user:userId
    }
    return jwt.sign(payload, process.env.jwtSecret , {expiresIn: '20m'});
}