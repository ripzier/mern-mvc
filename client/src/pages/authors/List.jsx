import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Grid, Table } from 'semantic-ui-react'

const List = ({ match }) => {
  const [authors, setAuthors] = useState([])
  const loadAuthors = () => {
    axios.get('/api/autores/').then(response => {
      setAuthors(response.data)
    })
  }
  useEffect(() => {
    loadAuthors()
  }, [])

  const deleteAuthor = _id => {
    axios.delete(`/api/autores/${_id}`).then(() => {
      loadAuthors()
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
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>País</Table.HeaderCell>
            <Table.HeaderCell>Fecha de Nacimiento</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {authors.map(author => {
            const { _id, givenName, lastName, country, birthdate } = author
            return (
              <Table.Row key={_id}>
                <Table.Cell>{`${givenName} ${lastName}`}</Table.Cell>
                <Table.Cell>{country}</Table.Cell>
                <Table.Cell>
                  {birthdate ? birthdate.slice(0, 10) : birthdate}
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
                  <Button basic color='red' onClick={() => deleteAuthor(_id)}>
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
