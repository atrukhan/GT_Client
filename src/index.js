import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './store/store';

import './api/18n';

const store = new Store();

export const Context = createContext({store});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Context.Provider value={store}>
      <App />
    </Context.Provider>
    
  // </React.StrictMode>
);

reportWebVitals();
