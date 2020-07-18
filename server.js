const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config')

//require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const uri = process.env.ATLAS_URI || config.get('mongoURI');
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const errandsRouter = require('./routes/errands');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use('/errands', errandsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// test code to deploy to heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

// Render html when running into error
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});