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

const dispatcher = initDispatcher(actions)
dispatcher(initialState)()

function initDispatcher (actions) {
  function dispatcher (state) {
    return (actionName, ...args) => {
      const newState = (actionName && actions[actionName]) ? actions[actionName](state, ...args) : state
      render(newState, dispatcher)
    }
  }
  return dispatcher
}

function render (state, dispatcher) {
  if (module.hot) {
    const rootProps = (module.hot.data) ? module.hot.data.state : { ...state, dispatch: dispatcher(state) }
    module.hot.dispose(data => data.state = rootProps)

    ReactDOM.render(
      <App {...rootProps} />,
      document.getElementById('root')
    )
  }
}

if (module.hot) {
  module.hot.accept()
}
