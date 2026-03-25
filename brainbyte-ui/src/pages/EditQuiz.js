import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditQuiz() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ============================= */
  /* FETCH QUIZ */
  /* ============================= */

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://127.0.0.1:8000/api/quizzes/${id}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        // ✅ Ensure questions exist
        const data = res.data;
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
  /* HANDLE CHANGE (SAFE UPDATE) */
  /* ============================= */

  const handleQuestionChange = (qIndex, field, value) => {
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];

      updatedQuestions[qIndex] = {
        ...updatedQuestions[qIndex],
        [field]: value,
      };

      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  /* ============================= */
  /* SAVE QUIZ */
  /* ============================= */

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://127.0.0.1:8000/api/quizzes/${id}/`,
        quiz,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      alert("✅ Quiz updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update quiz");
    }
  };

  /* ============================= */
  /* LOADING */
  /* ============================= */

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (!quiz) {
    return <p className="text-center mt-5 text-danger">Quiz not found</p>;
  }

  /* ============================= */
  /* UI */
  /* ============================= */

  return (
    <div className="container mt-4">
      <h2 className="mb-4">✏️ Edit Quiz: {quiz.title}</h2>

      {quiz.questions.length === 0 && (
        <p className="text-muted">No questions available.</p>
      )}

      {quiz.questions.map((q, index) => (
        <div key={q.id || index} className="card p-3 mb-3 shadow-sm">
          <h5>Question {index + 1}</h5>

          {/* QUESTION */}
          <input
            type="text"
            className="form-control mb-2"
            value={q.question || ""}
            onChange={(e) =>
              handleQuestionChange(index, "question", e.target.value)
            }
          />

          {/* OPTIONS */}
          {["option1", "option2", "option3", "option4"].map(
            (optKey, idx) => (
              <input
                key={idx}
                type="text"
                className="form-control mb-2"
                value={q[optKey] || ""}
                onChange={(e) =>
                  handleQuestionChange(index, optKey, e.target.value)
                }
                placeholder={`Option ${idx + 1}`}
              />
            )
          )}
        </div>
      ))}

      <button className="btn btn-success mt-3" onClick={handleSave}>
        💾 Save Changes
      </button>
    </div>
  );
}

export default EditQuiz;