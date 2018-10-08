import React from 'react'
import QrReader from 'react-qr-reader'
import { Set } from 'react-powerplug'

export default function App(props) {
  return (
    <Set>
      {({ values, remove, add }) => (
        <div>
          <div>
            <QrReader
              previewStyle={{ height: 240, width: 320 }}
              handleError={err => console.log(err)}
              handleScan={data => add(data)}
            />
          </div>
          {values.map(text => (
            <div id={text}>
              <a href={text} target='_blank' rel="noopener noreferrer">{text}</a>
            </div>
          ))}
        </div>
      )}
    </Set>
  )
}
