const multer = require('multer');
const path = require('path');

const upload = () => {
    const storage = multer.diskStorage({
        destination: (cb) => {
            cb(null, '../uploads/'); // Set the folder where files will be saved
        },
        filename: (req, file, cb) => {
            // Assuming clientId comes from `req.user.name` (e.g., set by an authentication middleware)
            const { clientId } = req.userId;
            if (!clientId) {
                return cb(new Error('clientId is required'));
            }
            // Use clientId and file extension to generate the filename
            cb(null, clientId + path.extname(file.originalname));
        }
    });

    return multer({ storage });
};

module.exports = upload;
