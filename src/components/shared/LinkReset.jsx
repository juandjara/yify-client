import {Link} from 'react-router-dom'
import styled from 'styled-components'

const LinkReset = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`

export default LinkReset
