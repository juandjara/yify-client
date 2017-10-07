import React, { Component } from 'react';
import Spinner from '../shared/SpinnerCentered'
import axios from '../../services/axiosInstance'
import styled from 'styled-components'
import Icon from '../shared/Icon'
import SubtitleSelector from '../shared/SubtitleSelector'
import ButtonGroup from 'elemental/lib/components/ButtonGroup'
import Button from 'elemental/lib/components/Button'
import MagnetLoader from '../shared/MagnetLoader'

const InfoSection = styled.section`
  display: flex;
  flex-wrap: wrap;
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
  padding: 5px 0;
  .material-icons {
    margin-right: 6px;
  }
`
const Metric = styled.strong`
  display: inline-block;
  min-width: 80px;
`
const ImageBackground = styled.div`
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
const ActorInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1em;
  border-bottom: 1px solid #eee;
  margin-bottom: 1em;
  &:last-child {
    border: none;
  }
  img {
    margin-right: 1em;
    border-radius: 50%;
  }
`
const QualityButton = styled(Button)`
  min-width: 65px;
  margin: 4px 0;
`

export default class MovieDetails extends Component {
  state = {
    loading: true,
    movie: {},
    subtitles: [],
    selectedMagnet: "",
    selectedTorrent: null,
  }
  componentDidMount() {
    const {id} = this.props.match.params
    axios.get('/movies/id', {
      params: {movieId: id}
    })
    .then(res => res.data)
    .then(json => {
      console.log(json.data.movie)
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
  addSubtitle = (subtitle) => {
    this.setState(prevState => ({
      subtitles: prevState.subtitles.concat(subtitle)
    }))
  }
  getMagnetLink(torrent) {
    return  `magnet:?xt=urn:btih:${torrent.hash}
      &tr=udp://glotorrents.pw:6969/announce
      &tr=udp://tracker.opentrackr.org:1337/announce
      &tr=udp://torrent.gresille.org:80/announce
      &tr=udp://tracker.openbittorrent.com:80
      &tr=udp://tracker.coppersurfer.tk:6969
      &tr=udp://tracker.leechers-paradise.org:6969
      &tr=udp://p4p.arenabg.ch:1337
      &tr=udp://tracker.internetwarriors.net:1337`
  }
  selectQuality(torrent) {
    this.setState({
      selectedTorrent: torrent, 
      selectedMagnet: this.getMagnetLink(torrent)
    })
  }
  render () {
    if(this.state.loading) {
      return <Spinner size="lg" type="inverted" />
    }
    const {movie, selectedTorrent, selectedMagnet, subtitles} = this.state
    return (
      <main>
        <ImageBackground background={movie.background_image}>
          <InfoSection>
            <img src={movie.medium_cover_image}
                 style={{margin: '1rem'}}
                 alt={`Medium Cover for ${movie.title}`} />
            <InfoSectionInner>
              <MovieHeader>{movie.title_long}</MovieHeader>    
              <p>
                {movie.genres.map(genre => (
                  <GenreLabel key={genre}>{genre}</GenreLabel>
                ))}
              </p>
              <IconMetricGroup>
                <Icon>access_time</Icon>
                <Metric>{movie.runtime} min.</Metric>
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
        <InfoSection>
          <div style={{margin: '0 1em'}}>
            <MovieHeader>Reparto</MovieHeader>
            {movie.cast.map(actor => (
              <ActorInfo key={actor.imdb_code} style={{display: 'flex', alignItems: 'center'}}>
                <img src={actor.url_small_image} 
                     alt={`IMDB Avatar for ${actor.name}`} />
                <div>
                  <strong>{actor.character_name}</strong>
                  <br/>
                  <span>{actor.name}</span>
                </div>
              </ActorInfo>
            ))}
          </div>
          <div style={{flex: 1, margin: '0 1em'}}>
            <MovieHeader>Sinopsis</MovieHeader>
            <p style={{lineHeight: '24px', fontSize: '16px'}}>
              {movie.description_full}
            </p>
            <MovieHeader>Video</MovieHeader>
            {!selectedMagnet && (<p>Por favor, seleccione una calidad</p>)}            
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              <div style={{marginTop: '1em', marginRight: '1em'}}>
                <ButtonGroup>
                  {movie.torrents.map(torrent => (
                    <QualityButton
                      key={torrent.quality} 
                      size="sm" type="primary"
                      onClick={() => this.selectQuality(torrent)}>
                      {torrent.quality}
                    </QualityButton>
                  ))}
                </ButtonGroup>
                {selectedTorrent && (
                  <div>
                    <p>Tamaño: <strong>{selectedTorrent.size}</strong></p>
                    <p>Seeds: <strong>{selectedTorrent.seeds}</strong></p>
                    <p>Peers: <strong>{selectedTorrent.peers}</strong></p>
                  </div>                
                )}
              </div>
              <div style={{flex: 1}}>
                <MagnetLoader subtitles={subtitles} magnet={selectedMagnet} />                
              </div>
            </div>
            <MovieHeader>Subtitulos</MovieHeader>
            <SubtitleSelector 
              imdbid={movie.imdb_code}
              onSelect={this.addSubtitle}
            />
          </div>
        </InfoSection>
      </main>
    );
  }
}