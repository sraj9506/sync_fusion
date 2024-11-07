const multer = require('multer');
const path = require('path');

// Define the multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set destination folder
    },
    filename: function (req, file, cb) {
        const { clientId } = req.query; // Extract clientId from query parameters
        cb(null, clientId + path.extname(file.originalname)); // Append clientId to filename
    }
});

// Create the upload middleware in one function using next()
const uploadMiddleware = (req, res, next) => {
    const upload = multer({ storage: storage }).single('file'); // Use .single() for handling single file upload
    upload(req, res, (err) => {
        if (err) {
            // Handle any errors (Multer errors or others)
            return next(err); // Pass the error to the error-handling middleware
        }
        // If no errors, continue to the next middleware or route handler
        next();
    });
};

module.exports = uploadMiddleware;
