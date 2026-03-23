import React, { useState } from "react"
import axios from "axios"

function AIQuizGenerator() {

  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")

  const generateQuiz = async () => {

    setLoading(true)
  
    try {
  
      const res = await axios.post(
        "http://127.0.0.1:8000/api/quizzes/generate-ai/",
        { topic },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
  
      console.log("AI RAW:", res.data.questions)
  
      let questions
  
      try {
        questions = JSON.parse(res.data.questions)
      } catch (err) {
        alert("❌ AI returned invalid format. Check console.")
        setLoading(false)
        return
      }
  
      await axios.post(
        "http://127.0.0.1:8000/api/quizzes/create/",
        {
          title: `${topic} Quiz`,
          questions
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
  
      alert("🤖 AI Quiz Created!")
  
    } catch (err) {
      console.error(err)
      alert("❌ Error generating quiz")
    }
  
    setLoading(false)
  }
  return (

    <div className="text-center mt-4">

      <input
        className="form-control mb-2"
        placeholder="Enter topic (Python, AI, etc.)"
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        className="btn btn-dark"
        onClick={generateQuiz}
      >
        {loading ? "Generating..." : "Generate AI Quiz 🤖"}
      </button>

    </div>

  )
}

export default AIQuizGenerator