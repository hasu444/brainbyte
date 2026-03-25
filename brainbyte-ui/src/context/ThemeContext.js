import React, { createContext, useState, useContext, useEffect } from 'react';

// Define all available themes with perfect contrast
export const themes = {
  // 🌸 LIGHT THEMES
  pastelDream: {
    id: 'pastelDream',
    name: 'Pastel Dream',
    icon: '🌸',
    description: 'Soft pastel colors',
    type: 'light',
    colors: {
      primary: '#b8b5ff',
      primaryDark: '#9b96e6',
      secondary: '#d9b8ff',
      secondaryDark: '#c49bff',
      accent: '#ffb8d9',
      background: '#faf8ff',
      surface: '#ffffff',
      text: '#4a4a6a',
      textLight: '#8a8aaa',
      textDark: '#2a2a4a',
      border: 'rgba(184, 181, 255, 0.2)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #b8b5ff 0%, #d9b8ff 100%)',
      secondary: 'linear-gradient(135deg, #ffb8d9 0%, #ff9bc9 100%)',
      background: 'linear-gradient(135deg, #faf8ff 0%, #fff5fa 100%)',
      card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(184, 181, 255, 0.1)',
      md: '0 4px 16px rgba(184, 181, 255, 0.15)',
      lg: '0 8px 24px rgba(184, 181, 255, 0.2)',
      xl: '0 12px 32px rgba(184, 181, 255, 0.25)',
      glow: '0 0 20px rgba(184, 181, 255, 0.2)',
    },
    glassmorphism: {
      background: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(184, 181, 255, 0.2)',
      blur: '12px',
    },
  },

  mintFresh: {
    id: 'mintFresh',
    name: 'Mint Fresh',
    icon: '🌿',
    description: 'Cool mint tones',
    type: 'light',
    colors: {
      primary: '#6fbf8c',
      primaryDark: '#5aa87a',
      secondary: '#9fd3b8',
      secondaryDark: '#8ac4a5',
      accent: '#ffb77c',
      background: '#f0f9f0',
      surface: '#ffffff',
      text: '#2d5a3b',
      textLight: '#6b8c6f',
      textDark: '#1e3a2a',
      border: 'rgba(111, 191, 140, 0.2)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #6fbf8c 0%, #9fd3b8 100%)',
      secondary: 'linear-gradient(135deg, #ffb77c 0%, #ffa55a 100%)',
      background: 'linear-gradient(135deg, #f0f9f0 0%, #e8f5e9 100%)',
      card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(111, 191, 140, 0.1)',
      md: '0 4px 16px rgba(111, 191, 140, 0.15)',
      lg: '0 8px 24px rgba(111, 191, 140, 0.2)',
      xl: '0 12px 32px rgba(111, 191, 140, 0.25)',
      glow: '0 0 20px rgba(111, 191, 140, 0.2)',
    },
    glassmorphism: {
      background: 'rgba(255, 255, 255, 0.75)',
      border: 'rgba(111, 191, 140, 0.2)',
      blur: '12px',
    },
  },

  lavenderHaze: {
    id: 'lavenderHaze',
    name: 'Lavender Haze',
    icon: '💜',
    description: 'Calming lavender',
    type: 'light',
    colors: {
      primary: '#a594f9',
      primaryDark: '#8e79e6',
      secondary: '#cdb4ff',
      secondaryDark: '#b89eff',
      accent: '#ffb4b4',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#5e4b8b',
      textLight: '#8e7ab3',
      textDark: '#3e2e6b',
      border: 'rgba(165, 148, 249, 0.2)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #a594f9 0%, #cdb4ff 100%)',
      secondary: 'linear-gradient(135deg, #ffb4b4 0%, #ff9a9a 100%)',
      background: 'linear-gradient(135deg, #faf5ff 0%, #f5ebff 100%)',
      card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(165, 148, 249, 0.1)',
      md: '0 4px 16px rgba(165, 148, 249, 0.15)',
      lg: '0 8px 24px rgba(165, 148, 249, 0.2)',
      xl: '0 12px 32px rgba(165, 148, 249, 0.25)',
      glow: '0 0 20px rgba(165, 148, 249, 0.2)',
    },
    glassmorphism: {
      background: 'rgba(255, 255, 255, 0.72)',
      border: 'rgba(165, 148, 249, 0.2)',
      blur: '12px',
    },
  },

  oceanBreeze: {
    id: 'oceanBreeze',
    name: 'Ocean Breeze',
    icon: '🌊',
    description: 'Cool ocean blues',
    type: 'light',
    colors: {
      primary: '#5dade2',
      primaryDark: '#4a8ec9',
      secondary: '#85c1e9',
      secondaryDark: '#6ab0e3',
      accent: '#f7dc6f',
      background: '#f0f8ff',
      surface: '#ffffff',
      text: '#2c5282',
      textLight: '#5a7fa8',
      textDark: '#1e3a6b',
      border: 'rgba(93, 173, 226, 0.2)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #5dade2 0%, #85c1e9 100%)',
      secondary: 'linear-gradient(135deg, #f7dc6f 0%, #f5d042 100%)',
      background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)',
      card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(93, 173, 226, 0.1)',
      md: '0 4px 16px rgba(93, 173, 226, 0.15)',
      lg: '0 8px 24px rgba(93, 173, 226, 0.2)',
      xl: '0 12px 32px rgba(93, 173, 226, 0.25)',
      glow: '0 0 20px rgba(93, 173, 226, 0.2)',
    },
    glassmorphism: {
      background: 'rgba(255, 255, 255, 0.78)',
      border: 'rgba(93, 173, 226, 0.2)',
      blur: '12px',
    },
  },

  peachBlossom: {
    id: 'peachBlossom',
    name: 'Peach Blossom',
    icon: '🍑',
    description: 'Warm peach tones',
    type: 'light',
    colors: {
      primary: '#ffb78c',
      primaryDark: '#ffa570',
      secondary: '#ffd49c',
      secondaryDark: '#ffc88a',
      accent: '#ff9f8c',
      background: '#fffaf5',
      surface: '#ffffff',
      text: '#b85c3a',
      textLight: '#d88c6a',
      textDark: '#9a4020',
      border: 'rgba(255, 183, 140, 0.2)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ffb78c 0%, #ffd49c 100%)',
      secondary: 'linear-gradient(135deg, #ff9f8c 0%, #ff8c7a 100%)',
      background: 'linear-gradient(135deg, #fffaf5 0%, #fff5ea 100%)',
      card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(255, 183, 140, 0.1)',
      md: '0 4px 16px rgba(255, 183, 140, 0.15)',
      lg: '0 8px 24px rgba(255, 183, 140, 0.2)',
      xl: '0 12px 32px rgba(255, 183, 140, 0.25)',
      glow: '0 0 20px rgba(255, 183, 140, 0.2)',
    },
    glassmorphism: {
      background: 'rgba(255, 255, 255, 0.75)',
      border: 'rgba(255, 183, 140, 0.2)',
      blur: '12px',
    },
  },

  cherryBlossom: {
    id: 'cherryBlossom',
    name: 'Cherry Blossom',
    icon: '🌸',
    description: 'Delicate pink',
    type: 'light',
    colors: {
      primary: '#ff9eb5',
      primaryDark: '#ff85a0',
      secondary: '#ffb8d9',
      secondaryDark: '#ff9bc9',
      accent: '#c5a3ff',
      background: '#fff9fb',
      surface: '#ffffff',
      text: '#b85c7a',
      textLight: '#d88c9a',
      textDark: '#9a4060',
      border: 'rgba(255, 158, 181, 0.2)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ff9eb5 0%, #ffb8d9 100%)',
      secondary: 'linear-gradient(135deg, #c5a3ff 0%, #b58aff 100%)',
      background: 'linear-gradient(135deg, #fff9fb 0%, #fff2f7 100%)',
      card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(255, 158, 181, 0.1)',
      md: '0 4px 16px rgba(255, 158, 181, 0.15)',
      lg: '0 8px 24px rgba(255, 158, 181, 0.2)',
      xl: '0 12px 32px rgba(255, 158, 181, 0.25)',
      glow: '0 0 20px rgba(255, 158, 181, 0.2)',
    },
    glassmorphism: {
      background: 'rgba(255, 255, 255, 0.75)',
      border: 'rgba(255, 158, 181, 0.2)',
      blur: '12px',
    },
  },

  // 🌙 DARK THEMES
  midnightGalaxy: {
    id: 'midnightGalaxy',
    name: 'Midnight Galaxy',
    icon: '🌌',
    description: 'Deep space theme',
    type: 'dark',
    colors: {
      primary: '#8b5cf6',
      primaryDark: '#7c3aed',
      secondary: '#a78bfa',
      secondaryDark: '#8b5cf6',
      accent: '#ec489a',
      background: '#0f0f1a',
      surface: '#1a1a2a',
      text: '#e2e8f0',
      textLight: '#94a3b8',
      textDark: '#cbd5e1',
      border: 'rgba(139, 92, 246, 0.3)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
      secondary: 'linear-gradient(135deg, #ec489a 0%, #db2777 100%)',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2a 100%)',
      card: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
      xl: '0 12px 32px rgba(0, 0, 0, 0.6)',
      glow: '0 0 20px rgba(139, 92, 246, 0.4)',
    },
    glassmorphism: {
      background: 'rgba(26, 26, 46, 0.8)',
      border: 'rgba(139, 92, 246, 0.3)',
      blur: '12px',
    },
  },

  forestNight: {
    id: 'forestNight',
    name: 'Forest Night',
    icon: '🌲',
    description: 'Deep forest theme',
    type: 'dark',
    colors: {
      primary: '#2d6a4f',
      primaryDark: '#1f543d',
      secondary: '#40916c',
      secondaryDark: '#2d6a4f',
      accent: '#d4a373',
      background: '#0a1a0f',
      surface: '#1a2a1a',
      text: '#e2e8f0',
      textLight: '#94a3b8',
      textDark: '#cbd5e1',
      border: 'rgba(45, 106, 79, 0.3)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #2d6a4f 0%, #40916c 100%)',
      secondary: 'linear-gradient(135deg, #d4a373 0%, #c58a5d 100%)',
      background: 'linear-gradient(135deg, #0a1a0f 0%, #1a2a1a 100%)',
      card: 'linear-gradient(135deg, rgba(26, 42, 26, 0.95) 0%, rgba(26, 42, 26, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
      xl: '0 12px 32px rgba(0, 0, 0, 0.6)',
      glow: '0 0 20px rgba(45, 106, 79, 0.4)',
    },
    glassmorphism: {
      background: 'rgba(26, 42, 26, 0.8)',
      border: 'rgba(45, 106, 79, 0.3)',
      blur: '12px',
    },
  },

  sunsetDusk: {
    id: 'sunsetDusk',
    name: 'Sunset Dusk',
    icon: '🌅',
    description: 'Warm sunset theme',
    type: 'dark',
    colors: {
      primary: '#ff8c8c',
      primaryDark: '#ff7070',
      secondary: '#ffb88c',
      secondaryDark: '#ffa570',
      accent: '#ffd68c',
      background: '#1a0f0f',
      surface: '#2a1a1a',
      text: '#f5e6d3',
      textLight: '#c9b6a0',
      textDark: '#e5d5c0',
      border: 'rgba(255, 140, 140, 0.3)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ff8c8c 0%, #ffb88c 100%)',
      secondary: 'linear-gradient(135deg, #ffd68c 0%, #ffcb70 100%)',
      background: 'linear-gradient(135deg, #1a0f0f 0%, #2a1a1a 100%)',
      card: 'linear-gradient(135deg, rgba(42, 26, 26, 0.95) 0%, rgba(42, 26, 26, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
      xl: '0 12px 32px rgba(0, 0, 0, 0.6)',
      glow: '0 0 20px rgba(255, 140, 140, 0.3)',
    },
    glassmorphism: {
      background: 'rgba(42, 26, 26, 0.8)',
      border: 'rgba(255, 140, 140, 0.3)',
      blur: '12px',
    },
  },

  oceanDeep: {
    id: 'oceanDeep',
    name: 'Ocean Deep',
    icon: '🌊',
    description: 'Deep ocean theme',
    type: 'dark',
    colors: {
      primary: '#3b82f6',
      primaryDark: '#2563eb',
      secondary: '#60a5fa',
      secondaryDark: '#3b82f6',
      accent: '#06b6d4',
      background: '#0a1a2a',
      surface: '#1a2a3a',
      text: '#e0f2fe',
      textLight: '#7dd3fc',
      textDark: '#bae6fd',
      border: 'rgba(59, 130, 246, 0.3)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
      secondary: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      background: 'linear-gradient(135deg, #0a1a2a 0%, #1a2a3a 100%)',
      card: 'linear-gradient(135deg, rgba(26, 42, 58, 0.95) 0%, rgba(26, 42, 58, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
      xl: '0 12px 32px rgba(0, 0, 0, 0.6)',
      glow: '0 0 20px rgba(59, 130, 246, 0.4)',
    },
    glassmorphism: {
      background: 'rgba(26, 42, 58, 0.8)',
      border: 'rgba(59, 130, 246, 0.3)',
      blur: '12px',
    },
  },

  royalPurple: {
    id: 'royalPurple',
    name: 'Royal Purple',
    icon: '👑',
    description: 'Elegant purple theme',
    type: 'dark',
    colors: {
      primary: '#a855f7',
      primaryDark: '#9333ea',
      secondary: '#c084fc',
      secondaryDark: '#a855f7',
      accent: '#f472b6',
      background: '#0f0a1a',
      surface: '#1f1a2a',
      text: '#f3e8ff',
      textLight: '#d8b4fe',
      textDark: '#e9d5ff',
      border: 'rgba(168, 85, 247, 0.3)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
      secondary: 'linear-gradient(135deg, #f472b6 0%, #ec489a 100%)',
      background: 'linear-gradient(135deg, #0f0a1a 0%, #1f1a2a 100%)',
      card: 'linear-gradient(135deg, rgba(31, 26, 42, 0.95) 0%, rgba(31, 26, 42, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
      xl: '0 12px 32px rgba(0, 0, 0, 0.6)',
      glow: '0 0 20px rgba(168, 85, 247, 0.4)',
    },
    glassmorphism: {
      background: 'rgba(31, 26, 42, 0.8)',
      border: 'rgba(168, 85, 247, 0.3)',
      blur: '12px',
    },
  },

  charcoal: {
    id: 'charcoal',
    name: 'Charcoal',
    icon: '🖤',
    description: 'Sleek dark theme',
    type: 'dark',
    colors: {
      primary: '#6b7280',
      primaryDark: '#4b5563',
      secondary: '#9ca3af',
      secondaryDark: '#6b7280',
      accent: '#f59e0b',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textLight: '#9ca3af',
      textDark: '#e5e7eb',
      border: 'rgba(107, 114, 128, 0.3)',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
      secondary: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
      card: 'linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
    },
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.4)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
      xl: '0 12px 32px rgba(0, 0, 0, 0.6)',
      glow: '0 0 20px rgba(107, 114, 128, 0.3)',
    },
    glassmorphism: {
      background: 'rgba(31, 41, 55, 0.8)',
      border: 'rgba(107, 114, 128, 0.3)',
      blur: '12px',
    },
  },
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('quizTheme');
      if (savedTheme && themes[savedTheme]) {
        return themes[savedTheme];
      }
      return themes.pastelDream;
    } catch (error) {
      console.error('Error loading theme:', error);
      return themes.pastelDream;
    }
  });

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  // Apply complete theme to CSS variables
  useEffect(() => {
    try {
      const root = document.documentElement;
      const theme = currentTheme;
      
      // Apply all color variables
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
      });
      
      // Apply gradient variables
      Object.entries(theme.gradients).forEach(([key, value]) => {
        root.style.setProperty(`--theme-gradient-${key}`, value);
      });
      
      // Apply shadow variables
      Object.entries(theme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--theme-shadow-${key}`, value);
      });
      
      // Apply glassmorphism variables
      Object.entries(theme.glassmorphism).forEach(([key, value]) => {
        root.style.setProperty(`--theme-glass-${key}`, value);
      });
      
      // Apply body background and text color
      document.body.style.background = theme.gradients.background;
      document.body.style.color = theme.colors.text;
      
      // Save to localStorage
      localStorage.setItem('quizTheme', theme.id);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [currentTheme]);

  const changeTheme = (themeId) => {
    try {
      if (themes[themeId]) {
        setCurrentTheme(themes[themeId]);
        setIsThemeMenuOpen(false);
      }
    } catch (error) {
      console.error('Error changing theme:', error);
    }
  };

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen(!isThemeMenuOpen);
  };

  const value = {
    currentTheme,
    changeTheme,
    themes: Object.values(themes),
    isThemeMenuOpen,
    toggleThemeMenu,
    setIsThemeMenuOpen,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};