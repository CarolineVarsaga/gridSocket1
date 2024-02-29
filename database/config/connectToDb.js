const { mongoose } = require('mongoose');

const connectToDB = () => {
  try {
    const con = mongoose.connect(process.env.MONGO_URL);
    console.log('Database connection successfull');
  } catch (error) {
    console.log('Database connection failure');
  }
};

module.exports = connectToDB;
