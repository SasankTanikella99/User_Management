import express from 'express';
import connection from '../db.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer';
import path from 'path';

const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const sql = "select * from admin where email = ? and password = ?"              // ? mean These placeholders are typically used to safely insert user-supplied values into the SQL query. This helps prevent SQL injection attacks by separating the SQL logic from the user input.The library would provide a mechanism to replace the ? placeholders with actual values before executing the query against the database.
    connection.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err){
            res.json({loginStatus: false, error: "error"})
        }
        if(result.length > 0){
            const email = result[0].email;
            const token = jwt.sign({role: "admin", email:email, id:result[0].id}, "JWT_SECRET_KEY", {expiresIn: '1d'})
            res.cookie('token', token)
            return res.json({loginStatus: true})
        }else{
            return res.json({loginStatus: false, error: "invalid email and password"})
        }
    })
})

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category"
    connection.query(sql, [req.body.category], (err, result) => {
        if(err){
            res.json({Status: false, error: "query error"})
        }
        return res.json({Status: true, Result: result})
    })
})

router.post("/add_category", (req,res) => {
    const sql = "insert into category (`name`) values(?)"
    connection.query(sql, [req.body.category], (err, result) => {
        if(err){
            res.json({Status: false, error: "query error"})
        }
        return res.json({Status: true})
    })
})

// image upload
const storage = multer.diskStorage({
    destination: (req,res, callback) => {
        callback(null, 'public/images')
    },
    filename: (req, file, callback) => {
        callback(null, file.filedname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
})



router.post("/add_employee", upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee (name, email, password, address, salary, image, category_id) VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({ Status: false, error: "Error hashing password" });
        }
        const values = [
            req.body.name,
            req.body.email,
            hash, // Using the hashed password
            req.body.address,
            req.body.salary,
            req.file.filename,
            req.body.category_id
        ];

        connection.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err)
                return res.json({ Status: false, error: "Query error" });
            }
            return res.json({ Status: true });
        });
    });
});


router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee"
    connection.query(sql, (err, result) => {
        if(err){
            res.json({Status: false, error: "query error"})
        }
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id',(req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM employee WHERE id = ?"
    connection.query(sql, [id], (err, result) => {
        if(err){
            res.json({Status: false, error: "query error"})
        }
        return res.json({Status: true, Result: result})
    })
}) 

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id
    const sql = `UPDATE employee SET name = ?, email = ?, salary = ?, address = ?, category_id = ? WHERE id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ];
    connection.query(sql, [...values, id ], (err, result) => {
        if(err){
            return res.json({Status: false, error: "query error" + err})
        }
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req,res) => {
    const id = req.params.id;
    const sql = `Delete from employee where id = ? `
    connection.query(sql, [id], (err, result) => {
        if(err){
            return res.json({Status:false,error: "query error" + err})
        }
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req,res) => {
    const sql = 'select count(id) as admin from admin'
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Status:false,error: "query error" + err})
        }
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req,res) => {
    const sql = 'select count(id) as employee from employee'
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Status:false,error: "query error" + err})
        }
        return res.json({Status: true, Result: result})
    })
})


router.get('/salary_count', (req,res) => {
    const sql = 'select sum(salary) as salary_emp from employee'
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Status:false,error: "query error" + err})
        }
        return res.json({Status: true, Result: result})
    })
})


router.get('/admin_records',(req,res) => {
    const sql = 'select * from admin'
    connection.query(sql, (err, result) => {
        if(err){
            return res.json({Status:false,error: "query error" + err})
        }
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout',(req,res) => {
    res.clearCookie('token')
    return res.json({Status: true})
} )

export {router as adminRouter}