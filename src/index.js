import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { ThemeProvider } from 'styled-components'
import * as theme from './config/theme';

const options = {
    positions: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
}

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
  </AlertProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
