import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Register() {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const validate = () => {
    if (!form.username || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return false;
    }

    if (form.username.length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        {
          username: form.username,
          password: form.password
        }
      );

      setSuccess(res.data.message || "Registration successful!");

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate("/login", {
          state: { msg: "Registration successful! Please login." }
        });
      }, 1500);
    } catch (err) {
      if (err.response?.data?.username) {
        setError(err.response.data.username[0]);
      } else if (err.response?.data?.password) {
        setError(err.response.data.password[0]);
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Registration failed. Please try again.");
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
    iconWrapper: {
      textAlign: "center",
      marginBottom: "1rem",
    },
    icon: {
      fontSize: "3rem",
      display: "inline-block",
      animation: "float 3s ease-in-out infinite",
    },
    passwordHint: {
      fontSize: "0.7rem",
      color: "var(--theme-text-light)",
      marginTop: "-0.5rem",
      marginBottom: "1rem",
      textAlign: "left",
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
      
      .register-button:hover:not(:disabled) {
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
            {currentTheme.icon === '🌸' ? '✨' : 
             currentTheme.icon === '🌿' ? '🌱' : 
             currentTheme.icon === '💜' ? '💫' : 
             currentTheme.icon === '🌊' ? '🌟' : 
             currentTheme.icon === '🌅' ? '⭐' : '🎯'}
          </span>
        </div>
        
        <h2 style={styles.title}>
          Create Account ✨
        </h2>

        <p style={styles.subtitle}>
          Join the quiz arena and start your journey
        </p>

        {/* Error Message */}
        {error && (
          <div style={styles.errorMessage} className="shake">
            ⚠️ {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div style={styles.successMessage}>
            ✓ {success}
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
          disabled={loading}
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
          autoComplete="new-password"
          disabled={loading}
        />
        
        <div style={styles.passwordHint}>
          • Password must be at least 6 characters
        </div>

        <input
          name="confirmPassword"
          type="password"
          className="input-field"
          style={styles.input}
          placeholder="Confirm Password"
          onChange={handleChange}
          value={form.confirmPassword}
          onKeyDown={handleKeyPress}
          autoComplete="new-password"
          disabled={loading}
        />

        <button
          className="register-button"
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
              Creating account...
            </span>
          ) : (
            "Register"
          )}
        </button>

        <div style={styles.footer}>
          Already have an account?
          <Link to="/login" style={styles.link}>
            Login here
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

export default Register;