import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/theme-provider";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="connectwm-theme">
      <div className="App">
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:customerId" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

