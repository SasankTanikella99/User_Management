import React, {useState, useEffect} from 'react'
import { Link,useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Edit_Employee = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id:'',

      })
      const [category, setCategory] = useState([]);
      useEffect(() => {
        axios.get("http://localhost:5300/auth/category")
        .then(result => {
          if(result.data.Status){
            setCategory(result.data.Result)
          }else{
            alert(result.data.error)
          }
        }).catch(err => console.log(err))

        axios.get("http://localhost:5300/auth/employee/" + id)
        .then(result => {
            setEmployee({
                ...employee,
                name: result.data.Result[0].name,
                email:result.data.Result[0].email,
                address:result.data.Result[0].address,
                salary:result.data.Result[0].salary,
                category_id:result.data.Result[0].category_id
            })
        })
        .catch(err=>console.log(err));
      }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:5300/auth/edit_employee/" + id, employee)
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/employee')
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

    }
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center "> Edit Employee Details </h3>
      <form className="row g-1" onSubmit = {handleSubmit} >
        <div className="col-12">
          <label for="inputName" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control rounded -0"
            id="inputName"
            placeholder="enter name of the employee"
            value = {employee.name}
            onChange={(e) => setEmployee({...employee, name: e.target.value})}
          />
        </div>
        <div className="col-12">
          <label for="inputEmail4" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control rounded -0"
            id="inputEmail4"
            placeholder="enter email address"
            autoComplete="off"
            value = {employee.email}
            onChange={(e) => setEmployee({...employee, email: e.target.value})}
          />
        </div>
        <div className="col-12">
        
          <label for="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputSalary"
            placeholder="Mention Salary"
            autoComplete="off"
            value = {employee.salary}
            onChange={(e) => setEmployee({...employee, salary: e.target.value})}
          />
        </div>
        <div className="col-12">
          <label for="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control rounded -0"
            id="inputAddress"
            placeholder="300 Cyberonics Blvd, Apt 123"
            autoComplete="off"
            value = {employee.address}
            onChange={(e) => setEmployee({...employee, address: e.target.value})}
          />
        </div>
        <div className="col-12">
          <label for="Category" className="form-label">
            Category
          </label>
          <select name = "category" id = "category" className="form-select" 
            onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
            {category.map((c) => {
              return <option value={c.id}>{c.name}</option>
            })}
          </select>
        </div>
        
        <div className="col-12">
          <button
            type="submit"
            className="btn  w-100"
            style={{ backgroundColor: "#ed781f" }}
          >
            Edit Employee
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Edit_Employee
