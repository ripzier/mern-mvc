import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Grid, Table } from 'semantic-ui-react'

const List = ({ match }) => {
  const [books, setBooks] = useState([])
  const loadBooks = () => {
    axios.get('/api/libros/').then(response => {
      setBooks(response.data)
    })
  }
  useEffect(() => {
    loadBooks()
  }, [])

  const deleteBook = _id => {
    axios.delete(`/api/libros/${_id}`).then(() => {
      loadBooks()
    })
  }

  return (
    <>
      <Grid>
        <Grid.Column width={8} textAlign='left'>
          <Header as='h2'>Lista</Header>
        </Grid.Column>
        <Grid.Column width={8} textAlign='right'>
          <Button color='green' as={Link} to={`${match.url}/crear`}>
            Nuevo
          </Button>
        </Grid.Column>
      </Grid>
      <Table singleLine columns={4} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Título</Table.HeaderCell>
            <Table.HeaderCell>Autor</Table.HeaderCell>
            <Table.HeaderCell>Género</Table.HeaderCell>
            <Table.HeaderCell>Fecha de Publicación</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {books.map(book => {
            const { _id, title, author, genre, publicationDate } = book
            return (
              <Table.Row key={_id}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>
                  {author ? `${author.givenName} ${author.lastName}` : ''}
                </Table.Cell>
                <Table.Cell>{genre}</Table.Cell>
                <Table.Cell>
                  {publicationDate
                    ? publicationDate.slice(0, 10)
                    : publicationDate}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button
                    basic
                    color='blue'
                    as={Link}
                    to={`${match.url}/${_id}`}
                  >
                    Editar
                  </Button>
                  <Button basic color='red' onClick={() => deleteBook(_id)}>
                    Eliminar
                  </Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default List
