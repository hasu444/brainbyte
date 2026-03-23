import React, { useState } from "react"
import { loginUser } from "../services/auth"
import { useNavigate, useLocation } from "react-router-dom"

function Login() {

  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({
    username: "",
    password: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {

    setError("")

    if (!form.username || !form.password) {
      setError("All fields are required")
      return
    }

    try {
      setLoading(true)

      await loginUser(form)

      // ✅ Redirect to home
      navigate("/")

    } catch (err) {

      if (err?.error) {
        setError(err.error)
      } else {
        setError("Invalid username or password")
      }

    } finally {
      setLoading(false)
    }
  }

  // ✅ Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (

    <div className="center-container">

      <div className="glass-card auth-box soft-shadow">

        <h2 className="title text-center mb-3">
          Welcome Back 👋
        </h2>

        <p className="subtitle text-center mb-4">
          Login to continue your quiz journey
        </p>

        {/* ✅ SUCCESS MESSAGE FROM REGISTER */}
        {location.state?.msg && (
          <p className="text-success text-center">
            {location.state.msg}
          </p>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-danger text-center">
            {error}
          </p>
        )}

        <input
          name="username"
          className="input-field"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          onKeyDown={handleKeyPress}
        />

        <input
          name="password"
          type="password"
          className="input-field"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          onKeyDown={handleKeyPress}
        />

        <button
          className="btn-primary-custom w-100 mt-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>

  )

}

export default Login