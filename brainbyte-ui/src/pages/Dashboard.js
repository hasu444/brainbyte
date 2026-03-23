import React, { useEffect, useState } from "react"
import { getResults } from "../services/api"

function Dashboard() {

  const [results, setResults] = useState([])

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    const data = await getResults()
    setResults(data)
  }

  return (
    <div className="container page-wrapper">

      <h2 className="title mb-4">Your Performance</h2>

      {results.map((r, i) => (
        <div key={i} className="glass-card mb-3">
          <h5>{r.quiz}</h5>
          <p>Score: {r.score}</p>
        </div>
      ))}

    </div>
  )
}

export default Dashboard