const mongoose = require('mongoose');

const databaseConnection = () => {
  const MONGO_URL = process.env.MONGO_URL;
  const DB_NAME = process.env.DB_NAME;

  mongoose.connect(MONGO_URL, { dbName: DB_NAME })
    .then(() => {
      console.log('Successfully connected with MongoDB');
    })
    .catch((err) => {
      console.error(`Error occurred while connected with database: ${err}`);
    });
}

module.exports = databaseConnection;
