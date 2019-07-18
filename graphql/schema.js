const { gql } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')

const Author = require('../models/Author')
const Book = require('../models/Book')

exports.typeDefs = gql`
  scalar Date

  type Query {
    authors: [Author!]!
    author(id: ID!): Author
    books: [Book!]!
    book(id: ID!): Book
  }

  type Author {
    id: ID!
    givenName: String!
    lastName: String!
    country: String!
    birthdate: Date!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    genre: String!
    publicationDate: Date!
  }
`

exports.resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'A date represented as an ISO-8601 string',
    serialize: (value) => value.toISOString().slice(0, 10)
  }),
  Query: {
    authors: () => {
      return Author.find().then(data => data)
    },
    author: (parent, args) => {
      const { id } = args
      return Author.findById(id).then(data => data)
    },
    books: () => {
      return Book.find().then(data => data)
    },
    book: (parent, args) => {
      const { id } = args
      return Book.findById(id).then(data => data)
    },
  },
  Author: {
    books: parent => {
      const { id } = parent
      return Book.find().where('author').equals(id).then(data => data)
    }
  },
  Book: {
    author: parent => {
      const { id } = parent
      return Book.findById(id).populate('author').then(data => data.author)
    },
  },
}
