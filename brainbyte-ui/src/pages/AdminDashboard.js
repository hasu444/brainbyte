import React, { useEffect, useState } from "react"
import axios from "axios"

function AdminDashboard() {

  const [quizzes, setQuizzes] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/quizzes/",
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    setQuizzes(res.data)
  }

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this quiz?")) return

    await axios.delete(
      `http://127.0.0.1:8000/api/quizzes/${id}/`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )

    fetchQuizzes()
  }

  return (

    <div className="container mt-5">

      <h2 className="text-center mb-4 glow-text">
        🛠 Admin Panel
      </h2>

      {quizzes.map(q => (
        <div key={q.id} className="glass-card p-3 mb-3 d-flex justify-content-between align-items-center">

          <h5>{q.title}</h5>

          <div>
          <button
  className="btn btn-info me-2"
  onClick={() => window.location.href = `/admin/edit/${q.id}`}
>
  Edit
</button>

            <button className="btn btn-danger me-2"
              onClick={() => handleDelete(q.id)}
            >
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>

  )

}

export default AdminDashboard