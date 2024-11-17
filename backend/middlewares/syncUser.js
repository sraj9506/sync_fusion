const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

const phoneClients = {};

// Middleware to initialize WhatsApp client and get the QR code
const syncUser = (req, res, next) => {
    const clientId = req.userId;
    if (!clientId) {
        return res.status(400).json({ error: 'clientId is required' });
    }

    if (!phoneClients[clientId]) {
        const client = new Client({
            authStrategy: new LocalAuth({ clientId })
        });

        // Create a promise to handle the QR code asynchronously
        const qrCodePromise = new Promise((resolve) => {
            client.on('qr', (qr) => {
                resolve(qr);
            });
        });

        client.on('ready', () => {
            console.log(`Client ${clientId} is ready!`);
            phoneClients[clientId].isOnline = true;
        });

        client.on('message', async (message) => {
            console.log(`Message received from ${message.from} on client ${clientId}: ${message.body}`);
            try {
                const filePath = `uploads/${clientId}.txt`;
                if (fs.existsSync(filePath)) {
                    const data = await fs.promises.readFile(filePath, 'utf8');
                    if (message.body === "Hi I am Rashmika") {
                        await message.reply(data);
                    } else {
                        console.log("Not matching sender");
                    }
                    console.log(`Reply sent to ${message.from} from client ${clientId}`);
                } else {
                    console.log(`No response file found for client ${clientId}`);
                }
            } catch (error) {
                console.error(`Failed to send reply from ${clientId}:`, error);
            }
        });

        client.initialize();
        phoneClients[clientId] = { client, isOnline: false, qrCodePromise };
    }

    req.clientData = phoneClients[clientId];
    next();
};

// Controller function to generate QR code
exports.generateQR = async (req, res) => {
    try {
        const qrCode = await req.clientData.qrCodePromise;
        const qrUrl = await qrcode.toDataURL(qrCode); // Convert QR code to data URL
        console.log("QR Code Generated");
        res.json({ qr_url: qrUrl });
    } catch (error) {
        console.error("Error generating QR code:", error);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
};

module.exports = {
    syncUser,
};
