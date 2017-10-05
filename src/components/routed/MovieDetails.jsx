import React, { Component } from 'react';
import Spinner from '../shared/SpinnerCentered'

export default class MovieDetails extends Component {
  state = {
    loading: true
  }
  render () {
    if(this.state.loading) {
      return <Spinner size="lg" type="inverted"></Spinner>
    }
    return (
      <main></main>
    );
  }
}