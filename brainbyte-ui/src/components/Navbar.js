import React from "react"
import {Link} from "react-router-dom"

function Navbar(){

return(

<nav className="navbar navbar-brainbyte px-4">

<h3 className="glow-text">🧠 BrainByte</h3>

<div>

<Link to="/" className="btn btn-neon me-2">
Home
</Link>

<Link to="/login" className="btn btn-outline-light me-2">
Login
</Link>

<Link to="/register" className="btn btn-neon">
Register
</Link>

</div>

</nav>

)

}

export default Navbar