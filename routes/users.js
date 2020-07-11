const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Registering new user
router.post('/add', (req, res) => {
  const {username, email, password} = req.body;

  // Validation of new user
  if(!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  // Check for existing user
  User.findOne({email})
    .then(user => {
      if(user) return res.status(400).json({ msg: 'Email already exists' });
  });

  const newUser = new User({
    username,
    email,
    password
  })
  
  //Create salt and hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save()
        .then(user => {

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 600 }, // expires in 10 mins
            (err, token) => {
              if(err) throw err;
              res.json('User added!')
            }
          )
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
  })
});

router.delete('/:id', auth, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;