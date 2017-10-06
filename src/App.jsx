import React from 'react';
import styled from 'styled-components'
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import Header from './components/shared/Header'

import MovieList from './components/routed/MovieList'
import MovieDetails from './components/routed/MovieDetails'
import NotFound from './components/routed/NotFound'

const Root = styled.div`
  background: #2c3e50;
  color: white;
  min-height: 100vh;
  padding-bottom: 2em;
`

const App = () => (
  <BrowserRouter> 
    <Root>
      <Header />
      <Switch>
        <Route path="/" exact render={() => (<Redirect to="/movies" />)} />
        <Route path="/movies" exact component={MovieList} />
        <Route path="/movies/:id/:imdbid/:slug" component={MovieDetails} />
        <Route component={NotFound} />
      </Switch>
    </Root>
  </BrowserRouter>
)

export default App;
