import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';
import Register from './components/Register';


function App() {
  return(
  <Router>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route exact path="/" element={<Welcome/>}></Route>
        <Route exact path="/Login" element={<Login/>}></Route>
        <Route exact path="/Register" element={<Register/>}></Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;