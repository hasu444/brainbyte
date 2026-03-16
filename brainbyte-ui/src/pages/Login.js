import React,{useState} from "react"
import axios from "axios"

function Login(){

const [username,setUsername]=useState("")
const [password,setPassword]=useState("")

const login=async()=>{

await axios.post(
"http://127.0.0.1:8000/api/auth/login/",
{username,password}
)

alert("Login successful")

}

return(

<div className="container mt-5">

<div className="glass-card p-4 col-md-5 mx-auto">

<h3 className="text-center glow-text mb-4">
Login
</h3>

<input
className="form-control mb-3"
placeholder="Username"
onChange={e=>setUsername(e.target.value)}
/>

<input
type="password"
className="form-control mb-3"
placeholder="Password"
onChange={e=>setPassword(e.target.value)}
/>

<button
className="btn-neon w-100"
onClick={login}
>
Login
</button>

</div>

</div>

)

}

export default Login