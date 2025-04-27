import { useState } from 'react'

import './App.css'
import Login from './Components/LoginPage/Login'
import { BrowserRouter , Routes , Route , Navigate } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'


function App() {
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route 
        path="/login" 
        element={
          <Login />
        }
      />
      <Route 
        path="/Dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
    </Routes>
  </BrowserRouter>
  )
}

export default App
