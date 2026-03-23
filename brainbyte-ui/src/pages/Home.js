import React, { useEffect, useState } from "react"
import { getQuizzes } from "../services/api"
import QuizCard from "../components/QuizCard"

function Home() {

  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await getQuizzes()
      setQuizzes(data)
    }
    fetchQuizzes()
  }, [])

  return (
    <div className="container mt-5">
      <h2 className="glow-text">Available Quizzes</h2>

      <div className="row mt-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}

export default Home