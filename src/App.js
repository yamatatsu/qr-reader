import React from 'react'
import QrReader from './components/QrReader'

export default (props) => {
  const { dispatch, textByQr } = props

  const to = disp => () => dispatch('changeDisp', disp)

  const backToLinks = to('Links')

  switch (props.disp) {
    case 'FileUploader': {
      return <QrReader legacyMode {...{ textByQr, backToLinks, dispatch } } />
    }
    case 'QrReader': {
      return <QrReader {...{ textByQr, backToLinks, dispatch }} />
    }

    default: {
      return (
        <ul>
          <li>
            <a href="#" onClick={to('QrReader')}>video type</a>
          </li>
          <li>
            <a href="#" onClick={to('FileUploader')}>file upload type</a>
          </li>
        </ul>
      )
    }
  }
}
