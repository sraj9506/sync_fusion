const qrcode = require('qrcode'); // Add this line at the top of the file

exports.generateQR = async (req, res) => {
    try {
        const qrCode = await req.clientData.qrCodePromise;
        qrcode.toDataURL(qrCode, (err, url) => {
            if (err) {
                console.error("Error generating QR code:", err);
                return res.status(500).json({ error: 'Failed to generate QR code' });
            }
            console.log("QR Code Generated");
            res.send({ qr_url: url });
        });
    } catch (error) {
        console.error("Error generating QR code:", error);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
};
