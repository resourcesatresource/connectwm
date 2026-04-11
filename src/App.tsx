import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "sonner";
import "./App.css";


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="connectwm-theme">
      <AuthProvider>
        <div className="App">
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/u/:customerId" element={<Profile />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </div>
        <Toaster richColors position="top-center" />
      </AuthProvider>
    </ThemeProvider>

  );
}

export default App;

