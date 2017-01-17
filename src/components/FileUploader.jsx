import React from 'react'
import QrCode from 'qrcode-reader'

const canUseFileApi = window.File && window.FileReader && window.FileList && window.Blob

const qrDecoder = new QrCode()
const fileReader = new FileReader()
fileReader.onload = () => {
  qrDecoder.decode(fileReader.result)
}

export default (props) => {
  const { textByQr, backToLinks, dispatch } = props

  const selectReadfile = (e) => {
    const file = e.target.files[0]
    fileReader.readAsDataURL(file);
  }

  qrDecoder.callback =(result, err) => {
    if (err) {
      console.log(err)
      return
    }
    dispatch('setTextByQr', result)
  }

  return (
    <div>
      <header>
        <h1>ファイル選択（カメラ起動）テスト</h1>
        <button onClick={backToLinks}>戻る</button>
      </header>
      <main>
        <div>
          {canUseFileApi ?
            <input type="file" accept="image/*" capture="camera" onChange={selectReadfile} /> :
            <div>The File APIs are not fully  in this browser.</div>
          }
        </div>
        <div>
          {textByQr}
        </div>
      </main>
    </div>
  )
}
