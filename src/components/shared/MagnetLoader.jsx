import React, {Component} from 'react'
import io from 'socket.io-client'
import parseMagnet from 'magnet-uri'
import { Player, BigPlayButton } from 'video-react'
import 'video-react/dist/video-react.css'
import url from 'url'
import path from 'path'
import propTypes from 'prop-types'
import Spinner from './SpinnerCentered'
import axios from 'axios'

const downloader = "https://palomitas-dl.fuken.xyz"
class MagnetLoader extends Component {
  static propTypes = {
    subtitles: propTypes.array,
    magnet: propTypes.string.isRequired
  }
  constructor() {
    super();
    this.torrents = [];
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    // setup socket.io
    this.socket = io(downloader+"/")
    this.socket.on('connect', () => {
      console.log("MagnetLoader: connected to Palomitas Downloader")
    })
    this.socket.on('interested', (hash) => {
      this.fetchTorrentFiles(hash)
      this.setState({loading: false})
    })
    this.socket.on('destroyed', (hash) => this.deleteTorrent(hash))
    this.fetchTorrents()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ videoUrl: '' })    
    if(!nextProps.magnet) {
      return;
    }

    const hash = parseMagnet(nextProps.magnet).infoHash;
    this.targetHash = hash;
    if(this.isTorrentInServer(hash)) {
      this.fetchTorrentFiles(hash);
    } else {
      this.setState({loading: true})
      this.postTorrent(nextProps.magnet);
    }
  }

  isTorrentInServer(hash) {
    return this.torrents.some(storedHash => storedHash === hash);
  }

  fetchTorrents() {
    return axios.get(`${downloader}/torrents`)
      .then(res => res.data)
      .then(json => {
        this.torrents = json.map(torrent => torrent.infoHash);
      });
  }
  fetchTorrentFiles(hash) {
    if(this.targetHash !== hash) {
      return;
    }

    return axios.get(`${downloader}/torrents/${hash}`)
    .then(res => res.data)
    .then(json => {
      console.log("MagnetLoader: torrent loaded: ", json)
      return json;
    })
    .then(json => {
      const biggestFile = this.selectBiggestFile(json.files);
      console.log("MagnetLoader: biggest file is: ", biggestFile);
      console.log("MagnetLoader: loading video URL ", downloader+biggestFile.link);
      this.setState({
        videoUrl: `${downloader}${biggestFile.link}`
      })
    })
  }
  postTorrent(magnet) {
    axios.post(`${downloader}/torrents`, {link: magnet})
  }
  deleteTorrent(hash) {
    this.torrents = this.torrents.filter(storedHash => storedHash !== hash);
  }

  selectBiggestFile(files) {
    return files.reduce((prev, next) => {
      return next.length > prev.length ? next : prev;
    });
  }

  getVideoFilename() {
    if(!this.state.videoUrl) {
      return
    }
    const urlParts = url.parse(this.state.videoUrl)
    const pathName = decodeURIComponent(urlParts.pathname)
    const extName = path.extname(pathName)
    const fileName = path.basename(pathName, extName)
    return `${fileName}.${extName}`
  }

  render() {
    const {magnet, subtitles} = this.props
    if(!magnet) {
      return null;
    }
    const loadingElement = (<Spinner size="lg" type="inverted" />);
    const videoElement = (
      <div style={{margin: '1em 0'}}>
        <Player
          style={{width: '100%', height: 'auto'}}
          src={this.state.videoUrl}
          controls
          crossOrigin="anonymous">
          <BigPlayButton className="player-btn" position="center" />
          {subtitles.map((subData, index) => (
            <track
              key={index}
              default={index === 0}
              label={subData.langLong}
              srcLang={subData.langShort}
              src={subData.link}
              kind="subtitles"
            />
          ))}
        </Player>
        <p><a download={this.getVideoFilename()} 
              href={this.state.videoUrl}>Descargar video</a></p>
      </div>
    );
    return this.state.videoUrl ? videoElement : loadingElement;
  }
}

export default MagnetLoader;
