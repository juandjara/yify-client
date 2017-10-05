import React, { Component } from 'react';
import Spinner from '../shared/SpinnerCentered'
import axios from '../../services/axiosInstance'
import styled from 'styled-components'
import Icon from '../shared/Icon'

const InfoSection = styled.section`
  display: flex;
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
`
const MovieHeader = styled.h2`
  color: white;
  margin: 1rem 0;
  font-weight: bold;
  text-shadow: 0 2px 2px rgba(0,0,0,.4);
`
const InfoSectionInner = styled.div`
  margin: 1rem;
`
const IconMetricGroup = styled.div`
  padding: 4px 0;
  .material-icons {
    margin-right: 6px;
  }
`
const Metric = styled.strong`
  display: inline-block;
  min-width: 70px;
`
const ImageBackground = styled.main`
  background: url(${props => props.background}) no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`
const GenreLabel = styled.small`
  display: inline-block;
  margin-right: 8px;
  background: #2980b9;
  padding: 3px 6px;
  border-radius: 3px;
  font-weight: bold;
`

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
      console.log(json.data)
      this.setState({
        loading: false,
        movie: json.data.movie
      })
    })
  }
  getDate(movie) {
    const date = new Date(movie.date_uploaded_unix * 1000)
    let day = date.getDate()
        day = day < 10 ? "0"+day : day
    let month = date.getMonth()
        month = month < 10 ? "0"+month : month
    const year = date.getFullYear().toString().slice(2)
    return `${day}/${month}/${year}`
  }
  render () {
    if(this.state.loading) {
      return <Spinner size="lg" type="inverted" />
    }
    const {movie} = this.state
    return (
      <ImageBackground background={movie.background_image}>
        <InfoSection>
          <img src={movie.medium_cover_image} 
               alt={`Medium Cover for ${movie.title}`} />
          <InfoSectionInner>
            <MovieHeader>{movie.title_long}</MovieHeader>    
            <p>
              {movie.genres.map(genre => <GenreLabel key={genre}>{genre}</GenreLabel>)}
            </p>        
            <IconMetricGroup>
              <Icon>access_time</Icon>
              <Metric>{movie.runtime}</Metric>
              <span>Duraci&oacute;n</span>
            </IconMetricGroup>
            <IconMetricGroup>
              <Icon>visibility</Icon>
              <Metric>{movie.mpa_rating}</Metric>
              <span>Clasificaci&oacute;n por edades</span>
            </IconMetricGroup>
            <IconMetricGroup>
              <Icon>thumb_up</Icon>
              <Metric>{movie.like_count}</Metric>
              <span>Me gusta</span>
            </IconMetricGroup>
            <IconMetricGroup>
              <Icon>assessment</Icon>
              <Metric>{movie.rating}</Metric>
              <span>Puntuaci&oacute;n IMDB</span>
            </IconMetricGroup>
            <IconMetricGroup>
              <Icon>file_download</Icon>
              <Metric>{movie.download_count}</Metric>
              <span>Descargas</span>
            </IconMetricGroup>
            <IconMetricGroup>
              <Icon>language</Icon>
              <Metric>{movie.language}</Metric>
              <span>Idioma</span>
            </IconMetricGroup>
            <IconMetricGroup>
              <Icon>event</Icon>
              <Metric>{this.getDate(movie)}</Metric>
              <span>Fecha de subida</span>
            </IconMetricGroup>
          </InfoSectionInner>
        </InfoSection>
      </ImageBackground>
    );
  }
}