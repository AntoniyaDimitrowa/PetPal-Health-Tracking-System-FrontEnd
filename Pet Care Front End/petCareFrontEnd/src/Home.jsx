import React from "react";
import './Home.css';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="knewave-regular">
            Healthy <span className="white-text">Pets,</span> Happy <span className="white-text">Pets!</span>
          </h1>
          <div className="buttons-center">
            <button className="btn-primary">Sign Up Now</button>
            <button className="btn-secondary">Log In</button>
          </div>
          
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
      <h2 className="knewave-regular">Features</h2>
        <div className="features">
          <div className="feature">
           <img src="/src/assets/pet-health-history-icon.png" alt="Veterinary Help Icon" />
            <h3>Pet Health History</h3>
            <p>Owners can add daily health data for each pet and view the health history over time.</p>
          </div>
          <div className="feature">
            <img src="/src/assets/notification-icon.png" alt="Veterinary Help Icon" />
            <h3>Notifications and Statistics</h3>
            <p>Receive notifications when it's time to consult a veterinarian and check monthly statistics about your pets' health.</p>
          </div>
          <div className="feature">
            <img src="/src/assets/socialization-icon.png" alt="Veterinary Help Icon" />
            <h3>Socialization Platform</h3>
            <p>Connect with other pet owners through live chat and arrange playdates to help your pets socialize.</p>
          </div>
          <div className="feature">
            <img src="/src/assets/veterinary-help-icon.png" alt="Veterinary Help Icon" />
            <h3>Veterinary Help</h3>
            <p>Easily contact a veterinarian for expert opinions on your pets' health.</p>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="tutorial-section">
        <div className="tutorial-text">
          <h2 className="knewave-regular">First time using our website?</h2>
          <p>
          Explore our platform to track your pet's health, receive timely notifications, 
          and connect with other pet owners. 
          For assistance, check out our video guide below to help you get started.
          </p>
        </div>
        
        <div className="video">
          <img src="/src/assets/video-placeholder.jpg" alt="video" />
        </div>
      </section>
    </div>
  );
};

export default Home
