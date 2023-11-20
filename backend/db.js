

const database = () => {

const mongoose = require('mongoose');
// MongoDB connection
mongoose.connect('mongodb+srv://ace:ace@cluster0.kjcbkuf.mongodb.net/urlShort');

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Database connection error:', error);
});

db.once('open', () => {
  console.log('Connected to the database');
});

// Define the URL schema
const urlSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String,
    user: String,
  });

const URL = mongoose.model('URL', urlSchema);

};

module.exports = database;
