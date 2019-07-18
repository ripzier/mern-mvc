import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'

const Create = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: ''
  })

  const [authors, setAuthors] = useState([])
  useEffect(() => {
    axios.get('/api/autores/').then(response => {
      setAuthors(
        response.data.map(author => ({
          text: `${author.givenName} ${author.lastName}`,
          value: author._id
        }))
      )
    })
  }, [])

  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setBook(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios
      .post('/api/libros', book)
      .then(() => {
        setRedirect(true)
      })
      .catch(() => {
        alert('Ocurrió un error')
      })
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  const handleFormReset = () => {
    setBook({
      title: '',
      author: '',
      genre: '',
      publicationDate: ''
    })
  }

  return (
    <>
      {redirect ? (
        <Redirect to='/libros' push />
      ) : (
        <>
          <Header as='h2'>Crear</Header>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='Título'
                name='title'
                value={book.title}
                onChange={handleInputChange}
              />
              <Form.Select
                label='Autor'
                name='author'
                options={authors}
                value={book.author}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label='Género'
                name='genre'
                value={book.genre}
                onChange={handleInputChange}
              />
              <DateInput
                label='Fecha de Publicación'
                startMode='year'
                popupPosition='bottom center'
                name='publicationDate'
                preserveViewMode={false}
                animation='none'
                closable
                icon={false}
                dateFormat='YYYY-MM-DD'
                value={book.publicationDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
          <Grid stackable>
            <Grid.Column width={8} textAlign='left'>
              <Button
                color='teal'
                content='Reiniciar'
                onClick={handleFormReset}
              />
            </Grid.Column>
            <Grid.Column width={8} textAlign='right'>
              <Button
                color='red'
                content='Cancelar'
                onClick={handleFormCancellation}
              />
              <Button
                color='green'
                content='Guardar'
                onClick={handleFormSubmission}
              />
            </Grid.Column>
          </Grid>
        </>
      )}
    </>
  )
}

export default Create
