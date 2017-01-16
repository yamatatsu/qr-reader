import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const initialState = {
  disp: 'Links',
  textByQr: null,
}

const actions = {
  changeDisp: (state, disp) => ({ ...state, disp }),
  setTextByQr: (state, textByQr) => ({ ...state, textByQr })
}

render(initialState, initDispatcher(actions))

function initDispatcher (actions) {
  function dispatcher (state) {
    return (actionName, ...args) => {
      const newState = actions[actionName](state, ...args)

      if (module.hot) {
        module.hot.dispose(data => data.state = newState)
      }
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
