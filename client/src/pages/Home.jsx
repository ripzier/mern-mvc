import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import React from 'react'
import { Container, Header, Item, Segment } from 'semantic-ui-react'

const Home = () => {
  const client = new ApolloClient()

  return (
    <>
      <Header as='h1' textAlign='center'>
        Catálogo de libros
      </Header>
      <Container text textAlign='justified'>
        <Segment>
          <ApolloProvider client={client}>
            <Query
              query={gql`
                {
                  books {
                    id
                    title
                    genre
                    publicationDate
                    author {
                      givenName
                      lastName
                      books {
                        id
                        title
                      }
                    }
                  }
                }
              `}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(</p>

                return (
                  <Item.Group>
                    {data.books.map(
                      ({ id, title, genre, publicationDate, author }) => (
                        <Item key={id}>
                          <Item.Content>
                            <Item.Header>{title}</Item.Header>
                            <Item.Meta>{`Género: ${genre}`}</Item.Meta>
                            <Item.Meta>{`Autor: ${author.givenName} ${
                              author.lastName
                            }`}</Item.Meta>
                            <Item.Meta>{`Fecha de Publicación: ${publicationDate}`}</Item.Meta>
                            <Item.Extra>{`Otros libros del autor | ${author.books
                              .filter(book => book.id !== id)
                              .map(book => book.title)
                              .join(' | ')} |`}</Item.Extra>
                          </Item.Content>
                        </Item>
                      )
                    )}
                  </Item.Group>
                )
              }}
            </Query>
          </ApolloProvider>
        </Segment>
      </Container>
    </>
  )
}

export default Home
