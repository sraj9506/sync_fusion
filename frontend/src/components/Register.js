import React, { useRef } from 'react';
import { registerUser } from '../api';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passRef = useRef("");
  const nameRef = useRef("");

  const handleRegister = async (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      navigate("/Login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Type your name"
        ref={nameRef}
        required
        minLength={3}
      />
      <input
        type="email"
        className="form-control"
        id="username"
        placeholder="Type your email"
        ref={emailRef}
      />
      <input
        type="password"
        className="form-control"
        id="password"
        placeholder="Type your password"
        ref={passRef}
        required
        minLength={5}
      />
      <input
        type="submit"
        className="btn btn-primary my-3 w-100"
        value="Register"
      />
      <div className="text-center">
        Already have an account ? <Link to="/Login">Login</Link>
      </div>
    </form>
  );
};

export default Register;
