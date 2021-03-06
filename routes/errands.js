const router = require('express').Router();
let Errands = require('../models/errands.model');
const auth = require('../middleware/auth');

// Get all Errands
router.get('/', (req, res) => {
  Errands.find({})
    .populate('acceptedBy')
    .then(errands => res.json(errands))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add Errands
router.post('/add', (req, res) => {
  const username = req.body.username; 
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const renumeration = Number(req.body.renumeration);
  const deadline = Date.parse(req.body.deadline);
  const location = req.body.location;
  const difficulty = req.body.difficulty;
  const urgency = req.body.urgency;

  const newErrands = new Errands({
    username, // And this part
    description,
    duration,
    renumeration,
    deadline,
    location,
    difficulty,
    urgency
  });

  newErrands.save()
    .then(() => res.json('Errand added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Errand by id
router.get('/:id', (req, res) => {
  Errands.findById(req.params.id)
    .populate('acceptedBy')
    .then(errands => res.json(errands))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Errand by id
router.delete('/:id', (req, res) => {
  Errands.findByIdAndDelete(req.params.id)
    .then(() => res.json('Errand deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Edit Errand by id
router.post('/update/:id', (req, res) => {
  Errands.findById(req.params.id)
    .then(errands => {
      errands.username = req.body.username;// Change this to reference user _id instead
      errands.description = req.body.description;
      errands.duration = Number(req.body.duration);
      errands.renumeration = Number(req.body.renumeration);
      errands.deadline = Date.parse(req.body.deadline);
      errands.location = req.body.location;
      errands.difficulty = req.body.difficulty;
      errands.urgency = req.body.urgency;

      errands.save()
        .then(() => res.json('Errand updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Edit Errand status by id
router.post('/status/:id', (req, res) => {
  Errands.findById(req.params.id)
    .then(errands => {
      errands.status = req.body.status;
      errands.acceptedBy = req.body.acceptedBy;

      errands.save()
        .then(() => {
          res.json(errands) //'Status updated!'
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;