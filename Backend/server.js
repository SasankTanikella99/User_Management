import express from 'express';
import cors from 'cors'
import  {adminRouter}  from './routes/adminRoute.js';
import { employeeRouter } from './routes/employeeRoute.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json())

app.use('/auth', adminRouter)
app.use('/employee', employeeRouter)
app.use(cookieParser())

app.use(express.static('public'))

const verifyUser = (req,res, next) => {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, "JWT_SECRET_KEY", (err, decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong token"})
            req.id =decoded.id;
            req.role = decoded.role;
            next()
        })
    }else{
        return res.json({Status: false, Error: "authentication failed"})
    }
}
app.get('/verify', verifyUser, (req,res) => {
    return res.json({Status: true, role: req.role, id:req.id})
})

app.listen(5300, () => {
    console.log("Server running")
})