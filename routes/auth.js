const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// Auth user
router.post('/', (req, res) => {
  const {email, password} = req.body;

  // Validation of user
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  // Check for existing user
  User.findOne({email})
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User does not exist' });
  
      // Validate password
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(!isMatch) return res.status(400).json({msg: 'Incorrect credentials'})

        jwt.sign(
          { id: user.id },
          config.get('jwtSecret'),
          //{ expiresIn: 600 }, // expires in 10 mins
          (err, token) => {
            if(err) throw err;
            res.json({
              token, 
              user: user.id,
              username: user.username,
              email: user.email,
            })
          }
        )
      })
    });
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;