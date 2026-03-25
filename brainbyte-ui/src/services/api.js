import axios from "axios"
import { getToken } from "./auth"

/* ============================= */
/* BASE CONFIG */
/* ============================= */

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 10000,
})

/* ============================= */
/* REQUEST INTERCEPTOR */
/* ============================= */

API.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Token ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

/* ============================= */
/* RESPONSE INTERCEPTOR */
/* ============================= */

API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response) {

      // 🔥 Unauthorized → force logout
      if (error.response.status === 401) {
        console.warn("⚠ Unauthorized! Redirecting to login...")

        localStorage.removeItem("token")
        localStorage.removeItem("username")

        window.location.href = "/login"
      }

      // 🔥 Server error
      if (error.response.status >= 500) {
        console.error("🔥 Server error:", error.response.data)
      }
    }

    return Promise.reject(error)
  }
)

/* ============================= */
/* AUTH APIs */
/* ============================= */

export const registerUser = async (data) => {
  try {
    const res = await API.post("auth/register/", data)
    return res.data
  } catch (err) {
    throw err.response?.data || { error: "Registration failed" }
  }
}

export const loginUser = async (data) => {
  try {
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

export const isAuthenticated = () => {
  return !!localStorage.getItem("token")
}

/* ============================= */
/* QUIZ APIs */
/* ============================= */

// ✅ GET ALL QUIZZES
export const getQuizzes = async () => {
  try {
    const res = await API.get("quizzes/")
    return res.data
  } catch (err) {
    console.error("❌ Quiz fetch error:", err)
    return []
  }
}

// ✅ GET SINGLE QUIZ
export const getQuizById = async (id) => {
  try {
    if (!id) throw new Error("Quiz ID missing")

    const res = await API.get(`quizzes/${id}/`)
    return res.data

  } catch (err) {
    console.error("❌ Quiz detail error:", err)
    return null
  }
}

// ✅ CREATE QUIZ
export const createQuiz = async (data) => {
  try {
    const res = await API.post("quizzes/", data)
    return res.data
  } catch (err) {
    throw err.response?.data || { error: "Create quiz failed" }
  }
}

// ✅ UPDATE QUIZ
export const updateQuiz = async (id, data) => {
  try {
    if (!id) throw new Error("Quiz ID missing")

    const res = await API.put(`quizzes/${id}/`, data)
    return res.data

  } catch (err) {
    throw err.response?.data || { error: "Update quiz failed" }
  }
}

// ✅ DELETE QUIZ
export const deleteQuiz = async (id) => {
  try {
    if (!id) throw new Error("Quiz ID missing")

    const res = await API.delete(`quizzes/${id}/`)
    return res.data

  } catch (err) {
    throw err.response?.data || { error: "Delete quiz failed" }
  }
}

/* ============================= */
/* QUIZ SUBMISSION */
/* ============================= */

export const submitQuiz = async (quizId, answers) => {
  try {
    if (!quizId) throw new Error("Quiz ID missing")

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
/* RESULTS + DASHBOARD */
/* ============================= */

export const getResults = async () => {
  try {
    const res = await API.get("results/")
    return res.data
  } catch (err) {
    console.error("❌ Results error:", err)
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
    console.error("❌ Leaderboard error:", err)
    return []
  }
}

/* ============================= */
/* AI QUIZ */
/* ============================= */

export const generateAIQuiz = async (topic) => {
  try {
    if (!topic) throw new Error("Topic required")

    const res = await API.post("ai/generate/", { topic })
    return res.data

  } catch (err) {
    throw err.response?.data || { error: "AI generation failed" }
  }
}