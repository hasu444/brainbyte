import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, getUsername, logout, isAdmin } from "../services/auth";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const styles = {
    navbar: {
      background: "var(--theme-surface)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(108, 92, 231, 0.2)",
      padding: "0.75rem 2rem",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      transition: "all 0.3s ease",
      boxShadow: "0 2px 10px var(--theme-shadow)",
    },
    navbarContainer: {
      maxWidth: "1400px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem",
    },
    brandLink: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
    },
    navLinksContainer: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      flexWrap: "wrap",
    },
    link: {
      color: "var(--theme-text-light)",
      textDecoration: "none",
      fontWeight: "500",
      padding: "0.5rem 0",
      transition: "all 0.3s ease",
      position: "relative",
      fontSize: "0.95rem",
    },
    linkActive: {
      color: "var(--theme-primary)",
    },
    welcomeText: {
      color: "var(--theme-text-light)",
      fontSize: "0.9rem",
      marginRight: "0.5rem",
    },
    username: {
      color: "var(--theme-primary)",
      fontWeight: "600",
    },
    btnSecondary: {
      background: "rgba(108, 92, 231, 0.15)",
      border: "1px solid rgba(108, 92, 231, 0.3)",
      color: "var(--theme-primary)",
      padding: "0.5rem 1.25rem",
      borderRadius: "50px",
      fontWeight: "500",
      fontSize: "0.85rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    btnPrimary: {
      background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
      border: "none",
      color: "white",
      padding: "0.5rem 1.25rem",
      borderRadius: "50px",
      fontWeight: "500",
      fontSize: "0.85rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    btnAdmin: {
      background: "rgba(236, 72, 153, 0.15)",
      border: "1px solid rgba(236, 72, 153, 0.3)",
      color: "#ec489a",
      padding: "0.5rem 1.25rem",
      borderRadius: "50px",
      fontWeight: "500",
      fontSize: "0.85rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    btnAddQuiz: {
      background: "linear-gradient(135deg, #f59e0b, #ef4444)",
      border: "none",
      color: "white",
      padding: "0.5rem 1.25rem",
      borderRadius: "50px",
      fontWeight: "600",
      fontSize: "0.85rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    divider: {
      width: "1px",
      height: "30px",
      background: "rgba(108, 92, 231, 0.2)",
      margin: "0 0.5rem",
    },
    mobileMenuButton: {
      display: "none",
      background: "rgba(108, 92, 231, 0.15)",
      border: "none",
      borderRadius: "8px",
      padding: "0.5rem",
      cursor: "pointer",
      color: "var(--theme-text)",
    },
    mobileNavLinks: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      padding: "1rem 0",
      gap: "1rem",
    },
  };

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  // Add responsive styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @media (max-width: 768px) {
        .desktop-nav {
          display: none !important;
        }
        .mobile-menu-btn {
          display: flex !important;
        }
        .mobile-nav-open {
          display: flex !important;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarContainer}>
        {/* Logo/Brand */}
        <Link to="/" style={styles.brandLink}>
          <Logo />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          style={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={styles.navLinksContainer}>
          <div style={styles.navLinks}>
            {isAuthenticated() ? (
              <>
                {/* Welcome Message */}
                <span style={styles.welcomeText}>
                  👋 Welcome, <span style={styles.username}>{getUsername()}</span>
                </span>

                <div style={styles.divider} />

                {/* Quizzes Link */}
                <Link
                  to="/"
                  style={{
                    ...styles.link,
                    ...(isLinkActive("/") ? styles.linkActive : {}),
                  }}
                >
                  🎮 Quizzes
                </Link>

                {/* Dashboard Link */}
                <Link
                  to="/dashboard"
                  style={{
                    ...styles.link,
                    ...(isLinkActive("/dashboard") ? styles.linkActive : {}),
                  }}
                >
                  📊 Dashboard
                </Link>

                {/* Admin Panel (if admin) */}
                {isAdmin() && (
                  <>
                    <Link
                      to="/admin"
                      style={{
                        ...styles.btnAdmin,
                        ...(isLinkActive("/admin") ? { background: "rgba(236, 72, 153, 0.25)" } : {}),
                      }}
                    >
                      ⚙️ Admin Panel
                    </Link>

                    <Link
                      to="/admin/add-quiz"
                      style={styles.btnAddQuiz}
                    >
                      ✨ Add Quiz
                    </Link>
                  </>
                )}

                {/* Logout Button */}
                <button
                  style={styles.btnSecondary}
                  onClick={handleLogout}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                {/* Login Link */}
                <Link
                  to="/login"
                  style={{
                    ...styles.btnSecondary,
                    ...(isLinkActive("/login") ? { background: "rgba(108, 92, 231, 0.25)" } : {}),
                  }}
                >
                  🔑 Login
                </Link>

                {/* Register Link */}
                <Link
                  to="/register"
                  style={styles.btnPrimary}
                >
                  ✨ Register
                </Link>
              </>
            )}
          </div>
          
          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-open" style={styles.mobileNavLinks}>
            {isAuthenticated() ? (
              <>
                <span style={styles.welcomeText}>
                  👋 Welcome, <span style={styles.username}>{getUsername()}</span>
                </span>

                <Link
                  to="/"
                  style={{
                    ...styles.btnSecondary,
                    justifyContent: "center",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🎮 Quizzes
                </Link>

                <Link
                  to="/dashboard"
                  style={{
                    ...styles.btnSecondary,
                    justifyContent: "center",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📊 Dashboard
                </Link>

                {isAdmin() && (
                  <>
                    <Link
                      to="/admin"
                      style={{
                        ...styles.btnAdmin,
                        justifyContent: "center",
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      ⚙️ Admin Panel
                    </Link>

                    <Link
                      to="/admin/add-quiz"
                      style={{
                        ...styles.btnAddQuiz,
                        justifyContent: "center",
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      ✨ Add Quiz
                    </Link>
                  </>
                )}

                <button
                  style={{
                    ...styles.btnSecondary,
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    ...styles.btnSecondary,
                    justifyContent: "center",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🔑 Login
                </Link>

                <Link
                  to="/register"
                  style={{
                    ...styles.btnPrimary,
                    justifyContent: "center",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ✨ Register
                </Link>
              </>
            )}
            
            {/* Theme Switcher for Mobile */}
            <div style={{ marginTop: "0.5rem" }}>
              <ThemeSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;