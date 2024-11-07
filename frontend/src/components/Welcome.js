import React, { useEffect } from 'react';
import { useNavigate, useState } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  async function fetchdata() {
    let rawdata = await fetch(`http://localhost:5000/api/qr/generateQR`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("sync_fusion_token"),
      },
    });
    let jsondata = await rawdata.json();
    setQrCodeUrl(jsondata.qr_url);
  }
  useEffect(() => {
    const token = localStorage.getItem('sync_fusion_token');
    if (!token) {
      navigate("/Login");
    }
    fetchdata();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/upload/uploadFile`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("sync_fusion_token"),
      },
    });
  }
  return (
    <div>
      <h1>Scan this QR code:</h1>
      {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code" /> : <p>Loading...</p>}
      <form
        id='uploadForm'
        onSubmit={handleSubmit}
        encType="multipart/form-data">
        <input type="file" name="file" />
        <input type='submit' value='Upload!' />
      </form>
    </div>
  );
};

export default Welcome;
