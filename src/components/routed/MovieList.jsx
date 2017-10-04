import React, {Component} from 'react'
import axios from '../../axiosInstance'
import styled from 'styled-components'
import Spinner from 'elemental/lib/components/Spinner'

const Section = styled.section`
  display: flex;
  margin-top: 2em;
`
const IconSectionItem = styled.div`
  flex: 50%;
  text-align: center;
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

export default class MovieList extends Component {
  state = {
    movies: [],
    movie_count: 0,
    loading: true
  }
  componentDidMount() {
    axios.get('/movies')
    .then(res => res.data)
    .then(console.log)
  }
  render() {
    const {movies, movie_count, loading} = this.state
    return (
      <main>
        <Section>
          <IconSectionItem>
            <div><i className="material-icons">movie</i></div>
            <p>Peliculas en version original</p>
          </IconSectionItem>
          <IconSectionItem>
            <div><i className="material-icons">closed_caption</i></div>
            <p>Subtitulos en todos los idiomas</p>
          </IconSectionItem>
          <IconSectionItem>
            <div><i className="material-icons">code</i></div>
            <p>
              <a href="https://github.com/juandjara/yify-client">Proyecto</a> 
              {' '} de codigo abierto. Contribuciones bienvenidas
            </p>
          </IconSectionItem>
        </Section>
        {loading ? (
          <SpinnerCentered size="lg" type="inverted" />
        ) : (
          <Section>
            <p>Mostrando {movie_count} de {movies.length} peliculas</p>
          </Section>
        )}
      </main>
    )
  }
}