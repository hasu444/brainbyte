import React from 'react';
import { useTheme, themes } from '../context/ThemeContext';

function ThemeSwitcher() {
  const { currentTheme, changeTheme, isThemeMenuOpen, toggleThemeMenu, setIsThemeMenuOpen } = useTheme();

  const styles = {
    themeButton: {
      background: 'rgba(108, 92, 231, 0.1)',
      border: '1px solid var(--theme-primary)',
      borderRadius: '40px',
      padding: '0.45rem 0.9rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      transition: 'all 0.3s ease',
      fontSize: '0.8rem',
      fontWeight: '500',
      color: 'var(--theme-text)',
      backdropFilter: 'blur(8px)',
    },
    dropdown: {
      position: 'absolute',
      top: '50px',
      right: '0',
      background: 'var(--theme-surface)',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
      padding: '1rem',
      zIndex: 1000,
      width: '280px',
      border: '1px solid var(--theme-border)',
      animation: 'fadeInDown 0.2s ease',
    },
    themeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.6rem',
      marginTop: '0.75rem',
      maxHeight: '380px',
      overflowY: 'auto',
      paddingRight: '0.25rem',
    },
    themeOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      padding: '0.6rem',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid transparent',
    },
    themePreview: {
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      background: 'var(--preview-gradient)',
      flexShrink: 0,
    },
    themeInfo: {
      flex: 1,
      minWidth: 0,
    },
    themeName: {
      fontSize: '0.8rem',
      fontWeight: '600',
      color: 'var(--theme-text)',
      marginBottom: '0.15rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    themeType: {
      fontSize: '0.6rem',
      padding: '0.1rem 0.3rem',
      borderRadius: '4px',
      background: 'rgba(0, 0, 0, 0.05)',
      color: 'var(--theme-text-light)',
    },
    activeBadge: {
      fontSize: '0.6rem',
      color: '#10b981',
      fontWeight: '500',
    },
    dropdownHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid var(--theme-border)',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1rem',
      cursor: 'pointer',
      color: 'var(--theme-text-light)',
      transition: 'all 0.2s ease',
      padding: '0.2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
    },
    themeCount: {
      fontSize: '0.7rem',
      color: 'var(--theme-text-light)',
      marginTop: '0.5rem',
      textAlign: 'center',
      paddingTop: '0.5rem',
      borderTop: '1px solid var(--theme-border)',
    },
  };

  // Add animation keyframes
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .theme-option:hover {
        transform: translateX(2px);
        background: var(--theme-glass-bg);
        border-color: var(--theme-primary);
      }
      
      .theme-scroll::-webkit-scrollbar {
        width: 4px;
      }
      
      .theme-scroll::-webkit-scrollbar-track {
        background: var(--theme-border);
        border-radius: 4px;
      }
      
      .theme-scroll::-webkit-scrollbar-thumb {
        background: var(--theme-primary);
        border-radius: 4px;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isThemeMenuOpen && !event.target.closest('.theme-switcher')) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isThemeMenuOpen, setIsThemeMenuOpen]);

  const getThemePreview = (theme) => {
    return `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`;
  };

  const getThemeType = (theme) => {
    // Check if it's a dark theme based on background color
    const bgColor = theme.colors.background;
    if (bgColor.includes('0f0f1e') || bgColor.includes('1a1a2e') || bgColor.includes('0a0c15')) {
      return 'Dark';
    }
    return 'Light';
  };

  return (
    <div className="theme-switcher" style={{ position: 'relative' }}>
      <button
        style={styles.themeButton}
        onClick={toggleThemeMenu}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = 'var(--theme-shadow-sm)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <span>{currentTheme.icon}</span>
        <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {currentTheme.name}
        </span>
        <span>🎨</span>
      </button>

      {isThemeMenuOpen && (
        <div style={styles.dropdown}>
          <div style={styles.dropdownHeader}>
            <div>
              <strong style={{ color: 'var(--theme-text)', fontSize: '0.95rem' }}>Themes</strong>
            </div>
            <button 
              style={styles.closeButton} 
              onClick={() => setIsThemeMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
                e.currentTarget.style.color = 'var(--theme-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--theme-text-light)';
              }}
            >
              ✕
            </button>
          </div>
          
          <div className="theme-scroll" style={styles.themeGrid}>
            {Object.values(themes).map((theme) => {
              const isActive = currentTheme.id === theme.id;
              const themeType = getThemeType(theme);
              
              return (
                <div
                  key={theme.id}
                  className="theme-option"
                  style={{
                    ...styles.themeOption,
                    background: isActive ? 'var(--theme-glass-bg)' : 'transparent',
                    borderColor: isActive ? 'var(--theme-primary)' : 'transparent',
                  }}
                  onClick={() => changeTheme(theme.id)}
                >
                  <div
                    style={{
                      ...styles.themePreview,
                      '--preview-gradient': getThemePreview(theme),
                    }}
                  />
                  <div style={styles.themeInfo}>
                    <div style={styles.themeName}>
                      {theme.name}
                      <span style={styles.themeType}>{themeType}</span>
                    </div>
                    {isActive && (
                      <div style={styles.activeBadge}>
                        ✓ Active
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '0.9rem' }}>{theme.icon}</span>
                </div>
              );
            })}
          </div>
          
          <div style={styles.themeCount}>
            {Object.values(themes).length} themes available
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSwitcher;