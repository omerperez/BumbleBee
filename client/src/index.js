import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/index.css";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
