import axios from "axios"
import { getToken } from "./auth"

/* ============================= */
/* BASE CONFIG */
/* ============================= */

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
})

/* ============================= */
/* REQUEST INTERCEPTOR */
/* ============================= */

// ✅ ADD THIS INTERCEPTOR
API.interceptors.request.use((config) => {
    const token = getToken()
  
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
  
    return config
  })

/* ============================= */
/* RESPONSE INTERCEPTOR */
/* ============================= */

API.interceptors.response.use(
  (res) => res,
  (err) => {

    if (err.response && err.response.status === 401) {
      console.warn("Unauthorized! Logging out...")

      localStorage.removeItem("token")
      localStorage.removeItem("username")

      window.location.href = "/login"
    }

    return Promise.reject(err)
  }
)

/* ============================= */
/* AUTH APIs */
/* ============================= */

export const registerUser = async (data) => {
  try {
    // ✅ FIXED
    const res = await API.post("auth/register/", data)
    return res.data
  } catch (err) {
    throw err.response?.data || { error: "Registration failed" }
  }
}

export const loginUser = async (data) => {
  try {
    // ✅ FIXED
    const res = await API.post("auth/login/", data)

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("username", res.data.username)

    return res.data
  } catch (err) {
    throw err.response?.data || { error: "Login failed" }
  }
}

export const logoutUser = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  window.location.href = "/login"
}

/* ============================= */
/* QUIZ APIs */
/* ============================= */

export const getQuizzes = async () => {
  try {
    const res = await API.get("quizzes/")
    return res.data
  } catch (err) {
    console.error("Quiz fetch error:", err)
    return []
  }
}

export const getQuizById = async (id) => {
  try {
    const res = await API.get(`quizzes/${id}/`)
    return res.data
  } catch (err) {
    console.error("Quiz fetch error:", err)
    return null
  }
}

/* ============================= */
/* QUIZ SUBMISSION */
/* ============================= */

export const submitQuiz = async (quizId, answers) => {
  try {
    const res = await API.post("submit-quiz/", {
      quiz_id: quizId,
      answers: answers
    })
    return res.data
  } catch (err) {
    throw err.response?.data || { error: "Submission failed" }
  }
}

/* ============================= */
/* DASHBOARD */
/* ============================= */

export const getResults = async () => {
  try {
    const res = await API.get("results/")
    return res.data
  } catch (err) {
    console.error("Results error:", err)
    return []
  }
}

/* ============================= */
/* LEADERBOARD */
/* ============================= */

export const getLeaderboard = async () => {
  try {
    const res = await API.get("leaderboard/")
    return res.data
  } catch (err) {
    console.error("Leaderboard error:", err)
    return []
  }
}

/* ============================= */
/* HELPER */
/* ============================= */

export const isAuthenticated = () => {
  return !!localStorage.getItem("token")
}