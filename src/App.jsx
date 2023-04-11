import { useState, useEffect } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import './App.css'
import Dashboard from './components/Dashboard';

const url = "http://localhost:5000/auth"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    checkAuthenticated()
  }, [])

  const checkAuthenticated = () => {
    axios.get(`${url}/is-verified`, {
      headers: {token: localStorage.getItem("token")}
    }).then((response) => {
      setIsAuthenticated(response.data)
    })
  }

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={isAuthenticated ? <Dashboard setAuth={setAuth} />: <Navigate to="/login" replace />}/>
          <Route path='/login' element={!isAuthenticated? <Login setAuth={setAuth} />: <Navigate to="/" replace/>}/>
          <Route path='/register' element={!isAuthenticated ? <Register setAuth={setAuth} />: <Navigate to="/" replace/>}/>
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  )
}

export default App
