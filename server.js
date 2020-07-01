const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const uri = process.env.MONGODB_URI || 'mongodb://heroku_cqkqpp8h:pleudugi2ic3v5ijflntml0u65@ds113749.mlab.com:13749/heroku_cqkqpp8h'; // || 'mongodb+srv://Sean:9F!whuyvC6jZRdZ@cluster0-46pry.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const errandsRouter = require('./routes/errands');
const usersRouter = require('./routes/users');

app.use('/errands', errandsRouter);
app.use('/users', usersRouter);

// test code to deploy to heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});