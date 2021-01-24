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
    height: 280px;
    border: 1px solid #000000;
    border-radius: 2px;
    .login-btn {
      border: none;
      border-radius: 4px;
      background-color: #61dafb;
      padding: 10px;
      &:hover {
        background-color: lightskyblue;
      }
    }
    input {
      width: 100%;
      height: 50px;
    }
    button {
      border-radius: 4px;
      background-color: #61dafb;
      &:hover {
        background-color: lightskyblue;
        transition: all 0.2s ease-out;
        color: #ffffff;
      }
    }
  }
`
