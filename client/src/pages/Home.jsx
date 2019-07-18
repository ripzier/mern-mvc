import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const Home = () => {
  return (
    <>
      <Header as='h1' textAlign='center'>
        MVC con Express, React y MongoDB
      </Header>
      <Container text textAlign='justified'>
        Esta página es un demo de la construcción de una aplicación web con
        arquitectura MVC, donde el componente de modelos está hecho en MongoDB,
        el componente de vistas está hecho en React, y el componente de
        controlodares está hecho en Express.js.
      </Container>
    </>
  )
}

export default Home
