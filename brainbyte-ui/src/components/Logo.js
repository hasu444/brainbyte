import React from "react"

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      
      {/* Brain Icon SVG */}
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 3C6.5 3 5 5 5 7C5 7.5 5.1 8 5.3 8.4C3.9 9 3 10.5 3 12C3 14.2 4.8 16 7 16H9V3Z"
          fill="#3b82f6"
        />
        <path
          d="M15 3C17.5 3 19 5 19 7C19 7.5 18.9 8 18.7 8.4C20.1 9 21 10.5 21 12C21 14.2 19.2 16 17 16H15V3Z"
          fill="#60a5fa"
        />
      </svg>

      <h4 style={{ margin: 0, fontWeight: "600" }}>
        BrainByte
      </h4>

    </div>
  )
}

export default Logo