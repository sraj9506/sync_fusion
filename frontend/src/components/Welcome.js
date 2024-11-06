import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";
const Welcome = () => {
  const navigate=useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('sync_fusion_token');
    if (!token) {
      navigate("/Login");
    }
  },[]);
  return (
    <div>
      Welcome!
    </div>
  );
};

export default Welcome;
