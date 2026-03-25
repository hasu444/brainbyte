import React, { useEffect, useState } from "react";
import { getQuizzes } from "../services/api";
import QuizCard from "../components/QuizCard";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        console.log("Quizzes:", data);
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // Dynamic styles that use theme variables
  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      background: "var(--theme-gradient-background)",
      padding: "2rem 1rem",
      fontFamily: "'Poppins', 'Segoe UI', system-ui, -apple-system, sans-serif",
      transition: "background 0.3s ease",
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
      position: "relative",
      animation: "fadeInUp 0.6s ease",
    },
    title: {
      fontSize: "3.5rem",
      fontWeight: "800",
      background: "var(--theme-gradient-primary)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow: "var(--theme-shadow-glow)",
      marginBottom: "0.5rem",
      letterSpacing: "-0.5px",
      position: "relative",
      display: "inline-block",
    },
    titleIcon: {
      fontSize: "3rem",
      marginRight: "0.5rem",
      display: "inline-block",
      animation: "float 3s ease-in-out infinite",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "var(--theme-text-light)",
      fontWeight: "500",
      borderBottom: `2px solid var(--theme-primary)`,
      display: "inline-block",
      paddingBottom: "0.5rem",
    },
    statsBar: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      marginBottom: "3rem",
      flexWrap: "wrap",
      animation: "slideInLeft 0.6s ease",
    },
    statCard: {
      background: "var(--theme-glass-bg)",
      backdropFilter: `blur(var(--theme-glass-blur))`,
      borderRadius: "20px",
      padding: "0.75rem 1.5rem",
      textAlign: "center",
      border: "1px solid var(--theme-glass-border)",
      boxShadow: "var(--theme-shadow-sm)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    statNumber: {
      fontSize: "2rem",
      fontWeight: "bold",
      background: "var(--theme-gradient-primary)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: 1,
      transition: "transform 0.3s ease",
      display: "inline-block",
    },
    statLabel: {
      fontSize: "0.85rem",
      color: "var(--theme-text-light)",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginTop: "0.25rem",
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      flexDirection: "column",
      gap: "1rem",
    },
    spinner: {
      width: "60px",
      height: "60px",
      border: `3px solid ${currentTheme.colors.primary}20`,
      borderTop: `3px solid var(--theme-primary)`,
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "2rem",
      marginTop: "2rem",
      animation: "fadeInUp 0.8s ease",
    },
    emptyState: {
      textAlign: "center",
      padding: "4rem 2rem",
      background: "var(--theme-glass-bg)",
      backdropFilter: `blur(var(--theme-glass-blur))`,
      borderRadius: "40px",
      border: "1px solid var(--theme-glass-border)",
      animation: "fadeInUp 0.6s ease",
    },
    emptyTitle: {
      fontSize: "1.8rem",
      background: "var(--theme-gradient-primary)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "1rem",
    },
    emptyText: {
      color: "var(--theme-text-light)",
      fontSize: "1rem",
    },
    refreshButton: {
      marginTop: "2rem",
      padding: "0.75rem 1.5rem",
      background: "var(--theme-gradient-primary)",
      border: "none",
      borderRadius: "50px",
      color: "white",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  };

  // Get dynamic title based on theme
  const getTitleIcon = () => {
    switch(currentTheme.id) {
      case 'pastelDream':
        return '🌸';
      case 'mintFresh':
        return '🌿';
      case 'lavenderHaze':
        return '💜';
      case 'oceanBreeze':
        return '🌊';
      case 'sunsetGlow':
        return '🌅';
      case 'midnightGalaxy':
        return '🌌';
      case 'cherryBlossom':
        return '🌸';
      case 'forest':
        return '🌲';
      default:
        return '🎮';
    }
  };

  const getSubtitleText = () => {
    switch(currentTheme.id) {
      case 'pastelDream':
        return 'Dream • Play • Learn';
      case 'mintFresh':
        return 'Fresh • Fun • Knowledge';
      case 'lavenderHaze':
        return 'Calm • Focus • Achieve';
      case 'oceanBreeze':
        return 'Flow • Think • Succeed';
      case 'sunsetGlow':
        return 'Glow • Grow • Know';
      case 'midnightGalaxy':
        return 'Explore • Discover • Conquer';
      case 'cherryBlossom':
        return 'Bloom • Learn • Thrive';
      case 'forest':
        return 'Grow • Learn • Flourish';
      default:
        return 'Challenge Your Mind • Beat the Clock';
    }
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
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
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
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
      .quiz-card-hover {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
        animation: fadeInUp 0.5s ease backwards;
      }
      .quiz-card-hover:nth-child(1) { animation-delay: 0.05s; }
      .quiz-card-hover:nth-child(2) { animation-delay: 0.1s; }
      .quiz-card-hover:nth-child(3) { animation-delay: 0.15s; }
      .quiz-card-hover:nth-child(4) { animation-delay: 0.2s; }
      .quiz-card-hover:nth-child(5) { animation-delay: 0.25s; }
      .quiz-card-hover:nth-child(6) { animation-delay: 0.3s; }
      .quiz-card-hover:hover {
        transform: translateY(-8px);
        box-shadow: var(--theme-shadow-xl);
      }
      .stat-card-hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .stat-card-hover:hover {
        transform: translateY(-4px);
        border-color: var(--theme-primary);
        box-shadow: var(--theme-shadow-md);
      }
      .stat-card-hover:hover .stat-number {
        transform: scale(1.1);
      }
      .stat-number {
        transition: transform 0.3s ease;
      }
      .refresh-button-hover:hover {
        transform: translateY(-2px);
        box-shadow: var(--theme-shadow-glow);
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Handle refresh
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await getQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={{ color: "var(--theme-text-light)" }}>Loading exciting quizzes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <div>
            <span style={styles.titleIcon}>{getTitleIcon()}</span>
            <h1 style={styles.title}>
              {currentTheme.id === 'midnightGalaxy' ? 'QUIZ GALAXY' : 'QUIZ ARENA'}
            </h1>
          </div>
          <div style={styles.subtitle}>{getSubtitleText()}</div>
        </div>

        {/* Stats Bar */}
        <div style={styles.statsBar}>
          <div className="stat-card-hover" style={styles.statCard}>
            <div className="stat-number" style={styles.statNumber}>{quizzes.length}</div>
            <div style={styles.statLabel}>Available Quizzes</div>
          </div>
          <div className="stat-card-hover" style={styles.statCard}>
            <div className="stat-number" style={styles.statNumber}>🏆</div>
            <div style={styles.statLabel}>Leaderboard Active</div>
          </div>
          <div className="stat-card-hover" style={styles.statCard}>
            <div className="stat-number" style={styles.statNumber}>⚡</div>
            <div style={styles.statLabel}>Play & Earn XP</div>
          </div>
        </div>

        {/* Quiz Grid */}
        {quizzes.length > 0 ? (
          <div style={styles.grid}>
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-card-hover">
                <QuizCard quiz={quiz} />
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyTitle}>
              {currentTheme.icon} No Quizzes Yet {currentTheme.icon}
            </div>
            <div style={styles.emptyText}>
              {currentTheme.id === 'midnightGalaxy' 
                ? 'The galaxy is being populated with new challenges. Prepare for takeoff!' 
                : 'New challenges are being prepared. Check back soon!'}
            </div>
            <button 
              className="refresh-button-hover"
              style={styles.refreshButton}
              onClick={handleRefresh}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "var(--theme-shadow-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              🔄 Refresh
            </button>
          </div>
        )}

        {/* Motivational Message for Active Users */}
        {quizzes.length > 0 && quizzes.length > 5 && (
          <div style={{
            marginTop: "3rem",
            textAlign: "center",
            padding: "1rem",
            background: "var(--theme-glass-bg)",
            backdropFilter: `blur(var(--theme-glass-blur))`,
            borderRadius: "20px",
            border: "1px solid var(--theme-glass-border)",
          }}>
            <p style={{ color: "var(--theme-text-light)", fontSize: "0.9rem" }}>
              {currentTheme.id === 'midnightGalaxy' 
                ? `✨ ${quizzes.length} quizzes available in the galaxy. Ready to explore? ✨`
                : `🎯 ${quizzes.length} quizzes waiting for you. Pick one and start your journey! 🎯`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;