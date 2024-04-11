import React, {useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import './Employee.css'

const Employee = () => {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5300/auth/employee')
    .then(result => {
      if(result.data.Status){
        setEmployee(result.data.Result);
      }else{
        alert(result.data.Error)
      }
    }).catch(error => {console.log("ERROR", error)})
  }, [])

  const handleDelete =(id) => {
    axios.delete('http://localhost:5300/auth/delete_employee/' + id)
    .then(result => {
      if(result.data.Status){
        window.location.reload('/dashboard/employee') //automatic recoil 😂 
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3> Employee list</h3>
      </div>
      <Link to = "/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Email
              </th>
              <th>
                Address
              </th>
              <th>
                Salary
              </th>
              <th>
                Image
              </th>
              <th>✍🏻</th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(c => (
                <tr>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.address}</td>
                  <td>{c.salary}</td>
                  <td><img src={`http://localhost:5300/Images/` + c.image} className= "emp-image" /></td>
                  <td>
                    <Link to={`/dashboard/edit_employee/` + c.id} className='btn btn-info btn-sm'>Edit</Link>
                    <button className='btn btn-info btn-sm' onClick={() => handleDelete(c.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>  
  )
}

export default Employee
