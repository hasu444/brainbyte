import React,{useState} from "react"
import axios from "axios"

function Register(){

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")

const register = async ()=>{

await axios.post(
"http://127.0.0.1:8000/api/auth/register/",
{username,password}
)

alert("User Created")

}

return(

<div className="container mt-5">

<h3>Register</h3>

<input
className="form-control mb-2"
placeholder="username"
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
className="form-control mb-2"
placeholder="password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="btn btn-success"
onClick={register}
>
Register
</button>

</div>

)

}

export default Register