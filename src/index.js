import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const initialState = {
  disp: 'Links',
  textByQr: null,
}

const actions = {
  changeDisp: (state, disp) => ({ ...state, disp, textByQr: null }),
  setTextByQr: (state, textByQr) => ({ ...state, textByQr })
}

const dispatcher = initDispatcher(actions)
dispatcher(initialState)()

function initDispatcher (actions) {
  function dispatcher (state) {
    return (actionName, ...args) => {
      console.log(`dispatched actionName: ${actionName}, args: [${args.join(', ')}]`)
      const newState = (actionName && actions[actionName]) ? actions[actionName](state, ...args) : state
      render(newState, dispatcher)
    }
  }
  return dispatcher
}

function render (state, dispatcher) {
  let rootProps = { ...state, dispatch: dispatcher(state) }
  if (module.hot) {
    rootProps = (module.hot.data) ? module.hot.data.state : rootProps
    module.hot.dispose(data => data.state = rootProps)
  }
  ReactDOM.render(
    <App {...rootProps} />,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept()
}
