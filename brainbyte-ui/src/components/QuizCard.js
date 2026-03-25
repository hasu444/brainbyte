import React from "react";
import { useNavigate } from "react-router-dom";

function QuizCard({ quiz }) {
  const navigate = useNavigate();

  const handleStart = () => {
    // 🔍 Debug (optional)
    console.log("Quiz object:", quiz);

    // 🚨 Safety check
    if (!quiz || !quiz.id) {
      console.error("Quiz ID is missing!", quiz);
      return;
    }

    // ✅ Correct navigation
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <div className="card shadow-sm p-3 mb-3">
      <h4>{quiz.title}</h4>

      {quiz.description && (
        <p className="text-muted">{quiz.description}</p>
      )}

      <button className="btn btn-success mt-2" onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  );
}

export default QuizCard;