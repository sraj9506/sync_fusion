import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { generateQR } from '../api';

const SyncDevice = () => {
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('sync_fusion_token');

    const fetchData = async () => {
      try {
        const response = await generateQR(token);
        const data = response.data ? response.data : await response.json();

        if (data && data.qr_url) {
          setQrCodeUrl(data.qr_url);
          console.log("QR Code URL:", data.qr_url);  // Debugging line
        } else {
          console.error('QR code URL not found in response:', data);
        }
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    if (!token) {
      navigate("/Login");
      return;
    }

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Scan this QR code:</h1>
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="QR Code" />
      ) : (
        <p>Loading...</p>
      )}
      <form id='uploadForm' encType="multipart/form-data">
        <input type="file" name="file" />
        <input type='submit' value='Upload!' />
      </form>
    </div>
  );
};

export default SyncDevice;
