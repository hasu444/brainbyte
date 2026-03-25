import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ExcelUpload from "../components/ExcelUpload";
import { useTheme } from "../context/ThemeContext";

function AddQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rawInput, setRawInput] = useState("");
  const [timeLimit, setTimeLimit] = useState(10);
  const [category, setCategory] = useState("General");
  const [difficulty, setDifficulty] = useState("medium");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [parsedQuestions, setParsedQuestions] = useState([]);

  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const token = localStorage.getItem("token");

  const categories = [
    "General Knowledge",
    "Science",
    "Technology",
    "Mathematics",
    "History",
    "Geography",
    "Arts",
    "Sports",
    "Entertainment",
    "Custom"
  ];

  const difficulties = [
    { value: "easy", label: "Easy", color: "#10b981" },
    { value: "medium", label: "Medium", color: "#f59e0b" },
    { value: "hard", label: "Hard", color: "#ef4444" }
  ];

  const validateFormat = useCallback((lines) => {
    const errors = [];
    const questions = [];

    lines.forEach((line, index) => {
      const parts = line.split("|").map(p => p.trim());
      
      if (parts.length !== 6) {
        errors.push(`Line ${index + 1}: Expected 6 parts, got ${parts.length}`);
        return;
      }

      const [question, opt1, opt2, opt3, opt4, correct] = parts;
      
      if (!question) errors.push(`Line ${index + 1}: Question cannot be empty`);
      if (!opt1 || !opt2 || !opt3 || !opt4) errors.push(`Line ${index + 1}: All options are required`);
      
      const correctNum = parseInt(correct);
      if (isNaN(correctNum) || correctNum < 1 || correctNum > 4) {
        errors.push(`Line ${index + 1}: Correct option must be between 1 and 4`);
      }

      questions.push({
        question,
        options: [opt1, opt2, opt3, opt4],
        correct_option: correctNum
      });
    });

    return { isValid: errors.length === 0, errors, questions };
  }, []);

  const handlePreview = () => {
    if (!rawInput.trim()) {
      setMessage("❌ Please enter questions to preview");
      setMessageType("error");
      return;
    }

    const lines = rawInput.split("\n").filter(line => line.trim() !== "");
    const { isValid, errors, questions } = validateFormat(lines);

    if (!isValid) {
      setMessage(`❌ Format errors:\n${errors.join("\n")}`);
      setMessageType("error");
      setParsedQuestions([]);
      setPreviewMode(false);
      return;
    }

    setParsedQuestions(questions);
    setPreviewMode(true);
    setMessage(`✅ Valid format! ${questions.length} questions loaded.`);
    setMessageType("success");
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setMessage("❌ Quiz title is required");
      setMessageType("error");
      return;
    }

    if (!rawInput.trim()) {
      setMessage("❌ Questions are required");
      setMessageType("error");
      return;
    }

    const lines = rawInput.split("\n").filter(line => line.trim() !== "");
    const { isValid, errors, questions } = validateFormat(lines);

    if (!isValid) {
      setMessage(`❌ Format errors:\n${errors.join("\n")}`);
      setMessageType("error");
      return;
    }

    if (questions.length === 0) {
      setMessage("❌ No valid questions found");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post(
        "http://127.0.0.1:8000/api/quizzes/",
        {
          title: title.trim(),
          description: description.trim(),
          time_limit: parseInt(timeLimit),
          category: category,
          difficulty: difficulty,
          questions
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      setMessage(`✅ Quiz "${title}" created successfully with ${questions.length} questions!`);
      setMessageType("success");

      // Reset form after successful creation
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Error creating quiz. Please check your input format!");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all fields?")) {
      setTitle("");
      setDescription("");
      setRawInput("");
      setTimeLimit(10);
      setCategory("General");
      setDifficulty("medium");
      setMessage("");
      setMessageType("");
      setParsedQuestions([]);
      setPreviewMode(false);
    }
  };

  // Dynamic styles using theme variables
  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      background: "var(--theme-gradient-background)",
      padding: "2rem 1rem",
      fontFamily: "'Inter', 'Poppins', sans-serif",
      transition: "background 0.3s ease",
    },
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    card: {
      background: "var(--theme-glass-bg)",
      backdropFilter: `blur(var(--theme-glass-blur))`,
      borderRadius: "28px",
      padding: "2rem",
      border: "1px solid var(--theme-glass-border)",
      boxShadow: "var(--theme-shadow-lg)",
      transition: "all 0.3s ease",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "800",
      background: "var(--theme-gradient-primary)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "var(--theme-text-light)",
      fontSize: "0.9rem",
    },
    input: {
      width: "100%",
      padding: "0.875rem 1rem",
      marginBottom: "1rem",
      background: "var(--theme-surface)",
      border: "1px solid var(--theme-border)",
      borderRadius: "12px",
      color: "var(--theme-text)",
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: "0.875rem 1rem",
      marginBottom: "1rem",
      background: "var(--theme-surface)",
      border: "1px solid var(--theme-border)",
      borderRadius: "12px",
      color: "var(--theme-text)",
      fontSize: "0.95rem",
      fontFamily: "monospace",
      transition: "all 0.3s ease",
      outline: "none",
      resize: "vertical",
    },
    select: {
      width: "100%",
      padding: "0.875rem 1rem",
      marginBottom: "1rem",
      background: "var(--theme-surface)",
      border: "1px solid var(--theme-border)",
      borderRadius: "12px",
      color: "var(--theme-text)",
      fontSize: "0.95rem",
      cursor: "pointer",
      outline: "none",
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
    buttonPrimary: {
      flex: 1,
      padding: "0.875rem",
      background: "var(--theme-gradient-primary)",
      border: "none",
      borderRadius: "12px",
      color: "white",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    buttonSecondary: {
      flex: 1,
      padding: "0.875rem",
      background: "var(--theme-glass-bg)",
      border: "1px solid var(--theme-border)",
      borderRadius: "12px",
      color: "var(--theme-text)",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    buttonDanger: {
      padding: "0.875rem",
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: "12px",
      color: "#ef4444",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    message: {
      padding: "1rem",
      borderRadius: "12px",
      marginBottom: "1rem",
      textAlign: "center",
      animation: "fadeInUp 0.3s ease",
    },
    successMessage: {
      background: "rgba(16, 185, 129, 0.1)",
      border: "1px solid rgba(16, 185, 129, 0.3)",
      color: "#10b981",
    },
    errorMessage: {
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      color: "#ef4444",
    },
    previewCard: {
      marginTop: "1.5rem",
      padding: "1rem",
      background: "var(--theme-glass-bg)",
      borderRadius: "12px",
      border: "1px solid var(--theme-border)",
    },
    previewTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      marginBottom: "0.75rem",
      color: "var(--theme-text)",
    },
    questionItem: {
      padding: "0.75rem",
      marginBottom: "0.5rem",
      background: "rgba(0, 0, 0, 0.02)",
      borderRadius: "8px",
      borderLeft: `3px solid var(--theme-primary)`,
    },
    formatHint: {
      fontSize: "0.75rem",
      color: "var(--theme-text-light)",
      marginTop: "-0.5rem",
      marginBottom: "1rem",
      padding: "0.5rem",
      background: "rgba(0, 0, 0, 0.03)",
      borderRadius: "8px",
      fontFamily: "monospace",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
      marginBottom: "0",
    },
    divider: {
      margin: "1.5rem 0",
      borderTop: "1px solid var(--theme-border)",
    },
  };

  // Add animations
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .input-field:focus,
      .textarea-field:focus,
      .select-field:focus {
        border-color: var(--theme-primary);
        box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
        outline: none;
      }
      
      .button-primary:hover:not(:disabled),
      .button-secondary:hover:not(:disabled) {
        transform: translateY(-2px);
      }
      
      .button-primary:hover:not(:disabled) {
        box-shadow: var(--theme-shadow-glow);
      }
      
      .button-secondary:hover:not(:disabled) {
        background: var(--theme-glass-bg);
        border-color: var(--theme-primary);
      }
      
      .button-danger:hover {
        background: rgba(239, 68, 68, 0.2);
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>
              {currentTheme.icon} Create New Quiz
            </h1>
            <p style={styles.subtitle}>
              Add questions manually or upload via Excel
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div style={{
              ...styles.message,
              ...(messageType === "success" ? styles.successMessage : styles.errorMessage)
            }}>
              {message.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}

          {/* Quiz Information */}
          <input
            className="input-field"
            style={styles.input}
            placeholder="Quiz Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />

          <textarea
            className="textarea-field"
            style={styles.textarea}
            placeholder="Quiz Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            disabled={loading}
          />

          <div style={styles.row}>
            <input
              type="number"
              className="input-field"
              style={styles.input}
              placeholder="Time Limit (minutes)"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              disabled={loading}
            />

            <select
              className="select-field"
              style={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <select
            className="select-field"
            style={styles.select}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={loading}
          >
            {difficulties.map(diff => (
              <option key={diff.value} value={diff.value}>
                {diff.label} - {diff.value === "easy" ? "⭐" : diff.value === "medium" ? "⭐⭐" : "⭐⭐⭐"}
              </option>
            ))}
          </select>

          {/* Questions Input */}
          <label style={{ fontWeight: "600", marginBottom: "0.5rem", display: "block", color: "var(--theme-text)" }}>
            Questions (Format: Question | Option1 | Option2 | Option3 | Option4 | CorrectOptionNumber)
          </label>
          
          <textarea
            className="textarea-field"
            style={styles.textarea}
            placeholder="What is 2+2? | 3 | 4 | 5 | 6 | 2&#10;Who wrote Romeo and Juliet? | Dickens | Shakespeare | Hemingway | Austen | 2&#10;What is the capital of France? | London | Berlin | Paris | Madrid | 3"
            value={rawInput}
            onChange={(e) => {
              setRawInput(e.target.value);
              setPreviewMode(false);
            }}
            rows="10"
            disabled={loading}
          />

          <div style={styles.formatHint}>
            💡 Format: <strong>Question | Option 1 | Option 2 | Option 3 | Option 4 | Correct Option Number (1-4)</strong>
            <br />
            Example: What is the capital of France? | London | Berlin | Paris | Madrid | 3
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonGroup}>
            <button
              className="button-secondary"
              style={styles.buttonSecondary}
              onClick={handlePreview}
              disabled={loading || !rawInput.trim()}
              onMouseEnter={(e) => {
                if (!loading && rawInput.trim()) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              👁️ Preview Questions
            </button>
            
            <button
              className="button-primary"
              style={styles.buttonPrimary}
              onClick={handleSubmit}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--theme-shadow-glow)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <span className="spinner-small"></span>
                  Creating Quiz...
                </span>
              ) : (
                "🚀 Create Quiz"
              )}
            </button>
          </div>

          <div style={styles.buttonGroup}>
            <button
              className="button-danger"
              style={styles.buttonDanger}
              onClick={handleReset}
              disabled={loading}
            >
              🗑️ Reset Form
            </button>
          </div>

          {/* Preview Section */}
          {previewMode && parsedQuestions.length > 0 && (
            <div style={styles.previewCard}>
              <div style={styles.previewTitle}>
                📋 Preview ({parsedQuestions.length} questions)
              </div>
              {parsedQuestions.slice(0, 5).map((q, idx) => (
                <div key={idx} style={styles.questionItem}>
                  <strong>{idx + 1}. {q.question}</strong>
                  <div style={{ fontSize: "0.85rem", marginTop: "0.25rem", color: "var(--theme-text-light)" }}>
                    Options: {q.options.join(" | ")}
                  </div>
                  <div style={{ fontSize: "0.8rem", marginTop: "0.25rem", color: "#10b981" }}>
                    ✓ Correct: {q.options[q.correct_option - 1]}
                  </div>
                </div>
              ))}
              {parsedQuestions.length > 5 && (
                <div style={{ textAlign: "center", marginTop: "0.5rem", color: "var(--theme-text-light)" }}>
                  + {parsedQuestions.length - 5} more questions
                </div>
              )}
            </div>
          )}

          <div style={styles.divider} />

          {/* Excel Upload Section */}
          <div>
            <h4 style={{ textAlign: "center", marginBottom: "1rem", color: "var(--theme-text)" }}>
              📊 Upload via Excel
            </h4>
            <ExcelUpload />
          </div>

          {/* Navigation Link */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Link to="/" style={{ color: "var(--theme-primary)", textDecoration: "none" }}>
              ← Back to Quizzes
            </Link>
          </div>
        </div>
      </div>

      {/* Spinner Style */}
      <style>{`
        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AddQuiz;