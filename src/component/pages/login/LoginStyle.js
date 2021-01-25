import styled from 'styled-components';
import PexelsBackground from '../../Images/pexels-pixabay.jpg'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${PexelsBackground});
  form {
    display: flex;
    flex-direction: column;
    //justify-content: center;
    padding: 15px;
    width: 400px;
    height: 380px;
    //border: 1px solid #000000;
    background-color: lightslategrey;
    border-radius: 6px;
    .login-btn {
      border: none;
      border-radius: 4px;
      background-color: #61dafb;
      padding: 10px;
      &:hover {
        background-color: lightskyblue;
        transition: all 0.2s ease-out;
        color: #ffffff;
      }
    }
    input {
      width: 100%;
      height: 40px;
      margin: 4px;
      padding: 0 10px;
      border-radius: 50px;
      border: none;
      color: #000000;
    }
    .form-input {
      display: flex;
      align-items: center;
    }
    .forg-link {
      text-decoration: none!important;
      color: #000000;
      &:hover {
        color: white;
      }
    }
  }
`
