import React, { useEffect, useState } from "react"
import { getLeaderboard } from "../services/api"

function Leaderboard() {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getLeaderboard()
      setData(res)
    }
    fetchData()
  }, [])

  return (
    <div className="container mt-5">

      <h2 className="glow-text">Leaderboard</h2>

      {data.map((item, index) => (
        <div key={index} className="leaderboard-card">
          <h5>{item.username}</h5>
          <p>Score: {item.score}</p>
        </div>
      ))}

    </div>
  )
}

export default Leaderboard