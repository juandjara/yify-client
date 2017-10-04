import React, { Component } from 'react';
import styled from 'styled-components'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Link from './components/shared/LinkReset'

import MovieList from './components/routed/MovieList'
import NotFound from './components/routed/NotFound'

const Header = styled.header`
  background: black;
  color: white;
  padding: 0.5em;
`
const H1 = styled.h1`
  font-weight: 500;
  margin: .5rem;
`

class App extends Component {
  render() {
    return (
      <BrowserRouter> 
        <div>
          <Header>
            <H1><Link to="/">Palomovies</Link></H1>
          </Header>
          <Switch>
            <Route path="/" exact component={MovieList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
