import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    password: ""
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {

    if (!form.username || !form.password) {
      setError("All fields are required")
      return false
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }

    return true
  }

  const handleSubmit = async () => {

    setError("")
    setSuccess("")

    if (!validate()) return

    try {
      setLoading(true)

      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        form
      )

      setSuccess(res.data.message || "Registration successful!")

      // ✅ REDIRECT AFTER 1.5 SEC
      setTimeout(() => {
        navigate("/login", {
          state: { msg: "Registration successful! Please login." }
        })
      }, 1500)

    } catch (err) {

      if (err.response?.data?.username) {
        setError(err.response.data.username[0])
      } else if (err.response?.data?.password) {
        setError(err.response.data.password[0])
      } else {
        setError("Registration failed")
      }

    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="container mt-5">

      <div className="glass-card p-4 col-md-5 mx-auto">

        <h3 className="glow-text text-center mb-4">
          Register
        </h3>

        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}

        <input
          name="username"
          className="form-control mb-3"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
        />

        <input
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
        />

        <button
          className="btn-neon w-100"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </div>

    </div>

  )

}

export default Register