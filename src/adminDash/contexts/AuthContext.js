import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { AuthService } from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SnackbarUtils from "../../utils/snackbarUtils";

// Create authentication context
const AuthContext = createContext(null);

// Custom hook for auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check initial authentication state
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("veclary_token");
        if (token) {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            await AuthService.refreshToken();
          }
          setUser({ authenticated: true, role: decoded.role });
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // Login method
  const login = useCallback(
    async (email, password, rememberMe) => {
      try {
        const response = await AuthService.login({ email, password });

        if (response.role !== "ADMIN") {
          throw new Error("Unauthorized access");
        }

        setUser({
          email: response.email,
          role: response.role,
          authenticated: true,
        });

        // Store token only if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem("veclary_token", response.access_token);
        } else {
          sessionStorage.setItem("veclary_token", response.access_token);
        }

        // Ensure the navigation happens after state update
        setTimeout(() => {
          navigate("/adminDashboard");
        }, 0);
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [navigate]
  );

  // Logout method
  const logout = useCallback(async () => {
    try {
      const response = await AuthService.logout();
      console.log("this is theponse from AuthContext", response)

      // Checking if the response contains a valid JSON message
      if (response && response.message) {
        SnackbarUtils.success(response.message);
      } else {
        SnackbarUtils.success("Logged out successfully.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      SnackbarUtils.error("Logout failed. Please try again.");
    } finally {
      setUser(null);
      localStorage.removeItem("veclary_token");
      sessionStorage.removeItem("veclary_token");
      navigate("/adminLogin");
    }
  }, [navigate]);

  // Token Refresh Handling
  useEffect(() => {
    const scheduleRefresh = async () => {
      if (user) {
        try {
          const token = localStorage.getItem("veclary_token");
          if (token) {
            const decoded = jwtDecode(token);
            const timeUntilExpiry = decoded.exp * 1000 - Date.now() - 60000;
            setTimeout(async () => {
              await AuthService.refreshToken();
            }, timeUntilExpiry);
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          logout();
        }
      }
    };
    scheduleRefresh();
  }, [user, logout]);

  // Provide context value
  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated: !!user }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
