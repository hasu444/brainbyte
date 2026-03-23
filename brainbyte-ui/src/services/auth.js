/* ============================= */
/* AUTH SERVICE */
/* ============================= */

import { registerUser as registerAPI } from "./api"
import { loginUser as loginAPI } from "./api"

/* ============================= */
/* SAVE AUTH DATA */
/* ============================= */

export const setAuthData = (data) => {
  localStorage.setItem("token", data.token)
  localStorage.setItem("username", data.username)

  // ✅ Ensure boolean stored properly as string
  localStorage.setItem("is_admin", data.is_admin ? "true" : "false")
}

/* ============================= */
/* GET AUTH DATA */
/* ============================= */

export const getToken = () => {
  return localStorage.getItem("token")
}

export const getUsername = () => {
  return localStorage.getItem("username") || "User"
}

export const isAdmin = () => {
  return localStorage.getItem("is_admin") === "true"
}

/* ============================= */
/* CHECK AUTH */
/* ============================= */

export const isAuthenticated = () => {
  return !!getToken()
}

/* ============================= */
/* LOGOUT */
/* ============================= */

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("is_admin")

  window.location.href = "/login"
}

/* ============================= */
/* LOGIN API */
/* ============================= */

export const loginUser = async (credentials) => {
  try {
    const data = await loginAPI(credentials)

    // ✅ Save everything safely
    setAuthData(data)

    return data
  } catch (error) {
    throw error
  }
}

/* ============================= */
/* REGISTER API */
/* ============================= */

export const registerUser = async (formData) => {
  try {
    const data = await registerAPI(formData)
    return data
  } catch (error) {
    throw error
  }
}

