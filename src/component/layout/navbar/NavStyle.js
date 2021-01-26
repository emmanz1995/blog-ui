import styled from 'styled-components'
import Navbar from 'react-bootstrap/Navbar'

export const StyledNavbar = styled(Navbar)`
  //height: 60px;
  background-color: ${props => props.theme.MainColor};;
  .nav-style {
    color: white;
    &:hover {
      color: grey;
    }
  }
`
