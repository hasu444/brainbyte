import React, { useState } from "react"
import axios from "axios"
import ExcelUpload from "../components/ExcelUpload"

function AddQuiz() {
  const [title, setTitle] = useState("")
  const [rawInput, setRawInput] = useState("")
  const [timeLimit, setTimeLimit] = useState(10) // in minutes
  const [message, setMessage] = useState("")

  const token = localStorage.getItem("token")

  const handleSubmit = async () => {
    if (!title || !rawInput) {
      setMessage("❌ Title and questions are required")
      return
    }

    try {
      // Split lines
      const lines = rawInput.split("\n").filter(line => line.trim() !== "")

      const questions = lines.map(line => {
        const parts = line.split("|").map(p => p.trim())
        if (parts.length !== 6) throw new Error("Each line must have 6 parts")
        return {
          question: parts[0],
          options: [parts[1], parts[2], parts[3], parts[4]],
          correct_option: parseInt(parts[5])
        }
      })

      await axios.post(
        "http://127.0.0.1:8000/api/quizzes/create/",
        {
          title,
          description: "",
          time_limit: timeLimit,
          questions
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      setMessage("✅ Quiz created successfully!")
      setTitle("")
      setRawInput("")
      setTimeLimit(10)

    } catch (err) {
      console.error(err)
      setMessage("❌ Error creating quiz. Check your format!")
    }
  }

  return (
    <div className="container mt-5">
      <div className="glass-card p-4 col-md-8 mx-auto">
        <h2 className="text-center mb-4 glow-text">⚡ Smart Add Quiz</h2>

        {message && <p className="text-center">{message}</p>}

        <input
          className="form-control mb-3"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Time Limit (minutes)"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          rows="10"
          placeholder="Paste questions here: Question | Option1 | Option2 | Option3 | Option4 | CorrectOptionNumber"
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
        />

        <button className="btn-primary-custom w-100" onClick={handleSubmit}>
          Create Quiz 🚀
        </button>

        <hr />

        <h4 className="text-center mt-4">📊 Upload via Excel</h4>
        <ExcelUpload />
      </div>
    </div>
  )
}

export default AddQuiz