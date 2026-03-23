import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { isAuthenticated, getUsername, logout, isAdmin } from "../services/auth"
import Logo from "./Logo"

function Navbar() {

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-brainbyte px-4">

      <Link className="navbar-brand" to="/">
        <Logo />
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">

        {isAuthenticated() ? (
          <>
            <span className="text-light">
              👋 Welcome, <b>{getUsername()}</b>
            </span>

            <Link to="/" className="btn-secondary-custom">
              Quizzes
            </Link>

            <Link to="/dashboard" className="btn-secondary-custom">
              Dashboard
            </Link>

            {/* ✅ ADMIN BUTTON */}
            {isAdmin() && (
  <>
    <Link to="/admin" className="btn btn-dark">
      Admin Panel
    </Link>

    <Link to="/admin/add-quiz" className="btn btn-warning">
      Add Quiz
    </Link>
  </>
)}

            <button
              className="btn-secondary-custom"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-secondary-custom">
              Login
            </Link>

            <Link to="/register" className="btn-primary-custom">
              Register
            </Link>
          </>
        )}

      </div>

    </nav>

  )
}

export default Navbar