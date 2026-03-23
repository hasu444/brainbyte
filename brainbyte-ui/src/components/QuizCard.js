import React from "react"
import { useNavigate } from "react-router-dom"

function QuizCard({ quiz }) {

  const navigate = useNavigate()

  return (
    <div className="col-md-4 mb-4">
      <div className="glass-card p-4">
        <h4>{quiz.title}</h4>
        <p>{quiz.description}</p>

        <button
          className="btn-neon"
          onClick={() => navigate(`/quiz/${quiz.id}`)}
        >
          Start Quiz
        </button>
      </div>
    </div>
  )
}

export default QuizCard