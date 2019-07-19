const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const authors = require('./routes/authors')
const books = require('./routes/books')
const { typeDefs, resolvers } = require('./graphql/schema')

const port = process.env.PORT || 5000
const mongo_uri = 'mongodb://dba:3w2U$^!#lL5T@maincluster-shard-00-00-gmc7n.mongodb.net:27017,maincluster-shard-00-01-gmc7n.mongodb.net:27017,maincluster-shard-00-02-gmc7n.mongodb.net:27017/mern-mvc?ssl=true&replicaSet=MainCluster-shard-0&authSource=admin&retryWrites=true'


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
  console.log(`Servidor listo en http://localhost:${port}`)
})