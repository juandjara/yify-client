import React, {Component} from 'react'
import axios from '../../axiosInstance'
import styled from 'styled-components'
import Spinner from 'elemental/lib/components/Spinner'
import {Button} from 'elemental'

const Section = styled.section`
  display: flex;
  margin-top: 2em;
  @media(max-width: 600px) {
    display: block;
  }
`
const IconSectionItem = styled.div`
  text-align: center;
  flex: 1;
  & .material-icons {
    font-size: 3.2em;
  }
  & > p {
    font-size: 1.2em;
  }
`
const SpinnerCentered = styled(Spinner)`
  display: block;
  margin: auto;
`
const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`
const MovieImage = styled.img`
  flex: 0 1 25%;
`

export default class MovieList extends Component {
  state = {
    movies: [],
    movie_count: 0,
    page_number: 0,
    loading: true
  }
  componentDidMount() {
    this.fetchPage(0)
  }
  fetchPage(page) {
    this.setState({loading: true})
    axios.get('/movies', {
      params: {page}
    })
    .then(res => res.data)
    .then(json => {
      const {movie_count, movies, page_number} = json.data
      this.setState(prevState => ({
        movies: prevState.movies.concat(movies),
        movie_count,
        page_number,
        loading: false
      }))
    })
  }
  render() {
    const {movies, movie_count, page_number, loading} = this.state
    return (
      <main>
        <Section>
          <IconSectionItem>
            <div><i className="material-icons">local_play</i></div>
            <p>Peliculas en version original</p>
          </IconSectionItem>
          <IconSectionItem>
            <div><i className="material-icons">language</i></div>
            <p>Subtitulos en todos los idiomas</p>
          </IconSectionItem>
          <IconSectionItem>
            <div><i className="material-icons">code</i></div>
            <p>
              Proyecto de codigo abierto. Todas las 
              {' '}<a href="https://github.com/juandjara/yify-client">contribuciones</a> 
              {' '}son bienvenidas
            </p>
          </IconSectionItem>
        </Section>
        {loading && <SpinnerCentered size="lg" type="inverted" />}
        <section>
          <p style={{margin: '1rem'}}>
            Mostrando {movies.length} de {movie_count} peliculas
          </p>
          <GridContainer>
          {movies.map(movie => (
            <MovieImage
              key={movie.id}
              src={movie.medium_cover_image} 
              alt={movie.title}
            />
          ))}
          </GridContainer>
          <Button disabled={loading}
                  onClick={() => this.fetchPage(page_number+1)}
                  style={{display: 'block', margin: '1em auto'}}>
            {loading ? (<Spinner></Spinner>) : (
              <span>
                <i style={{verticalAlign: 'middle'}} 
                   className="material-icons">autorenew</i>,
                <span>Cargar mas</span>
              </span>
            )}
          </Button>
        </section>
      </main>
    )
  }
}