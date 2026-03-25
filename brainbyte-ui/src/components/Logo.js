import React from "react";

function Logo() {
  const styles = {
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
    },
    brainIcon: {
      width: "38px",
      height: "38px",
      filter: "drop-shadow(0 0 4px rgba(108, 92, 231, 0.3))",
    },
    brandName: {
      margin: 0,
      fontWeight: "700",
      fontSize: "1.4rem",
      background: "linear-gradient(135deg, #6c5ce7, #a66bbe)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "-0.3px",
    },
    tagline: {
      margin: 0,
      fontSize: "0.6rem",
      color: "#7e84a3",
      letterSpacing: "0.3px",
    },
  };

  return (
    <div style={styles.logoContainer}>
      <svg
        style={styles.brainIcon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 3C6.5 3 5 5 5 7C5 7.5 5.1 8 5.3 8.4C3.9 9 3 10.5 3 12C3 14.2 4.8 16 7 16H9V3Z"
          fill="#6c5ce7"
        />
        <path
          d="M15 3C17.5 3 19 5 19 7C19 7.5 18.9 8 18.7 8.4C20.1 9 21 10.5 21 12C21 14.2 19.2 16 17 16H15V3Z"
          fill="#a66bbe"
        />
        <path
          d="M12 16L12 20M12 20L10 18M12 20L14 18"
          stroke="#ff8c5a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <h4 style={styles.brandName}>BrainByte</h4>
        <p style={styles.tagline}>Quiz Arena</p>
      </div>
    </div>
  );
}

export default Logo;