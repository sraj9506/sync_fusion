import React from 'react';
import { jwtDecode } from 'jwt-decode';
const Navbar = () => {
    return (
      <div>
            {localStorage.getItem("sync_fusion_token") ? jwtDecode(localStorage.getItem("sync_fusion_token")).name:"Login"}
      </div>
    );
  }; 
export default Navbar;
