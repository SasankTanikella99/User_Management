import express from 'express'
import connection from '../db.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router();

router.post('/employeelogin', (req, res) => {
    const sql = "select * from employee where email = ?";              
    connection.query(sql, [req.body.email], (err, result) => {
        if (err) {
            return res.json({ loginStatus: false, error: "error" });
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, bcryptResult) => {
                if (err || !bcryptResult) {
                    return res.json({ loginStatus: false, error: "Invalid email or password" });
                }
                const email = result[0].email;
                const token = jwt.sign({ role: "employee", email: email, id: result[0].id }, "JWT_SECRET_KEY", { expiresIn: '1d' });
                res.cookie('token', token);
                return res.json({ loginStatus: true, id: result[0].id });
            });
        } else {
            return res.json({ loginStatus: false, error: "Invalid email or password" });
        }
    });
});



router.get('/employee_detail/:id', (req, res) => {
    const id = req.params.id
    const sql = 'select * from employee where id = ?'
    connection.query(sql,[id], (err, result) => {
    if(err){
        return res.json({Status: false, error: err.message})
    }    
    return res.json(result)
    })
})


router.get('/logout', (req,res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export {router as employeeRouter}
