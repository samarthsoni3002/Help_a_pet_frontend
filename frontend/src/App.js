import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Adoption from "./pages/Adoption";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adoption" element={<Adoption />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
