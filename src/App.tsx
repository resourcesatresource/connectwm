import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import { ThemeProvider } from "./components/theme-provider";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="connectwm-theme">
      <div className="App">
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/u/:customerId" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
