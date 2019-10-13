const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PushPinSchema = new Schema ({
  type: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  coords: { type: [Number], required: true },
  event_count: { type: Number, required: true },
  locale: { type: String, required: true },
  q_air: { type: String, required: true },
  child_infra: { type: String, required: true },
});

// Export schema
module.exports = PushPin = mongoose.model('pushpin', PushPinSchema);