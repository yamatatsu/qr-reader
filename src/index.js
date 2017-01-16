import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const state = {
  disp: 'Links',
}

const actions = {
  changeDisp: (state, disp) => ({ ...state, disp })
}

render(state, initDispatcher(actions))

function initDispatcher (actions) {
  function dispatcher (state) {
    return (actionName, ...args) => {
      const newState = actions[actionName](state, ...args)
      render(newState, dispatcher)
    }
  }
  return dispatcher
}

function render (state, dispatcher) {
  ReactDOM.render(
    <App {...state} dispatch={dispatcher(state)} />,
    document.getElementById('root')
  )
}
