import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

const url = "http://localhost:5000/auth"

const Login = ({setAuth}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { email, password}
        if(email == "" || password == ""){
            setErrorMessage("Invalid Credentials")
            toast(errorMessage, {type: "error", theme: "light"})
        }else{
            axios.post(`${url}/loginUser`, data).then((response) => {
                if(response.status == 200){
                    const token = response.data.token
                    if (token) {
                        localStorage.setItem("token", token);
                        setAuth(true)
                        toast.success("Logged in Successfully");
                      } else {
                        toast.error("LOG IN FAILED");
                      }
                }else{
                    setErrorMessage("Login Failed")
                    toast(errorMessage, {type: "error", theme: "light"})
                }
            })
        }
    }
  return (
    <div>
        <h2 className="mt-5 text-center">Login Page</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" value={email} className="form-control my-3" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" value={password} className="form-control my-3" id="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
        </form>
    </div>
  )
}

export default Login