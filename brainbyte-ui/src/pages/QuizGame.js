import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getQuizById, submitQuiz } from "../services/api"

function QuizGame() {

  const { id } = useParams()

  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await getQuizById(id)
      setQuiz(data)
    }
    fetchQuiz()
  }, [id])

  const handleSelect = (qId, option) => {
    setAnswers({ ...answers, [qId]: option })
  }

  const handleSubmit = async () => {
    const res = await submitQuiz(id, answers)
    setResult(res)
  }

  if (!quiz) return <h2>Loading...</h2>

  return (
    <div className="container mt-5">

      <h2 className="glow-text">{quiz.title}</h2>

      {quiz.questions.map((q) => (
        <div key={q.id} className="glass-card p-3 mt-3">

          <h5>{q.question}</h5>

          {[1,2,3,4].map((opt) => (
            <button
              key={opt}
              className="quiz-option"
              onClick={() => handleSelect(q.id, opt)}
            >
              {q[`option${opt}`]}
            </button>
          ))}
        </div>
      ))}

      <button className="btn-neon mt-4" onClick={handleSubmit}>
        Submit Quiz
      </button>

      {result && (
        <h3 className="mt-4">
          Score: {result.score} / {result.total}
        </h3>
      )}

    </div>
  )
}

export default QuizGame