const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).end();
  } catch (error) {
    if(error.errorResponse.errmsg.includes('duplicate key error'))
    {
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
      if(!user.isVerified)
      {
        res.status(200).json({token : null});
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({isVerified : true, token});
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(500).end();
  }
};
