const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword ,isVerified: null });
    await user.save();
    const token = jwt.sign({ userId: user._id, type: 'Register' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false,
      path: '/',
    });
    res.status(201).end();
  } catch (error) {
    if (error.errorResponse.errmsg.includes('duplicate key error')) {
      res.status(409).end();
    }
    res.status(500).end();
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      if (!user.isVerified) {
        if(user.isVerified===false)
        {
          res.cookie('authToken', '', { expires: new Date(0), httpOnly: true });
          const token = jwt.sign({ userId: user._id, type: 'RegLog' }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.cookie('authToken', token, {
            httpOnly: true,
            secure: false,
            path: '/',
          });
          res.status(200).json({token : null});
        }
        else
          res.status(409).json();
      }
      const token = jwt.sign({ userId: user._id , type: 'Login'}, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: false,
        path: '/',
      });
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};

exports.otpGen = async (req, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // generate otp
    const userId = req.userId;
    const existingUser = await User.findOne({ userId });
    if(!existingUser)
    {
      res.status(404).end();
    }
    if(Date.now() > existingUser.otpExpiry)
    {
      existingUser.otp = otp;
      existingUser.otpExpiry = Date.now()+30000;
      await existingUser.save();
      const email = existingUser.email;
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App password from Gmail
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Signup Verification',
      text: `Your OTP is ${otp}`,
    });
      res.status(200).end();
    }
  }
  catch (error) {
    res.status(500).end();
  }
};

exports.matchOtp = async (req, res) => {
  const { otp  } = req.body;
  const {userId,pageType} = req;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Invalid user' });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(410).json({ message: 'OTP expired' });
    }

   // OTP is valid and not expired, proceed with successful verification
   user.otp = null; // Clear OTP after successful verification
   user.isVerified=true;
   user.otpExpiration = null;
   await user.save();

   if(pageType === "RegLog")
     res.status(200).json({auth : true});
   else
   res.status(200).json({auth : false});
  
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
