import { Navigate } from "react-router-dom"
import { isAuthenticated, isAdmin } from "../services/auth"

function AdminRoute({ children }) {

  if (!isAuthenticated()) {
    return <Navigate to="/login" />
  }

  if (!isAdmin()) {
    return <Navigate to="/" />
  }

  return children
}

export default AdminRoute