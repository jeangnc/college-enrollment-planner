import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import App from './app'
import './app.css';

function renderApp(initialState) {
  const store = createStore(reducer, initialState)

  window.store = store;

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#container')
  );
}

fetch('/course/1').then(response => {
  response.json().then(json => {
    renderApp(json);
  });
});
