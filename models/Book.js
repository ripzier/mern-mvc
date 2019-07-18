const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
  title: String,
  author: { type: ObjectId, ref: 'Author' },
  genre: String,
  publicationDate: Date,
})

module.exports = mongoose.model('Book', bookSchema)