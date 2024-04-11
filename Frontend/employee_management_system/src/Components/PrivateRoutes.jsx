import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
  return localStorage.getItem("valid") ? children : <Navigate to = "/" />
}

export default PrivateRoutes
