import React from 'react'
import FileUploader from './components/FileUploader'
import QrReader from './components/QrReader'

export default (props) => {
  const { dispatch, textByQr } = props

  const to = disp => () => dispatch('changeDisp', disp)

  const backToLinks = to('Links')

  switch (props.disp) {
    case 'FileUploader': {
      return <FileUploader backToLinks={backToLinks} />
    }
    case 'QrReader': {
      return <QrReader {...{ textByQr, backToLinks, dispatch }} />
    }

    default: {
      return (
        <ul>
          {['FileUploader', 'QrReader'].map((text) => (
            <li key={text}>
              <a href="#" onClick={to(text)}>{text}</a>
            </li>
          ))}
        </ul>
      )
    }
  }
}
