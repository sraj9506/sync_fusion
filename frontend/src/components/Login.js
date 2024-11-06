import React, { useRef } from 'react';
import { loginUser } from '../api';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const emailRef = useRef("");
  const passRef = useRef("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const email=emailRef.current.value;
      const password=passRef.current.value;
      const response = await loginUser({ email, password });
      const { token } = response.data;
      localStorage.setItem('sync_fusion_token', token);
      navigate('/');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" className="form-control" id="username" placeholder="Type your username" ref={emailRef} />
      <input type="password" className="form-control mb-3" id="password" placeholder="Type your password" ref={passRef} />
      <input type="submit" className="btn btn-primary my-3 w-100" value="Login" />
      <div className='text-center'>
        Don't have an account ? <Link to="/Register">Create</Link>
      </div>
    </form>
  );
};

export default Login;
