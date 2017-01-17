import React, { Component } from 'react'
import QrCode from 'qrcode-reader'

class FileUploader extends Component {
  constructor (props) {
    super()

    this.canUseFileApi = window.File && window.FileReader && window.FileList && window.Blob

    const qrDecoder = new QrCode()
    qrDecoder.callback = this.handleDecodeQr(props.dispatch)

    const fileReader = new FileReader()
    fileReader.onload = () => qrDecoder.decode(fileReader.result)

    this.fileReader = fileReader

    this.selectReadfile = this.selectReadfile.bind(this);
  }

  selectReadfile(e) {
    const file = e.target.files[0]
    this.fileReader.readAsDataURL(file);
  }

  handleDecodeQr (dispatch) {
    return (result, err) => {
      if (err) {
        console.log(err)
        return
      }
      dispatch('setTextByQr', result)
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>ファイル選択（カメラ起動）テスト</h1>
          <button onClick={this.props.backToLinks}>戻る</button>
        </header>
        <main>
          <div>
            {this.canUseFileApi ?
              <input type="file" accept="image/*" capture="camera" onChange={this.selectReadfile} /> :
              <div>The File APIs are not fully  in this browser.</div>
            }
          </div>
          <div>
            {this.props.textByQr}
          </div>
        </main>
      </div>
    )
  }
}

export default FileUploader
