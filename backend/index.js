const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const qrRoutes = require('./routes/qr');
const uploadRoutes= require('./routes/upload');
const bypassRoutes = require("./routes/bypass");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/auth', authRoutes);
app.use('/api/qr',qrRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/bypass',bypassRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
