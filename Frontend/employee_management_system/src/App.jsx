import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage';
import EmployeeLogin from './Components/Login/EmployeeLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard/Dashboard';
import './App.css';
import Home from './Components/Home/Home';
import Employee from './Components/Employee/Employee';
import Category from './Components/Category/Category';
import Profile from './Components/Profile/Profile';
import Add_Category from './Components/Category/Add_Category';
import Add_Employee from './Components/Employee/Add_Employee';
import Edit_Employee from './Components/Employee/Edit_Employee';
import Start from './Components/Start/Start';
import EmployeeDetail from './Components/Employee/EmployeeDetail';
import PrivateRoutes from './Components/PrivateRoutes';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element= {<Start />} />
        <Route path="/adminlogin" element={<LoginPage />} />
        <Route path="/employeelogin" element={<EmployeeLogin />} />
        <Route path="employee_detail/:id" element={<EmployeeDetail />} />
        <Route path="/dashboard" element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes> 
        
        }>
          <Route index element={<Home />} />
          <Route path="employee" element={<Employee />} />
          <Route path="category" element={<Category />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add_category" element={<Add_Category />} />
          <Route path="add_employee" element={<Add_Employee />} />
          <Route path="edit_employee/:id" element={<Edit_Employee />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
