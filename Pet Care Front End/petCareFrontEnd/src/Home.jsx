import React from "react";
import './Home.css';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Healthy Pets, Happy Pets!</h1>
          <button className="btn-primary">Sign Up Now</button>
          <button className="btn-secondary">Log In</button>
        </div>
        {/* <img
          className="hero-image"
          src="/src/assets/hero.png"
          alt="A girl with her pet dog"
        /> */}
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <h3>Best in Industry</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="feature">
            <h3>Customer Support</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="feature">
            <h3>Emergency Services</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="feature">
            <h3>Veterinary Help</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="tutorial-section">
        <h2>First time using our website?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="video">
          <img src="/src/assets/dog.jpg" alt="Dog" />
        </div>
      </section>
    </div>
  );
};

export default Home
