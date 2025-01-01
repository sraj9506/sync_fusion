const { chromium } = require("playwright");
const {processImage} = require("./imageDetection");

exports.bypassVerification = async (req, res) => {
  try {
    // Launch the browser
    const browser = await chromium.launch({ headless: false }); // Set to 'true' to run without UI
    const page = await browser.newPage();

    // Navigate to a website
    await page.goto("https://orientalinsurance.org.in/");

    await page.locator('[data-pc-section="closebutton"]').click();

    await page.locator("#login-btn").nth(1).click();

    await page.locator("#username").fill("suryrajsinhjadeja95@gmail.com");

    await page.locator("#password").fill("Suryrajsinh@9506");

    await page.locator("#continue-btn").click();

    const data = 0;

    const captcha = page.locator("canvas");

    await captcha.screenshot({
      path: "element-screenshot.jpg",
      type: "jpeg",
      quality: 100,
    });

    //processImage('element-screenshot.jpg');

    const captchaCoordinates = await captcha.boundingBox();

    let xIncrement = Math.floor(data % 3);
    let yIncrement = Math.floor(data / 3);

    let captchaWidth = captchaCoordinates.width / 3;
    let captchaHeight = captchaCoordinates.height / 3;

    let captchaY =
      captchaCoordinates.y + captchaHeight * yIncrement + captchaHeight / 2;
    let captchaX =
      captchaCoordinates.x + captchaWidth * xIncrement + captchaWidth / 2;

    await page.mouse.click(captchaX, captchaY);

    await page.waitForTimeout(2000);

    await page.pause();

    // Close the browser
    await browser.close();

    res.status(200).json({ message: "data fetched!" });
  } catch (error) {
    console.log(error);
  }
};
