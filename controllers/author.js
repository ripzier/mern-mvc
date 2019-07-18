const Author = require('../models/Author')

exports.list = (req, res) => {
  Author.find()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Ocurrió un error' })
    })
}

exports.details = (req, res) => {
  Author.findById(req.params._id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Ocurrió un error' })
    })
}

exports.create = (req, res) => {
  const newAuthor = new Author(req.body)
  newAuthor.save()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Ocurrió un error' })
    })

}

exports.update = (req, res) => {
  Author.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Ocurrió un error' })
    })
}

exports.delete = (req, res) => {
  Author.findByIdAndRemove(req.params._id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Ocurrió un error' })
    })
}