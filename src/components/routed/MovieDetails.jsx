import React, { Component } from 'react';
import Spinner from '../shared/SpinnerCentered'
import axios from '../../axiosInstance'

export default class MovieDetails extends Component {
  state = {
    loading: true,
    movie: {}
  }
  componentDidMount() {
    const {id} = this.props.match.params
    axios.get('/movies/id', {
      params: {movieId: id}
    })
    .then(res => res.data)
    .then(json => {
      console.log(json)
      this.setState({
        loading: false,
        movie: json.data.movie
      })
    })
  }
  render () {
    if(this.state.loading) {
      return <Spinner size="lg" type="inverted" />
    }
    return (
      <main></main>
    );
  }
}