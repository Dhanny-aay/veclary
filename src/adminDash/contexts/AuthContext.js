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

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token =
          localStorage.getItem("veclary_token") ||
          sessionStorage.getItem("veclary_token");

        const storedPosition = localStorage.getItem("user_position");

        if (token) {
          const decoded = jwtDecode(token);

          // Check if token is expired
          if (decoded.exp * 1000 > Date.now()) {
            setUser((prev) => ({
              ...prev,
              authenticated: true,
              role: decoded.role,
              email: decoded.email,
              name: decoded?.name,
              position: storedPosition,
            }));
          } else {
            localStorage.removeItem("veclary_token");
            sessionStorage.removeItem("veclary_token");
          }
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

  const login = useCallback(
    async (email, password, rememberMe) => {
      try {
        const response = await AuthService.login({ email, password });

        // Validate response
        if (!response.accessToken) {
          throw new Error("Invalid login response");
        }

        const decoded = jwtDecode(response.accessToken);

        localStorage.setItem("user_position", response?.user?.position);

        const userData = {
          authenticated: true,
          role: decoded.role,
          email: decoded.email,
          name: decoded?.name,
          position: response?.user?.position,
        };
        setUser(userData);

        // Store token based on remember me
        const tokenStorage = rememberMe ? localStorage : sessionStorage;
        tokenStorage.setItem("veclary_token", response.accessToken);

        navigate("/adminDashboard");

        return true;
      } catch (error) {
        console.error("Login failed:", error);
        setUser(null);
        throw error;
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("veclary_token");
      sessionStorage.removeItem("veclary_token");
      navigate("/adminLogin");
    }
  }, [navigate]);

  useEffect(() => {
    const refreshToken = async () => {
      if (user) {
        try {
          const token =
            localStorage.getItem("veclary_token") ||
            sessionStorage.getItem("veclary_token");

          if (token) {
            const decoded = jwtDecode(token);
            const timeUntilExpiry = decoded.exp * 1000 - Date.now() - 60000;

            if (timeUntilExpiry > 0) {
              setTimeout(async () => {
                try {
                  await AuthService.refreshToken();
                } catch (error) {
                  console.error("Token refresh failed:", error);
                  logout();
                }
              }, timeUntilExpiry);
            }
          }
        } catch (error) {
          console.error("Token validation error:", error);
          logout();
        }
      }
    };

    refreshToken();
  }, [user, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
