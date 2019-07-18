import axios from 'axios'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'

const Create = () => {
  const [author, setAuthor] = useState({
    givenName: '',
    lastName: '',
    country: '',
    birthdate: ''
  })

  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setAuthor(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios
      .post('/api/autores', author)
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
    setAuthor({
      givenName: '',
      lastName: '',
      country: '',
      birthdate: ''
    })
  }

  return (
    <>
      {redirect ? (
        <Redirect to='/autores' push />
      ) : (
        <>
          <Header as='h2'>Crear</Header>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='Nombre'
                name='givenName'
                value={author.givenName}
                onChange={handleInputChange}
              />
              <Form.Input
                label='Apellido'
                name='lastName'
                value={author.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label='País'
                name='country'
                value={author.country}
                onChange={handleInputChange}
              />
              <DateInput
                label='Fecha de Nacimiento'
                startMode='year'
                popupPosition='bottom center'
                name='birthdate'
                preserveViewMode={false}
                animation='none'
                closable
                icon={false}
                dateFormat='YYYY-MM-DD'
                value={author.birthdate}
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
