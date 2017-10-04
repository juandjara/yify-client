import React, {Component} from 'react'
import axios from '../../axiosInstance'

export default class MovieList extends Component {
  componentDidMount() {
    axios.get('/movies')
    .then(res => res.data)
    .then(console.log)
  }
  render() {
    return (
      <main></main>
    )
  }
}