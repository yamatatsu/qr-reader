import React from 'react'
import QrReader from 'react-qr-reader'

export default ({ textByQr, backToLinks, dispatch }) => (
  <div>
    <header>
      <button onClick={backToLinks}>戻る</button>
    </header>

    <div>
      {
        textByQr ?
          <button onClick={() => dispatch('setTextByQr', null)}>reset</button> :
          <QrReader
            previewStyle={{
              height: 240,
              width: 320,
            }}
            handleError={err => console.log(err)}
            handleScan={data => dispatch('setTextByQr', data)}
          />
      }
    </div>
    <div>{textByQr}</div>
  </div>
)
