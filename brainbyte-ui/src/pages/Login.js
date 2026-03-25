import React, { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme } = useTheme();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.username || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await loginUser(form);
      navigate("/");
    } catch (err) {
      if (err?.error) {
        setError(err.error);
      } else {
        setError("Invalid username or password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Dynamic styles using theme variables
  const styles = {
    container: {
      minHeight: "100vh",
      background: "var(--theme-gradient-background)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      transition: "background 0.3s ease",
    },
    card: {
      background: "var(--theme-glass-bg)",
      backdropFilter: `blur(var(--theme-glass-blur))`,
      borderRadius: "28px",
      padding: "2.5rem",
      maxWidth: "450px",
      width: "100%",
      border: "1px solid var(--theme-glass-border)",
      boxShadow: "var(--theme-shadow-lg)",
      transition: "all 0.3s ease",
      animation: "fadeInUp 0.5s ease",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "800",
      background: "var(--theme-gradient-primary)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "0.5rem",
      textAlign: "center",
    },
    subtitle: {
      color: "var(--theme-text-light)",
      textAlign: "center",
      marginBottom: "1.5rem",
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
    button: {
      width: "100%",
      padding: "0.875rem",
      background: "var(--theme-gradient-primary)",
      border: "none",
      borderRadius: "12px",
      color: "white",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "0.5rem",
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    errorMessage: {
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: "10px",
      padding: "0.75rem",
      marginBottom: "1rem",
      color: "#ef4444",
      fontSize: "0.85rem",
      textAlign: "center",
    },
    successMessage: {
      background: "rgba(16, 185, 129, 0.1)",
      border: "1px solid rgba(16, 185, 129, 0.3)",
      borderRadius: "10px",
      padding: "0.75rem",
      marginBottom: "1rem",
      color: "#10b981",
      fontSize: "0.85rem",
      textAlign: "center",
    },
    footer: {
      marginTop: "1.5rem",
      textAlign: "center",
      color: "var(--theme-text-light)",
      fontSize: "0.85rem",
    },
    link: {
      color: "var(--theme-primary)",
      textDecoration: "none",
      fontWeight: "600",
      marginLeft: "0.5rem",
      transition: "color 0.3s ease",
    },
    inputFocus: {
      borderColor: "var(--theme-primary)",
      boxShadow: "0 0 0 3px rgba(108, 92, 231, 0.1)",
    },
    iconWrapper: {
      textAlign: "center",
      marginBottom: "1rem",
    },
    icon: {
      fontSize: "3rem",
      display: "inline-block",
      animation: "float 3s ease-in-out infinite",
    },
  };

  // Add animations
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      @keyframes shake {
        0%, 100% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(-5px);
        }
        75% {
          transform: translateX(5px);
        }
      }
      
      .input-field {
        transition: all 0.3s ease;
      }
      
      .input-field:focus {
        border-color: var(--theme-primary);
        box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
        outline: none;
      }
      
      .login-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: var(--theme-shadow-glow);
      }
      
      .shake {
        animation: shake 0.3s ease-in-out;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <span style={styles.icon}>
            {currentTheme.icon === '🌸' ? '📚' : currentTheme.icon === '🌿' ? '🌱' : currentTheme.icon === '💜' ? '💜' : currentTheme.icon === '🌊' ? '🌊' : currentTheme.icon === '🌅' ? '🌅' : '🎯'}
          </span>
        </div>
        
        <h2 style={styles.title}>
          Welcome Back 👋
        </h2>

        <p style={styles.subtitle}>
          Login to continue your quiz journey
        </p>

        {/* Success Message from Register */}
        {location.state?.msg && (
          <div style={styles.successMessage}>
            ✓ {location.state.msg}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={styles.errorMessage} className="shake">
            ⚠️ {error}
          </div>
        )}

        <input
          name="username"
          className="input-field"
          style={styles.input}
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          onKeyDown={handleKeyPress}
          autoComplete="username"
        />

        <input
          name="password"
          type="password"
          className="input-field"
          style={styles.input}
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          onKeyDown={handleKeyPress}
          autoComplete="current-password"
        />

        <button
          className="login-button"
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {})
          }}
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
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>

        <div style={styles.footer}>
          Don't have an account?
          <Link to="/register" style={styles.link}>
            Register here
          </Link>
        </div>
      </div>

      {/* Add small spinner style */}
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

export default Login;