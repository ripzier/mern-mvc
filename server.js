const express = require('express')
const mongoose = require('mongoose')

const authors = require('./routes/authors')
const books = require('./routes/books')

const mongo_uri = 'mongodb://localhost:27017/mvc'

mongoose.connect(mongo_uri, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log(`Successfully connected to ${mongo_uri}`)
  })
  .catch(err => {
    console.log('Error connecting to database')
    console.log('Ending the application now...')
    process.exit()
  })

const app = express()

// Lee el contenido del cuerpo de las peticiones como json
app.use(express.json())

// Rutas
app.use('/api/autores', authors)
app.use('/api/libros', books)

app.listen(5000, () => {
  console.log('El servidor está escuchando en el puerto 5000')
})