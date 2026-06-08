import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// These work now because you successfully ran 'npm install'
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);