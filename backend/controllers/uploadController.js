const uploadController = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        res.send(`File uploaded successfully: ${req.file.filename}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file.');
    }
};

module.exports = {
    uploadController
};
