const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
    console.log('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '10m' }
          );
            const refreshToken = jwt.sign(
                { userId: user._id },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: '7d' }
            );
        res.json({
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
        console.log('User logged in successfully');
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const userId = decoded.userId;
  
      // Generate new access token
      const accessToken = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
  
      res.json({ accessToken });
      console.log('Access token refreshed');
    } catch (error) {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
}  

exports.verifyToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, userId: decoded.userId });
    console.log('Token verified');
  } catch (error) {
    res.json({ valid: false });
  }
};