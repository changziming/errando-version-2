const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { jwtSecret } = config;

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('User Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  // Simple validation
  if (!username || !email || !phoneNumber || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({username})
    .then(user => {
      if(user) return res.status(400).json({ msg: 'Username already exists' });
  });

  User.findOne({email})
    .then(user => {
      if(user) return res.status(400).json({ msg: 'Email already exists' });
  });

  User.findOne({phoneNumber})
  .then(user => {
    if(user) return res.status(400).json({ msg: 'Phone number already exists' });
  });


  try {
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      username,
      email,
      phoneNumber,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, jwtSecret, {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
        phoneNumber: savedUser.phoneNumber
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;