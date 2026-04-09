import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:customerId" element={<Home />} />
          {/* We can add more routes here as we grow */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
