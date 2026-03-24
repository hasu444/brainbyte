import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { submitQuiz } from "../services/quiz";

function QuizGame() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://127.0.0.1:8000/api/quizzes/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setQuiz(res.data);
    };
    fetchQuiz();
  }, [id]);

  const handleSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = async () => {
    const data = await submitQuiz(id, answers);
    setResult(data);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{quiz.title}</h2>

      {quiz.questions.map((q) => (
        <div key={q.id} className="mb-3">
          <p>{q.question}</p>
          {q.options.map((opt, idx) => (
            <div key={idx} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`q-${q.id}`}       // important: group by question ID
                value={idx + 1}           // value sent to state
                checked={answers[q.id] === idx + 1} // mark checked
                onChange={() => handleSelect(q.id, idx + 1)}
              />
              <label className="form-check-label">{opt}</label>
            </div>
          ))}
        </div>
      ))}

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit Quiz
      </button>

      {result && (
        <div className="mt-3">
          <h4>Result: {result.score}/{result.total}</h4>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
}

export default QuizGame;