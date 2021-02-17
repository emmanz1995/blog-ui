import styled from 'styled-components'
import PexelsBackground from '../../Images/pexels-pixabay.jpg'

export const MainContainer = styled.main`
  text-align: left;
  // background: url(${PexelsBackground});
  height: 100vh;
  .flex-container {
    display: flex;
    //padding: 5% 20%;
    .search-form {
      display: flex;
      flex-direction: row;
    }
  }
`

export const BannerContainer = styled.div`
  height: 175px;
  border: 1px solid lightgrey;
  padding: 0 50px;
  background-color: lightgrey;
  .center-alignment {
    margin: 0 auto;
    max-width: 1070px;
  }
`

export const SubNav = styled.div`
  padding: 6px;
  margin: 5px;
  height: 50px;
  border: solid 1px #282c34;
  border-radius: 4px;
  width: 60%;
  .link {
    margin: 5px;
    text-decoration: none;
    font-size: 20px;
  }
`
