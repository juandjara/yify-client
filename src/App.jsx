import React, { Component } from 'react';
import styled from 'styled-components'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Header from './components/shared/Header'

import MovieList from './components/routed/MovieList'
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
        <Route path="/" exact component={MovieList} />
        <Route component={NotFound} />
      </Switch>
    </Root>
  </BrowserRouter>
)

export default App;
