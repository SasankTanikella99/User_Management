import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add_Category = () => {
    const [category, setCategory] = useState()
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        
        axios.post('http://localhost:5300/auth/add_category', {category})
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/category')
            }else{
                alert(result.data.error)
            }
        })
        .catch(error=>console.log(error));
    }

  return (
    <div className=' d-flex justify-content-center align-items-center h-75'>
    <div className=' p-3 rounded w-25 border'>
        <h2> Add Category </h2>
      <form onSubmit={handleSubmit}>
        
        <div className='email mb-3'>
          <label htmlFor='category'>Category: </label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder='enter category '
            required
            className='form-control rounded-0 mt-2'
            onChange={(e) => setCategory(e.target.value)}/>
        </div>
        
        <div className='button mb-1'>
          <button className='btn btn-success w-100 rounded-0' type="submit">Add Category</button>
        </div>
        
      </form>
   
    </div>
  </div>
  )
}

export default Add_Category
