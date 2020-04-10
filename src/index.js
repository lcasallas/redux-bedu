import React from 'react';
import ReactDOM from 'react-dom';
import './css/iconos.css';
import './css/index.css';
import App from './components/App';
//Store
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
//Reducers
import reducers from './reducers/';

const store = createStore(
  reducers, //reducers
  {}, //Estado inicial
  applyMiddleware(reduxThunk) //MiddleWares
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
