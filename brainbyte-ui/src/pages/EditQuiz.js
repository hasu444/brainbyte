import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

function EditQuiz() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState(null)
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchQuiz()
  }, [])

  const fetchQuiz = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/quizzes/${id}/`,
      {
        headers: { Authorization: `Token ${token}` }
      }
    )
    setQuiz(res.data)
  }

  const handleChange = (index, field, value) => {
    const updated = [...quiz.questions]
    updated[index][field] = value
    setQuiz({ ...quiz, questions: updated })
  }

  const handleSave = async () => {
    await axios.put(
      `http://127.0.0.1:8000/api/quizzes/${id}/`,
      quiz,
      {
        headers: { Authorization: `Token ${token}` }
      }
    )
    alert("✅ Updated!")
    navigate("/admin")
  }

  if (!quiz) return <p className="text-center mt-5">Loading...</p>

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">✏ Edit Quiz</h2>

      <input
        className="form-control mb-3"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />

      {quiz.questions.map((q, i) => (
        <div key={i} className="glass-card p-3 mb-3">

          <input
            className="form-control mb-2"
            value={q.question}
            onChange={(e) => handleChange(i, "question", e.target.value)}
          />

          {q.options.map((opt, j) => (
            <input
              key={j}
              className="form-control mb-1"
              value={opt}
              onChange={(e) => {
                const updated = [...quiz.questions]
                updated[i].options[j] = e.target.value
                setQuiz({ ...quiz, questions: updated })
              }}
            />
          ))}

          <input
            className="form-control mt-2"
            placeholder="Correct Answer"
            value={q.answer}
            onChange={(e) => handleChange(i, "answer", e.target.value)}
          />

        </div>
      ))}

      <button className="btn btn-success w-100" onClick={handleSave}>
        Save Changes
      </button>

    </div>
  )
}

export default EditQuiz