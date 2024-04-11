import mysql from 'mysql';


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootadmin",
    database: "employee_management_system"
})

connection.connect((err) => {
    if(err){
        console.log("connection failed", err);
    }else{
        console.log("connection succeeded");
    }
})

export default connection;