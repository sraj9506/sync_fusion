import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import SyncDevice from './components/SyncDevice';
import Navbar from './components/Navbar';
import Register from './components/Register';
import { ThemeProvider } from 'next-themes';
import Home from "./components/Home";
import About from "./components/About";
import Pricing from "./components/Services";
import { Contact } from "./components/Contact";
import Footer from "./components/Footer";
import { useState } from "react";
import Verification from "./components/Verification";


function App() {
  const [isAuthorized, setAuthority] = useState(false);
  const appStyle = {
    backgroundColor: 'var(--bg-color)', // Dynamically controlled by CSS variables
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };
  return (
    <ThemeProvider attribute="class">
      <Router>
        <div style={appStyle}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/SyncDevice" element={<SyncDevice />} />
            <Route exact path="/Login" element={<Login  isAuthorized={isAuthorized} setAuthority={setAuthority} />} />
            <Route exact path="/SignUp" element={<Register  isAuthorized={isAuthorized} setAuthority={setAuthority} />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/Services" element={<Pricing />} />
            <Route exact path="/ContactUs" element={<Contact />} />
            <Route exact path="/Verification" element={<Verification />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;