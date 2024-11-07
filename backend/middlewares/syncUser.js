const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const phoneClients = {};
const syncUser = (req, res, next) => {
    const clientId=req.userId;
    if (!clientId) {
        return res.status(400).json({ error: 'clientId is required' });
    }
    else if (!phoneClients[clientId]) {
        const client = new Client({
            authStrategy: new LocalAuth({ clientId })
        });

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
                    if (message.body === "Hi i am Rashmika") {
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

module.exports = {
    syncUser,
};