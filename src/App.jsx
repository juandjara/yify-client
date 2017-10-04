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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
const H1 = styled.h1`
  font-weight: 500;
  margin: 0;
  color: white;
  font-size: 2em;
  & .material-icons {
    vertical-align: middle;
    margin-left: 5px;
    margin-bottom: 5px;
  }
`
const Input = styled.input`
  background: white;
  padding: .5em;
  border: none;
  font-size: 1rem;
`
const SearchForm = styled.form`
  display: flex;
  & .material-icons {
    padding: 5px;
  }
`
const Root = styled.div`
  background: #2c3e50;
  color: white;
  min-height: 100vh;
`

class App extends Component {
  state = {query: ""}
  handleChange = ev => {
    const {value} = ev.target
    this.setState({query: value})
  }
  handleSubmit = ev => {
    ev.preventDefault()
  }
  render() {
    return (
      <BrowserRouter> 
        <Root>
          <Header>
            <H1>
              <Link to="/">Palomovies</Link>
              <small>
                <a href="https://palomitas-dl.fuken.xyz"
                   rel="noopener noreferrer"
                   target="_blank"
                   style={{color: 'white'}}>
                  <i className="material-icons">local_movies</i>
                </a>
              </small>
            </H1>
            <SearchForm onSubmit={this.handleSubmit}>
              <i title="" className="material-icons">search</i>
              <Input
                placeholder="Escribe para buscar pelis"
                value={this.state.query}
                onChange={this.handleChange}
              />
              <input type="submit" hidden />
            </SearchForm>
          </Header>
          <Switch>
            <Route path="/" exact component={MovieList} />
            <Route component={NotFound} />
          </Switch>
        </Root>
      </BrowserRouter>
    );
  }
}

export default App;
