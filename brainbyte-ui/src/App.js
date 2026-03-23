import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import QuizGame from "./pages/QuizGame"
import Dashboard from "./pages/Dashboard"
import AddQuiz from "./pages/AddQuiz"
import EditQuiz from "./pages/EditQuiz"
import AdminDashboard from "./pages/AdminDashboard"

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:id"
          element={
            <ProtectedRoute>
              <QuizGame />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

        {/* ADMIN */}
        <Route
          path="/admin/add-quiz"
          element={
            <AdminRoute>
              <AddQuiz />
            </AdminRoute>
          }
        />

<Route
  path="/admin/edit/:id"
  element={
    <AdminRoute>
      <EditQuiz />
    </AdminRoute>
  }
/>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>

  )

}

export default App