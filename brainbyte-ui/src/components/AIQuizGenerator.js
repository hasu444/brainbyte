import React, { useState } from "react";
import axios from "axios";

function AIQuizGenerator() {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [generatedJson, setGeneratedJson] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    setMessage("");
    setGeneratedJson("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/quizzes/generate-ai/",
        { topic, num_questions: numQuestions },
        { headers: { Authorization: `Token ${token}` } }
      );

      if (res.data.questions) {
        // Successfully received AI quiz questions
        setGeneratedJson(JSON.stringify(res.data.questions, null, 2));
        setMessage("✅ AI Quiz generated successfully! Copy or edit below.");
      } else {
        setMessage("❌ AI returned invalid format. Check console.");
        console.error(res.data);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error generating AI quiz. Check API or console.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedJson);
    setMessage("📋 JSON copied to clipboard!");
  };

  return (
    <div className="ai-generator mt-3">
      <input
        className="form-control mb-2"
        placeholder="Enter Quiz Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Number of Questions"
        value={numQuestions}
        onChange={(e) => setNumQuestions(e.target.value)}
        min={1}
        max={50}
      />

      <button
        className="btn-primary-custom w-100 mb-2"
        onClick={handleGenerate}
        disabled={loading || !topic}
      >
        {loading ? "Generating AI Quiz..." : "Generate AI Quiz 🤖"}
      </button>

      {message && (
        <p className={`text-center ${message.startsWith("✅") || message.startsWith("📋") ? "text-success" : "text-danger"}`}>
          {message}
        </p>
      )}

      {generatedJson && (
        <div className="mb-2">
          <textarea
            className="form-control"
            rows="10"
            value={generatedJson}
            readOnly
          />
          <button
            className="btn-secondary-custom mt-2 w-100"
            onClick={handleCopy}
          >
            Copy JSON 📋
          </button>
        </div>
      )}
    </div>
  );
}

export default AIQuizGenerator;