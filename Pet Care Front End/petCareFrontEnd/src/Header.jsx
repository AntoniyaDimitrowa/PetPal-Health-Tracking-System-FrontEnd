import React from "react";
import "./Header.css"; // Create a separate CSS file for header styling

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/src/assets/logo.png" alt="Logo" />
        <h1>PetPal</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#health-tracking">Health Tracking</a></li>
          <li><a href="#socialize">Socialize</a></li>
          <li><a href="#account">Account</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="btn-secondary">Log In</button>
        <button className="btn-primary">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
