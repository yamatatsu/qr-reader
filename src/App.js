import React from 'react'
import FileUploader from './components/FileUploader'

export default (props) => {
  if (props.disp === 'FileUploader') {
    return <FileUploader dispatch={props.dispatch} />
  }
  return (
    <ul>
      <li>
        <a href="#" onClick={() => props.dispatch('changeDisp', 'FileUploader')}>FileUploader</a>
      </li>
    </ul>
  )
}
