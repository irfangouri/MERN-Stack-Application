const mongoose = require('mongoose');

const databaseConnection = () => {
  const mongoUrl = process.env.MONGO_URL;

  mongoose.connect(mongoUrl)
    .then(() => {
      console.log('Successfully connected with MongoDB');
    })
    .catch((err) => {
      console.error(`Error occurred while connected with database: ${err}`);
    });
}

module.exports = databaseConnection;
