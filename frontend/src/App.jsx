import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; 
import AuthChoice from "./AuthChoice"; 
import Login from "./Login";       
import Register from "./Register"; 
import AdminLogin from "./AdminLogin"; 
import './App.css'; 
import AdminDashboard from "./AdminDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userRole') || null
  );
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    if (isLoggedIn) {
        localStorage.setItem('userRole', userRole);
    } else {
        localStorage.removeItem('userRole');
    }
  }, [isLoggedIn, userRole]);


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              {...{
                isLoggedIn,
                setIsLoggedIn, 
                userRole,
                setUserRole,  
                cartItems,
                setCartItems,
              }}
            />
          }
        />
        <Route path="/auth" element={<AuthChoice />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
        <Route 
          path="/admin" 
          element={<AdminDashboard userRole={userRole} setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;