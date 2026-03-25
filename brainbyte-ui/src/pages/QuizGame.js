import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { submitQuiz } from "../services/api";

function QuizGame() {
  const { id } = useParams();
  const navigate = useNavigate(); // 🔥 redirect

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ============================= */
  /* FETCH QUIZ */
  /* ============================= */

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!id) {
          console.error("Quiz ID missing!");
          return;
        }

        const res = await axios.get(
          `http://127.0.0.1:8000/api/quizzes/${id}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        const data = res.data;

        // ensure questions array exists
        data.questions = data.questions || [];

        setQuiz(data);

      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  /* ============================= */
  /* HANDLE ANSWER */
  /* ============================= */

  const handleSelect = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  /* ============================= */
  /* SUBMIT QUIZ */
  /* ============================= */

  const handleSubmit = async () => {
    try {
      if (!id) {
        alert("Quiz ID missing!");
        return;
      }

      if (Object.keys(answers).length === 0) {
        alert("Please answer at least one question!");
        return;
      }

      const data = await submitQuiz(id, answers);
      setResult(data);

      // 🔥 REDIRECT AFTER 2 SECONDS
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Submission failed");
    }
  };

  /* ============================= */
  /* LOADING */
  /* ============================= */

  if (loading) {
    return <p className="text-center mt-5">Loading quiz...</p>;
  }

  if (!quiz) {
    return <p className="text-center mt-5 text-danger">Quiz not found</p>;
  }

  /* ============================= */
  /* UI */
  /* ============================= */

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">{quiz.title}</h2>

      {quiz.questions.length > 0 ? (
        quiz.questions.map((q, index) => {
          const options = [
            q.option1 || "",
            q.option2 || "",
            q.option3 || "",
            q.option4 || "",
          ];

          return (
            <div key={q.id || index} className="card p-3 mb-3 shadow-sm">
              <p>
                <strong>
                  Q{index + 1}. {q.question || "No question text"}
                </strong>
              </p>

              {options.map((opt, idx) => (
                <div
                  key={idx}
                  className={`form-check p-2 rounded ${
                    answers[q.id] === idx + 1 ? "bg-light border" : ""
                  }`}
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === idx + 1}
                    onChange={() => handleSelect(q.id, idx + 1)}
                  />
                  <label className="form-check-label ms-2">
                    {opt || "No option"}
                  </label>
                </div>
              ))}
            </div>
          );
        })
      ) : (
        <p className="text-muted">No questions available.</p>
      )}

      {/* SUBMIT BUTTON */}
      <button className="btn btn-success mt-3" onClick={handleSubmit}>
        🚀 Submit Quiz
      </button>

      {/* RESULT */}
      {result && (
        <div className="alert alert-success mt-4">
          <h4>
            🎯 Score: {result.score} / {result.total}
          </h4>
          <p>{result.message}</p>
          <p>Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
}

export default QuizGame;