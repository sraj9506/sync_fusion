//const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const sharp = require('sharp');

exports.processImage = async (imagePath) => {
    // Resize image using sharp
    const imageBuffer = await sharp(imagePath)
        .resize(224, 224)
        .toBuffer();

    // Decode image
    const imageTensor = tf.node.decodeImage(imageBuffer);

    // Load pre-trained MobileNet model
    const model = await mobilenet.load();

    // Perform prediction
    const predictions = await model.classify(imageTensor);
    console.log(predictions);
}