const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const errandsSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  deadline: { type: Date, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, required: true },
  urgency: { type: String, required: true }
}, {
  timestamps: true,
});

const Errands = mongoose.model('Errands', errandsSchema);

module.exports = Errands;