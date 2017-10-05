import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from './LinkReset'
import Icon from './Icon'

const StyledHeader = styled.header`
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
  color: #333;
`
const SearchForm = styled.form`
  display: flex;
  & .material-icons {
    padding: 5px;
  }
`

export default class Header extends Component {
  state = {
    query: ""
  }
  static contextTypes = {
    router: PropTypes.object
  }
  handleSubmit = ev => {
    ev.preventDefault()
    const {query}   = this.state
    const {history} = this.context.router
    history.push(`/movies?q=${query}`)
  }
  handleChange = ev => {
    const {value} = ev.target
    this.setState({query: value})
  }
  render () {
    return (
      <StyledHeader>
        <H1>
          <Link to="/">Palomovies</Link>
          <small>
            <a href="https://palomitas-dl.fuken.xyz"
              rel="noopener noreferrer"
              target="_blank"
              style={{color: 'white'}}>
              <Icon>local_movies</Icon>
            </a>
          </small>
        </H1>
        <SearchForm onSubmit={this.handleSubmit}>
          <Icon>search</Icon>
          <Input
            placeholder="Escribe para buscar pelis"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <input type="submit" hidden />
        </SearchForm>
      </StyledHeader>
    );
  }
}