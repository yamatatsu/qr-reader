import React from 'react'
import QrReader from 'react-qr-reader'

export default (props) => {
  const { textByQr, backToLinks, dispatch, legacyMode } = props

  return (
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
              inputStyle={legacyMode && { display: 'block' }}
              handleError={err => console.log(err)}
              handleScan={data => dispatch('setTextByQr', data)}
              legacyMode={legacyMode}
            />
        }
      </div>
      <div>{textByQr}</div>
    </div>
  )
}
