import React, { useState } from "react"
import axios from "axios"

import ExcelUpload from "../components/ExcelUpload"
import AIQuizGenerator from "../components/AIQuizGenerator"

function AddQuiz() {

  const [title, setTitle] = useState("")
  const [jsonInput, setJsonInput] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {

    try {

      const questions = JSON.parse(jsonInput)

      const token = localStorage.getItem("token")

      await axios.post(
        "http://127.0.0.1:8000/api/quizzes/",
        {
          title,
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
      setJsonInput("")

    } catch (err) {
      setMessage("❌ Invalid JSON or error creating quiz")
    }
  }

  return (

    <div className="container mt-5">

      <div className="glass-card p-4 col-md-8 mx-auto">

        <h2 className="text-center mb-4 glow-text">
          ⚡ Smart Add Quiz
        </h2>

        {message && (
          <p className="text-center">{message}</p>
        )}

        <input
          className="form-control mb-3"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          rows="10"
          placeholder="Paste JSON Questions here..."
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />

        <button
          className="btn-primary-custom w-100"
          onClick={handleSubmit}
        >
          Create Quiz 🚀
        </button>

        <hr />

<h4 className="text-center mt-4">📊 Upload via Excel</h4>
<ExcelUpload />

<hr />

<h4 className="text-center mt-4">🤖 AI Generator</h4>
<AIQuizGenerator />

      </div>

    </div>

  )

}

export default AddQuiz