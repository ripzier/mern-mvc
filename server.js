const express = require('express')
const mongoose = require('mongoose')

const authors = require('./routes/authors')
const books = require('./routes/books')

const port = 5000
const mongo_uri = 'mongodb://localhost:27017/mvc'

mongoose.connect(mongo_uri, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log(`Conectado a la base de datos: ${mongo_uri}`)
  })
  .catch(err => {
    console.log('Error al conectarse a la base de datos')
    console.log('Terminando la aplicación ahora...')
    process.exit()
  })

const app = express()

app.use(express.json())
app.use('/api/autores', authors)
app.use('/api/libros', books)

app.listen({ port }, () => {
  console.log(`Servidor listo en http://localhost:${port}`)
})