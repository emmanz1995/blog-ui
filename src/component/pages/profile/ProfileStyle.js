import styled from 'styled-components'

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  .profile__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .profile__container {
    display: flex;
    flex-direction: column;
    text-align: left;
    border: 1px solid black;
    width: 30%;
    hr {
      color: black;
    }
  }
  .btn-flex {
    display: flex;
    justify-content: space-between;
  }
  .btn-bin {
    margin: 5px 10px;
    background-color: ${props => props.theme.MainColor};
    border: none;
    &:hover {
      background-color: #0275d8;
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
  text-align: left;
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


export {
    MainWrapper
}
