import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Start.css'
import axios from 'axios'

const Start = () => {
    
  // role base management
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http:localhost:5300/verify')
    .then(result => {
      if(result.data.Status){
        if(result.data.role === "admin"){
          navigate('/dashboard')
        }else{
          navigate('/employee_details/' + result.data.id)
        }
      }
    
    }).catch(err => console.log(err))
  }, [])
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 login-container'>
      <div className='p-3 rounded w-25 border loginForm'>
        <h2 className='text-center'>Login as</h2>
        <div className='d-flex justify-content-between mt-5 mb-2'>
            <button type = "button" className='btn btn-primary' onClick={ () => {
                navigate('/employeelogin')
            }}>Employee</button>
            <button type = "button" className='btn btn-success' onClick={ () => {
                navigate('/adminlogin')
            }}>Admin</button>
        </div>
      </div>
    </div>
  )
}

export default Start
