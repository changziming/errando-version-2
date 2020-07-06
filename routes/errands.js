const router = require('express').Router();
let Errands = require('../models/errands.model');

router.get('/', (req, res) => {
  Errands.find()
    .then(errands => res.json(errands))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newErrands = new Errands({
    username,
    description,
    duration,
    date,
  });

  newErrands.save()
  .then(() => res.json('Errand added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
  Errands.findById(req.params.id)
    .then(errands => res.json(errands))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
  Errands.findByIdAndDelete(req.params.id)
    .then(() => res.json('Errand deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
  Errands.findById(req.params.id)
    .then(errands => {
      errands.username = req.body.username;
      errands.description = req.body.description;
      errands.duration = Number(req.body.duration);
      errands.date = Date.parse(req.body.date);

      errands.save()
        .then(() => res.json('Errand updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;