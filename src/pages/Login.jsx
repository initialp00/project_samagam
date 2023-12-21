import React, { useState } from 'react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulating OTP verification here (for demonstration purposes)
    if (password === otp) {
      setLoggedIn(true);
      alert('Login successful!');
      // You might want to redirect the user to another page on successful login
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      {loggedIn ? (
        <div>
          <p>Welcome, User!</p>
          {/* Add your logged-in content here */}
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Enter OTP:</label>
            <input
              type="password"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;