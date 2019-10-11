// Requires
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const pushpins   = require('./routes/api/pushpins');

// Create express app
const app = express();
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB
mongoose
  .connect(db, dbOptions)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Use routes 
app.use('/api/pushpins', pushpins);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));