import React, {Component} from 'react'
import axios from '../../axiosInstance'
import styled from 'styled-components'
import Spinner from 'elemental/lib/components/Spinner'
import Button from 'elemental/lib/components/Button'
import Icon from '../shared/Icon'

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
const GridItem = styled.a`
  position: relative;
  flex: 0 1 20%;
  min-height: 100px;
  display: block;
  @media(max-width: 60em) {
    flex-basis: 25%;
  }
  @media(max-width: 40em) {
    flex-basis: 50%;
  }
`
const MovieImage = styled.img`
  display: block;
  margin: auto;
  width: 100%;
  padding: .5em;
  transition: padding .3s ease-out;
  &:hover {
    padding: 0;
  }
`
const MovieTitle = styled.div`
  margin: 0 .5rem;  
  padding: 1rem;
  color: white;
  background: rgba(0,0,0, 0.6);
  position: absolute;
  bottom: .5rem;
  width: calc(100% - 1rem);
  font-weight: bold;
  font-size: 1.1em;
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
            <div><Icon>local_play</Icon></div>
            <p>Peliculas en version original</p>
          </IconSectionItem>
          <IconSectionItem>
            <div><Icon>language</Icon></div>
            <p>Subtitulos en todos los idiomas</p>
          </IconSectionItem>
          <IconSectionItem>
            <div><Icon>code</Icon></div>
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
            <GridItem href="/id" key={movie.id}>
              <MovieImage src={movie.medium_cover_image} alt={movie.title} />
              <MovieTitle>{movie.title}</MovieTitle>
            </GridItem>
          ))}
          </GridContainer>
          <Button disabled={loading}
                  onClick={() => this.fetchPage(page_number+1)}
                  style={{display: 'block', margin: '1em auto'}}>
            {loading ? (<Spinner></Spinner>) : (
              <span>
                <Icon>autorenew</Icon>
                <span>Cargar mas</span>
              </span>
            )}
          </Button>
        </section>
      </main>
    )
  }
}