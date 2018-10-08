import React from 'react';
import QrReader from 'react-qr-reader';
import { Set } from 'react-powerplug';

export default function App(props) {
  return (
    <Set initial={[]}>
      {({ values, remove, add }) => (
        <div>
          <div>
            <QrReader
              style={{ width: 400 }}
              handleError={err => console.log(err)}
              handleScan={data => add(data)}
              onError={console.error}
              onScan={data => !!data && add(data)}
            />
          </div>
          {values.map(text => (
            <div key={text}>
              <a href={text} target="_blank" rel="noopener noreferrer">
                {text}
              </a>
            </div>
          ))}
        </div>
      )}
    </Set>
  )
}
