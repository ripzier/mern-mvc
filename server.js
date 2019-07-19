const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const authors = require('./routes/authors')
const books = require('./routes/books')
const { typeDefs, resolvers } = require('./graphql/schema')

const { MONGO_URI, MONGO_USER, MONGO_PASSWORD, PORT } = process.env

const port = PORT || 5000
const mongo_uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}`

mongoose.connect(mongo_uri, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log(`Conectado a la base de datos: ${mongo_uri}`)
  })
  .catch(err => {
    console.log('Error al conectarse a la base de datos')
    console.log('Terminando la aplicación ahora...')
    process.exit()
  })

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))

server.applyMiddleware({ app })
app.use(express.json())
app.use('/api/autores', authors)
app.use('/api/libros', books)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen({ port }, () => {
  console.log(`Servidor listo en el puerto: ${port}`)
})