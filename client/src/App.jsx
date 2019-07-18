import React from 'react'
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from 'react-router-dom'
import { Container, Menu, Segment } from 'semantic-ui-react'

import Home from './pages/Home'
import Authors from './pages/authors'
import Books from './pages/books'

const App = () => {
  return (
    <Container>
      <Router>
        <Segment inverted>
          <Menu as='nav' inverted pointing secondary>
            <Menu.Item as={NavLink} to='/' exact name='inicio' />
            <Menu.Item as={NavLink} to='/autores' name='autores' />
            <Menu.Item as={NavLink} to='/libros' name='libros' />
          </Menu>
        </Segment>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/autores' component={Authors} />
          <Route path='/libros' component={Books} />
        </Switch>
      </Router>
    </Container>
  )
}

export default App
