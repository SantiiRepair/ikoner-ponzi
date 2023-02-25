import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./App.css";
import axios from "axios";
axios.defaults.withCredentials = false; // true

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
