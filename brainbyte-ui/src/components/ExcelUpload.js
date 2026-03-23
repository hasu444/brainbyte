import React from "react"
import * as XLSX from "xlsx"
import axios from "axios"

function ExcelUpload() {

  const token = localStorage.getItem("token")

  const handleFile = async (e) => {

    const file = e.target.files[0]
    const data = await file.arrayBuffer()

    const workbook = XLSX.read(data)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]

    const json = XLSX.utils.sheet_to_json(sheet)

    // Format data
    const questions = json.map(row => ({
      question: row.Question,
      options: [
        row.Option1,
        row.Option2,
        row.Option3,
        row.Option4
      ],
      answer: row.Answer
    }))

    await axios.post(
      "http://127.0.0.1:8000/api/quizzes/",
      {
        title: "Excel Quiz",
        questions
      },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )

    alert("✅ Quiz uploaded from Excel!")
  }

  return (
    <div className="text-center mt-4">
      <input type="file" onChange={handleFile} />
    </div>
  )
}

export default ExcelUpload