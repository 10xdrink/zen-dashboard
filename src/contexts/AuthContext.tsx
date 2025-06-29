import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  logout: () => void;
  resetInactivityTimer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API calls - replace with actual API calls in production
const mockLogin = async (email: string, password: string): Promise<{ success: boolean; requireTwoFactor: boolean; user?: User }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo purposes - in production, this would be a real API call
  if (email === 'admin@zennara.com' && password === 'admin123') {
    return {
      success: true,
      requireTwoFactor: true,
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@zennara.com',
        role: 'admin'
      }
    };
  }
  
  return { success: false, requireTwoFactor: false };
};

const mockVerifyTwoFactor = async (code: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo purposes - in production, this would verify the code with the server
  return code === '123456';
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requireTwoFactor, setRequireTwoFactor] = useState<boolean>(false);
  const [inactivityTimeout, setInactivityTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('zenAdmin_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('zenAdmin_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Set up inactivity timer
  useEffect(() => {
    if (user) {
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
    };
  }, [user]);

  // Use useCallback to prevent infinite re-renders
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }
    
    // Auto logout after 30 minutes of inactivity (1800000ms)
    // This can be adjusted or made configurable
    const timeout = setTimeout(() => {
      logout();
    }, 1800000);
    
    setInactivityTimeout(timeout);
  }, [inactivityTimeout]);

  // Set up event listeners for user activity
  useEffect(() => {
    if (user) {
      const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
      
      const handleUserActivity = () => {
        resetInactivityTimer();
      };
      
      activityEvents.forEach(event => {
        window.addEventListener(event, handleUserActivity);
      });
      
      return () => {
        activityEvents.forEach(event => {
          window.removeEventListener(event, handleUserActivity);
        });
      };
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await mockLogin(email, password);
      
      if (response.success) {
        if (response.requireTwoFactor) {
          setRequireTwoFactor(true);
          setPendingUser(response.user || null);
          setIsLoading(false);
          return true;
        } else {
          setUser(response.user || null);
          localStorage.setItem('zenAdmin_user', JSON.stringify(response.user));
          setIsLoading(false);
          return true;
        }
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const verified = await mockVerifyTwoFactor(code);
      
      if (verified && pendingUser) {
        setUser(pendingUser);
        localStorage.setItem('zenAdmin_user', JSON.stringify(pendingUser));
        setRequireTwoFactor(false);
        setPendingUser(null);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setPendingUser(null);
    setRequireTwoFactor(false);
    localStorage.removeItem('zenAdmin_user');
    
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
      setInactivityTimeout(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        verifyTwoFactor,
        logout,
        resetInactivityTimer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
