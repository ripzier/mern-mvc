const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  givenName: String,
  lastName: String,
  country: String,
  birthdate: Date,
})

module.exports = mongoose.model('Author', authorSchema)