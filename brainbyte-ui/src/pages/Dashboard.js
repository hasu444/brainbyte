import React, { useEffect, useState, useCallback } from "react";
import { getResults } from "../services/api";
import { getUsername, isAuthenticated } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalPoints: 0,
    quizzesTaken: 0,
  });
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  // Deduplicate results based on quizId
  const deduplicateResults = useCallback((resultsArray) => {
    const uniqueMap = new Map();
    
    resultsArray.forEach(result => {
      const existing = uniqueMap.get(result.quizId);
      // Keep the most recent result if there are duplicates
      if (!existing || new Date(result.completedAt) > new Date(existing.completedAt)) {
        uniqueMap.set(result.quizId, result);
      }
    });
    
    return Array.from(uniqueMap.values());
  }, []);

  const calculateStats = useCallback((data) => {
    if (!data || data.length === 0) {
      setStats({
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalPoints: 0,
        quizzesTaken: 0,
      });
      return;
    }

    const scores = data.map((r) => r.score);
    const totalPoints = scores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalPoints / data.length;
    const bestScore = Math.max(...scores);
    const quizzesTaken = data.length;

    setStats({
      totalQuizzes: data.length,
      averageScore: Math.round(averageScore),
      bestScore: bestScore,
      totalPoints: totalPoints,
      quizzesTaken: quizzesTaken,
    });
  }, []);

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getResults();
      
      // Ensure data is an array
      const resultsArray = Array.isArray(data) ? data : [];
      
      // Deduplicate results to prevent showing multiple entries for same quiz
      const uniqueResults = deduplicateResults(resultsArray);
      
      // Sort by date (most recent first)
      const sortedResults = uniqueResults.sort((a, b) => {
        const dateA = new Date(a.completedAt || 0);
        const dateB = new Date(b.completedAt || 0);
        return dateB - dateA;
      });
      
      setResults(sortedResults);
      calculateStats(sortedResults);
    } catch (error) {
      console.error("Failed to fetch results:", error);
      setError("Failed to load your quiz results. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [deduplicateResults, calculateStats]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    fetchResults();
  }, [navigate, fetchResults]);

  const getScoreColor = (score) => {
    if (score >= 80) return "#00b894";
    if (score >= 60) return "#fdcb6e";
    if (score >= 40) return "#ff8c5a";
    return "#e84393";
  };

  const getScoreEmoji = (score) => {
    if (score >= 80) return "🏆";
    if (score >= 60) return "🎯";
    if (score >= 40) return "📚";
    return "💪";
  };

  const getGrade = (score) => {
    if (score >= 90) return "S";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  };

  const handleRefresh = async () => {
    await fetchResults();
  };

  // Dynamic styles that use theme variables
  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      background: "var(--theme-gradient-background)",
      padding: "2rem 1rem",
      fontFamily: "'Inter', 'Poppins', sans-serif",
      transition: "background 0.3s ease",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    header: {
      marginBottom: "2rem",
      textAlign: "center",
      animation: "fadeInUp 0.6s ease",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      background: "var(--theme-gradient-primary)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "var(--theme-text-light)",
      fontSize: "1rem",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1.5rem",
      marginBottom: "3rem",
    },
    statCard: {
      background: "var(--theme-glass-bg)",
      backdropFilter: `blur(var(--theme-glass-blur))`,
      borderRadius: "20px",
      padding: "1.5rem",
      border: "1px solid var(--theme-glass-border)",
      transition: "all 0.3s ease",
      textAlign: "center",
      cursor: "pointer",
    },
    statIcon: {
      fontSize: "2rem",
      marginBottom: "0.5rem",
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: "800",
      background: "var(--theme-gradient-primary)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "0.25rem",
    },
    statLabel: {
      color: "var(--theme-text-light)",
      fontSize: "0.85rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "var(--theme-text)",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    refreshButton: {
      padding: "0.5rem 1rem",
      background: "var(--theme-glass-bg)",
      border: "1px solid var(--theme-glass-border)",
      borderRadius: "10px",
      color: "var(--theme-text)",
      cursor: "pointer",
      fontSize: "0.85rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      transition: "all 0.3s ease",
    },
    resultsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    resultCard: {
      background: "var(--theme-glass-bg)",
      backdropFilter: `blur(var(--theme-glass-blur))`,
      borderRadius: "16px",
      padding: "1.25rem",
      border: "1px solid var(--theme-glass-border)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    resultHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.75rem",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    quizTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "var(--theme-text)",
    },
    scoreBadge: {
      padding: "0.25rem 0.75rem",
      borderRadius: "50px",
      fontSize: "0.85rem",
      fontWeight: "600",
    },
    resultDetails: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "0.5rem",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    scoreBar: {
      flex: 1,
      height: "8px",
      background: "rgba(0, 0, 0, 0.1)",
      borderRadius: "4px",
      overflow: "hidden",
      marginRight: "1rem",
    },
    scoreFill: {
      height: "100%",
      borderRadius: "4px",
      transition: "width 0.5s ease",
    },
    grade: {
      fontSize: "1rem",
      fontWeight: "700",
      padding: "0.25rem 0.5rem",
      borderRadius: "8px",
      minWidth: "40px",
      textAlign: "center",
    },
    emptyState: {
      textAlign: "center",
      padding: "3rem",
      background: "rgba(0, 0, 0, 0.02)",
      borderRadius: "20px",
      border: "1px dashed var(--theme-border)",
    },
    emptyIcon: {
      fontSize: "3rem",
      marginBottom: "1rem",
      opacity: 0.6,
    },
    emptyTitle: {
      fontSize: "1.2rem",
      color: "var(--theme-text)",
      marginBottom: "0.5rem",
    },
    emptyText: {
      color: "var(--theme-text-light)",
      fontSize: "0.9rem",
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
      flexDirection: "column",
      gap: "1rem",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "3px solid rgba(108, 92, 231, 0.2)",
      borderTop: `3px solid var(--theme-primary)`,
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    insightCard: {
      marginTop: "2rem",
      padding: "1.5rem",
      background: "var(--theme-glass-bg)",
      backdropFilter: `blur(var(--theme-glass-blur))`,
      borderRadius: "20px",
      border: "1px solid var(--theme-glass-border)",
      transition: "all 0.3s ease",
    },
    takeQuizButton: {
      marginTop: "1.5rem",
      padding: "0.75rem 2rem",
      background: "var(--theme-gradient-primary)",
      border: "none",
      borderRadius: "50px",
      color: "white",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    errorCard: {
      marginBottom: "2rem",
      padding: "1rem",
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: "12px",
      color: "#ef4444",
      textAlign: "center",
    },
  };

  // Add keyframes for animations
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .result-card-hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .result-card-hover:hover {
        transform: translateY(-4px);
        border-color: var(--theme-primary);
        box-shadow: var(--theme-shadow-lg);
      }
      .stat-card-hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .stat-card-hover:hover {
        transform: translateY(-4px);
        border-color: var(--theme-primary);
        box-shadow: var(--theme-shadow-md);
      }
      .stat-card-hover:hover .stat-value {
        transform: scale(1.05);
      }
      .stat-value {
        transition: transform 0.3s ease;
        display: inline-block;
      }
      .refresh-button-hover:hover {
        transform: translateY(-2px);
        background: var(--theme-glass-bg);
        border-color: var(--theme-primary);
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  if (loading) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={{ color: "var(--theme-text-light)" }}>Loading your performance data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            {currentTheme.icon} {currentTheme.id === 'midnightGalaxy' ? '✨' : '📊'} Performance Dashboard
          </h1>
          <p style={styles.subtitle}>
            Welcome back, <strong style={{ color: "var(--theme-primary)" }}>{getUsername()}</strong>! Here's your quiz journey
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorCard}>
            ⚠️ {error}
          </div>
        )}

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div className="stat-card-hover" style={styles.statCard}>
            <div style={styles.statIcon}>🎯</div>
            <div className="stat-value" style={styles.statValue}>{stats.quizzesTaken}</div>
            <div style={styles.statLabel}>Unique Quizzes Completed</div>
          </div>

          <div className="stat-card-hover" style={styles.statCard}>
            <div style={styles.statIcon}>⭐</div>
            <div className="stat-value" style={styles.statValue}>{stats.averageScore}%</div>
            <div style={styles.statLabel}>Average Score</div>
          </div>

          <div className="stat-card-hover" style={styles.statCard}>
            <div style={styles.statIcon}>🏆</div>
            <div className="stat-value" style={styles.statValue}>{stats.bestScore}%</div>
            <div style={styles.statLabel}>Best Score</div>
          </div>

          <div className="stat-card-hover" style={styles.statCard}>
            <div style={styles.statIcon}>✨</div>
            <div className="stat-value" style={styles.statValue}>{stats.totalPoints}</div>
            <div style={styles.statLabel}>Total Points</div>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>
              <span>📝</span>
              <span>Quiz History</span>
              <span style={{ fontSize: "0.85rem", color: "var(--theme-text-light)" }}>
                ({results.length} unique {results.length === 1 ? 'quiz' : 'quizzes'})
              </span>
            </div>
            <button 
              className="refresh-button-hover"
              style={styles.refreshButton}
              onClick={handleRefresh}
            >
              🔄 Refresh
            </button>
          </div>

          {results.length > 0 ? (
            <div style={styles.resultsGrid}>
              {results.map((result, index) => (
                <div
                  key={`${result.quizId}-${index}`}
                  className="result-card-hover"
                  style={styles.resultCard}
                  onClick={() => navigate(`/quiz/${result.quizId}/results`)}
                >
                  <div style={styles.resultHeader}>
                    <div style={styles.quizTitle}>
                      {result.quiz || `Quiz ${index + 1}`}
                    </div>
                    <div
                      style={{
                        ...styles.scoreBadge,
                        background: `${getScoreColor(result.score)}20`,
                        color: getScoreColor(result.score),
                      }}
                    >
                      {getScoreEmoji(result.score)} {result.score}%
                    </div>
                  </div>

                  <div style={styles.resultDetails}>
                    <div style={styles.scoreBar}>
                      <div
                        style={{
                          ...styles.scoreFill,
                          width: `${result.score}%`,
                          background: getScoreColor(result.score),
                        }}
                      />
                    </div>
                    <div
                      style={{
                        ...styles.grade,
                        background: `${getScoreColor(result.score)}20`,
                        color: getScoreColor(result.score),
                      }}
                    >
                      {getGrade(result.score)}
                    </div>
                  </div>

                  {result.completedAt && (
                    <div
                      style={{
                        marginTop: "0.75rem",
                        fontSize: "0.75rem",
                        color: "var(--theme-text-light)",
                      }}
                    >
                      Completed: {new Date(result.completedAt).toLocaleDateString()} at{" "}
                      {new Date(result.completedAt).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🎮</div>
              <div style={styles.emptyTitle}>No quizzes attempted yet</div>
              <div style={styles.emptyText}>
                Start your quiz journey by taking your first quiz!
              </div>
              <button
                onClick={() => navigate("/")}
                style={styles.takeQuizButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--theme-shadow-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                🚀 Take a Quiz
              </button>
            </div>
          )}
        </div>

        {/* Performance Insights */}
        {results.length > 0 && (
          <div style={styles.insightCard}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.2rem" }}>💡</span>
              <span style={{ fontWeight: "600", color: "var(--theme-text)" }}>Performance Insight</span>
            </div>
            <p style={{ color: "var(--theme-text-light)", fontSize: "0.9rem", lineHeight: "1.6" }}>
              {stats.quizzesTaken === 1 
                ? "🎉 Great start! You've completed your first quiz. Keep going to build your knowledge and improve your scores!"
                : stats.averageScore >= 70
                ? "🌟 Excellent work! You're performing exceptionally well. Keep challenging yourself with harder quizzes to reach new heights!"
                : stats.averageScore >= 50
                ? "📈 Good progress! With a bit more practice, you'll reach the top. Focus on areas where you scored lower and review the answers."
                : "💪 Keep practicing! Every quiz is a step toward improvement. Review your answers, learn from mistakes, and try again. You've got this!"}
            </p>
            {stats.bestScore === 100 && (
              <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(16, 185, 129, 0.1)", borderRadius: "12px", borderLeft: `3px solid #10b981` }}>
                <span style={{ fontSize: "0.85rem", color: "#10b981" }}>🏆 Perfect Score Achieved! You're a quiz master!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;