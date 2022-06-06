import jwt from 'jsonwebtoken';
import 'dotenv/config';

const blackListed = [];
export function blacklist(a){
    blackListed.push(a);
}
export default async (req,res,next) =>{
    try {
        const jwtToken = req.header("token");
        if(!jwtToken){
            return res.status(403).json("Unauthorized access");
        }
        console.log(blackListed);
        if(blackListed.includes(jwtToken)){
            return res.status(403).json("Unauthorized access");
        }
        
        //if token present in Redis then unauthorized access;
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json(" Unauthorized access");
    }
}
export {blackListed};