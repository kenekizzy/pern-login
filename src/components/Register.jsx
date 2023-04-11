import React, {useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

const url = "http://localhost:5000/auth"

const Register = ({setAuth}) => {
    const [ name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [error, setError] = useState("")
    const [postResponse, setPostResponse] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== cpassword){
            setError("Invalid Passwords")
            toast(error, {type: "error", theme: "dark"})
        }else if(name == "" && name.length < 4){
            setError("Invalid Name")
            toast(error, {type: "error", theme: "dark"})
        }else if(email == ""){
            setError("Invalid Email")
            toast(error, {type: "error", theme: "dark"})
        }
        else{
            const data = { 
                name, 
                email,
                password,
                cpassword
            }
            axios.post(`${url}/addUser`, data).then((response) => {
                console.log(response)
                if(response.status == 200){
                    setPostResponse("Saved Successfully")
                    const token = response.data.token
                    if(token){
                        localStorage.setItem("token", token);
                        setAuth(true);
                        toast.success(postResponse);
                    }else{
                        setAuth(false)
                        toast.error("Register Failed")
                    }
                }
            })
        }

    }


  return (
    <div>
        <h2 className="mt-5 text-center">Register Page</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" value={name} className="form-control my-3" id="name" placeholder="Baboon Emefiele" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" value={email} className="form-control my-3" id="email" placeholder="emefiele@inec.com" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" value={password} className="form-control my-3" id="password" placeholder="*******"  onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" value={cpassword} className="form-control my-3" id="cpassword" placeholder="*******" onChange={(e) => setCpassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-success">Register</button>
        </form>
    </div>
  )
}

export default Register