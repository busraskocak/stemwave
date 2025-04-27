import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa"
import logo from '../../assets/stemwaveLogo.png'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // isLoading state eklendi
  const navigate = useNavigate();
  
  useEffect(() => {
    document.body.classList.add('login-body');
  
    // Cleanup function
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);
  
  // Input değişikliklerini handle eden fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if(error) {
      setError(''); // Input değiştiğinde hata mesajını temizle
    }
  };
    
  // Form submit işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log("Gönderilen Form", formData);
    
    try {
      if (formData.username === 'admin' && formData.password === 'admin') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else if (formData.username === 'user' && formData.password === 'user123') {
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // İşlem bittiğinde loading durumunu false yap
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="input-box">
          <input 
            type="text"
            name='username'
            placeholder='Username' 
            required
            value={formData.username}
            onChange={handleChange}
          />
          <FaUser className='icon'/>
        </div>
        
        <div className="input-box">
          <input 
            type="password" 
            placeholder='Password' 
            required
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          <FaLock className='icon' />
        </div>
        
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login