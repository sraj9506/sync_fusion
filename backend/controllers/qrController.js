const qrcode = require('qrcode');
exports.generateQR=async(req,res)=>{
    try {
        const qrCode = await req.clientData.qrCodePromise;
        qrcode.toDataURL(qrCode, (url) => {
            console.log("QR Code Generated");
            res.send({ qr_url: url });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }

}