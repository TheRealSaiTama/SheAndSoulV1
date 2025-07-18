import React, { useState, useEffect } from "react";
import "./CountdownScreen.css";

const CountdownScreen = () => {
  const launchDate = new Date("2025-09-01T00:00:00");

  const calculateTimeLeft = () => {
    const difference = +launchDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReferClick = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const isDevelopment = import.meta.env.DEV;
    const apiUrl = isDevelopment 
      ? 'http://localhost:3001/api/send-email'
      : '/.netlify/functions/send-email';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail("");
        }, 4000);
      } else {
        alert(result.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatUnit = (value) => value.toString().padStart(2, "0").split("");

  const [days1, days2] = formatUnit(timeLeft.days);
  const [hours1, hours2] = formatUnit(timeLeft.hours);
  const [minutes1, minutes2] = formatUnit(timeLeft.minutes);
  const [seconds1, seconds2] = formatUnit(timeLeft.seconds);

  return (
    <div className="countdown-container">
      <div className="header">
        <h1 className="logo">
          <span className="she">She</span>
          <span className="amp">&</span>
          <span className="soul">Soul</span>
        </h1>
        <p className="subtitle">Women's Health Platform</p>
      </div>

      <h2 className="main-title">
        <span className="title-dark">Your Wellness Journey </span>
        <span className="title-light">Begins Soon</span>
      </h2>

      <div className="timer-section">
        <div className="timer-labels">
          <span className="timer-label">Days</span>
          <span className="timer-label">Hours</span>
          <span className="timer-label">Minutes</span>
          <span className="timer-label">Seconds</span>
        </div>

        <div className="timer">
          <div className="timer-group">
            <div className="timer-box">
              <span className="timer-digit">{days1}</span>
            </div>
            <div className="timer-box">
              <span className="timer-digit">{days2}</span>
            </div>
          </div>

          <div className="timer-group">
            <div className="timer-box">
              <span className="timer-digit">{hours1}</span>
            </div>
            <div className="timer-box">
              <span className="timer-digit">{hours2}</span>
            </div>
          </div>

          <div className="timer-group">
            <div className="timer-box">
              <span className="timer-digit">{minutes1}</span>
            </div>
            <div className="timer-box">
              <span className="timer-digit">{minutes2}</span>
            </div>
          </div>

          <div className="timer-group">
            <div className="timer-box">
              <span className="timer-digit">{seconds1}</span>
            </div>
            <div className="timer-box">
              <span className="timer-digit">{seconds2}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="waitlist-box">
        <h3>Join Our Waitlist</h3>
        <p>
          Be the first to experience the She & Soul app — wellness, self-care,
          and empowerment in one space
        </p>
        <form className="email-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange}
          />
          <button type="submit">Join Waitlist</button>
        </form>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <div className="animated-tick">
            <svg width="60" height="60" viewBox="0 0 60 60" className="checkmark">
              <circle className="checkmark-circle" cx="30" cy="30" r="28" />
              <path className="checkmark-check" d="M16 30l8 8 20-20" />
            </svg>
          </div>
          <h4>Success!</h4>
          <p>Thank you for joining our waitlist. We'll keep you updated on our launch progress!</p>
        </div>
      )}

      <button
        className={`refer-button ${copied ? "copied" : ""}`}
        onClick={handleReferClick}
        disabled={copied}
      >
        {copied ? "Copied!" : "Refer a Friend"}
      </button>

      <div className="social-icons">
        <a
          href="https://www.instagram.com/shes.ouls?igsh=MWJ1eHA1aTV5NmF4ZQ=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="social-icon"
            src="https://api.builder.io/api/v1/image/assets/TEMP/ae0b9f91c16071baa3b5d6c8209736e864a97f3b?width=64"
            alt="Instagram"
          />
        </a>
        <a
          href="https://x.com/SSoul619"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="social-icon"
            src="https://api.builder.io/api/v1/image/assets/TEMP/44316b68ab8ce93d48a64cc8e474e6fbfedf7826?width=60"
            alt="X"
          />
        </a>
        <a
          href="https://www.linkedin.com/company/she-soul"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="social-icon"
            src="https://api.builder.io/api/v1/image/assets/TEMP/f1146c8891957d9ff67bcdc085a029a6a65c48b4?width=60"
            alt="LinkedIn"
          />
        </a>
      </div>
    </div>
  );
};

export default CountdownScreen;
