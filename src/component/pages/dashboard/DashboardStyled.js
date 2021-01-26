import styled from 'styled-components'
import PexelsBackground from '../../Images/pexels-pixabay.jpg'

export const MainContainer = styled.main`
  text-align: left;
  // background: url(${PexelsBackground});
  height: 100vh;
  .flex-container {
    display: flex;
    //padding: 5% 20%;
  }
`

export const BannerContainer = styled.div`
  height: 165px;
  border: 1px solid ${props => props.theme.MainColor};
  padding: 0 50px;
`

export const SubNav = styled.div`
  padding: 6px;
  margin: 5px;
  height: 50px;
  border: solid 1px #282c34;
  border-radius: 4px;
  width: 40%;
  .link {
    margin: 26px;
    text-decoration: none;
    font-size: 20px;
  }
`
