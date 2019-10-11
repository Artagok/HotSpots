const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PushPinSchema = new Schema ({
  type: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  coords: {type: [Number], required: true },
  // img { type: Buffer }
});

// Export schema
module.exports = PushPin = mongoose.model('pushpin', PushPinSchema);