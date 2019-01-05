const mongoose = require('mongoose');

const databaseConnection = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DATABASE_URI, (err, _) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
module.exports = databaseConnection;
