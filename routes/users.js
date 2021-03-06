const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


// router.get('/', (req, res) => {
//   User.find({})
//     .select('username && email && phoneNumber')
//     .then(user => res.json(user))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.get('/', (req, res) => {
  User.findOne(req.query)
    .select('username && email && phoneNumber && telegramHandle')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Registering new user
router.post('/add', (req, res) => {
  const {username, email, phoneNumber, password, telegramHandle} = req.body;

  // Validation of new user
  if(!username || !email || !phoneNumber || !telegramHandle || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  // Check for existing user
  User.findOne({email})
    .then(user => {
      if(user) return res.status(400).json({ msg: 'Email already exists' });
  });

  User.findOne({phoneNumber})
  .then(user => {
    if(user) return res.status(400).json({ msg: 'Phone number already exists' });
  });

  const newUser = new User({
    username,
    email,
    phoneNumber,
    telegramHandle,
    password
  })
  newUser.save()
    .then(user => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;