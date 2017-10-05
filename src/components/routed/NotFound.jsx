import React from 'react'
import styled from 'styled-components'
import Link from '../shared/LinkReset'
import Button from 'elemental/lib/components/Button'

const Centered = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`
const Header404 = styled.h1`
  opacity: 0.5;
  color: white;
  font-size: 3em;
`
const Donger = styled.p`
  font-size: 2em;
  margin-top: .5em;
`

const NotFound = () => (
  <Centered>
    <Header404>404</Header404>
    <div>
      Aqu&iacute; no hay nada
      <Donger>¯\_(ツ)_/¯</Donger>
    </div>
    <Link to="/"><Button>Volver al inicio</Button></Link>
  </Centered>
)

export default NotFound
