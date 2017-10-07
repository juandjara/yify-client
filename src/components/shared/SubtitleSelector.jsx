import React, { Component } from 'react';
import PropTypes from 'prop-types'
import axios from '../../services/axiosInstance'
import Spinner from './SpinnerCentered'
import Select from 'elemental/lib/components/FormSelect'
import styled from 'styled-components'
import Icon from './Icon'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
const ListIcon = styled(Icon)`
  padding: 8px;
  margin-right: 8px;
  cursor: pointer;
  border-radius: 50%;
  color: white;
  &:hover {
    background: rgba(255,255,255, 0.2);
  }
`

export default class SubtitleSelector extends Component {
  static propTypes = {
    imdbid: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  }
  state = {
    selectedLang: "",
    loading: true,
    subs: []
  }
  componentDidMount() {
    const {imdbid} = this.props
    axios.get(`/subs/${imdbid}`)
    .then(res => res.data)
    .then(json => {
      console.log("SUBS", json)
      this.setState({
        loading: false,
        subs: json
      })
    })
  }
  getSelectOptions() {
    return this.state.subs.map(({langLong, langShort}) => ({
      label: langLong[0].toUpperCase() + langLong.slice(1),
      value: langShort
    }))
  }
  getSelectedSubs() {
    const {subs, selectedLang} = this.state
    if(!selectedLang) {
      return []
    }
    const option = subs.filter(option => option.langShort === selectedLang)[0] || {}
    return option.subs
  }
  getSubtitleLink(subData) {
    return `https://yify-api.now.sh/subs/${this.props.imdbid}/${subData.index}`
  }
  handleSelect(subData) {
    this.props.onSelect({
      ...subData,
      link: this.getSubtitleLink(subData)
    })
  }
  render () {
    if(this.state.loading) {
      return <Spinner size="lg" type="inverted" />
    }
    const options = this.getSelectOptions()
    const subs = this.getSelectedSubs()
    return (
      <div>
        <Select
          style={{cursor: 'pointer'}}
          options={options}
          firstOption="Por favor, seleccione un lenguaje..."
          onChange={value => this.setState({selectedLang: value})} 
        />
        <List>
          {subs.map(subData => (
            <li key={subData.index}>
              <ListIcon onClick={() => this.handleSelect(subData)}>
                play_arrow
              </ListIcon>
              <a href={this.getSubtitleLink(subData)}>
                <ListIcon>file_download</ListIcon>
              </a>
              <span>{subData.name}</span>
            </li>
          ))}
        </List>
      </div>
    );
  }
}