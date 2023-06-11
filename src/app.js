const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authenticateToken = require('./middlewares/auth');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler')

// Apply token authentication middleware to all routes
app.use(authenticateToken);
app.use(errorHandler);

require('dotenv').config();

// Parse JSON bodies
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });


// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const v1Router = require('./routes/v1');

app.use('/api/v1', v1Router);



app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});