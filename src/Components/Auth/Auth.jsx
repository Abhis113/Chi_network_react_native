import React, { useState } from "react";
import "../Auth/Auth.scss";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Auth({closeAuth}) {
  const [activeTab, setActiveTab] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handle_change = (tab) => {
    setActiveTab(tab);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      toast.error("Please enter a username.");
      return;
    }

    if (!email) {
      toast.error("Please enter an email.");
      return;
    }

    if (!password) {
      toast.error("Please enter a password.");
      return;
    }

    const newUser = {
      username,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setUsername("");
    setEmail("");
    setPassword("");
    toast.success("Signup successful!");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!loginEmail) {
      toast.error("Please enter an email.");
      return;
    }

    if (!loginPassword) {
      toast.error("Please enter a password.");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (
        parsedUser.email === loginEmail &&
        parsedUser.password === loginPassword
      ) {
        toast.success("Login successful!");
        alert("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid email or password.");
      }
    } else {
      toast.error("No user found. Please sign up first.");
    }

    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div className="Auth" id="Auth">
      <div className="credential-container">
        <div className="action">
          {activeTab === "signup" ? <h3>Signup</h3> : <h3>Login</h3>}
          <i onClick={closeAuth} class="fa-solid fa-x"></i>
        </div>
        <div className="tabs">
          <button
            onClick={() => handle_change("signup")}
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => handle_change("login")}
            className={`tab ${activeTab === "login" ? "active" : ""}`}
          >
            Login
          </button>
        </div>
        <div className="form-container">
          {activeTab === "signup" ? (
            <div className="signup">
              <form onSubmit={handleSignupSubmit}>
                <div className="form-child">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-child">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-child">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="submit" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          ) : (
            <div className="login">
              <form onSubmit={handleLoginSubmit}>
                <div className="form-child">
                  <label htmlFor="loginEmail">Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="form-child">
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <button className="submit" type="submit">
                  Login
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;