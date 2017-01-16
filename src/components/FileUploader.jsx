import React, { Component } from 'react'

class FileUploader extends Component {
  constructor () {
    super()

    this.selectReadfile = this.selectReadfile.bind(this);
  }

  selectReadfile(e) {
    var canvas = document.getElementById('mycanvas');
    if ( !this.checkFileApi() || !this.checkCanvas(canvas) ){
      return
    }

    var file = e.target.files;
    var reader = new FileReader();
    //dataURL形式でファイルを読み込む
    reader.readAsDataURL(file[0]);
    //ファイルの読込が終了した時の処理
    reader.onload = () => {
      this.readDrawImg(reader, canvas, 0, 0);
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
          <p>元画像 <span id="src-width-height">width: height: </span></p>
          <p>リサイズ <span id="dst-width-height">width: height: </span></p>
          <p><input type="file" accept="image/*" capture="camera" onChange={this.selectReadfile} /></p>
          <canvas id="mycanvas">Canvasに対応しているブラウザを使用して下さい。</canvas>
        </main>
      </div>
    )
  }

  // =======================
  // 部品

  // FileAPIに対応しているか
  checkFileApi() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
      return true;
    }
    alert('The File APIs are not fully  in this browser.');
    return false;
  }

  //canvas に対応しているか
  checkCanvas(canvas){
    if (canvas && canvas.getContext){
      return true;
    }
    alert('Not Supported Canvas.');
    return false;
  }

  readDrawImg(reader, canvas, x, y){
    var img = this.readImg(reader);
    img.onload = () => {
      var w = img.width;
      var h = img.height;
      this.printWidthHeight( 'src-width-height', true, w, h);
      // モバイルであればリサイズ
      if (this.isMobile()) {
        var resize = this.resizeWidthHeight(1024, w, h);
        this.printWidthHeight( 'dst-width-height', resize.flag, resize.w, resize.h);
        this.drawImgOnCav(canvas, img, x, y, resize.w, resize.h);
      }else{
        // モバイル以外では元サイズ
        this.printWidthHeight( 'dst-width-height', false, 0, 0);
        this.drawImgOnCav(canvas, img, x, y, w, h);
      }
    }
  }
  //ファイルの読込が終了した時の処理
  readImg(reader){
    //ファイル読み取り後の処理
    var result_dataURL = reader.result;
    var img = new Image();
    img.src = result_dataURL;
    return img;
  }
  //キャンバスにImageを表示
  drawImgOnCav(canvas, img, x, y, w, h) {
    var ctx = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, x, y, w, h);
  }
  // リサイズ後のwidth, heightを求める
  resizeWidthHeight(target_length_px, w0, h0){
    //リサイズの必要がなければ元のwidth, heightを返す
    var length = Math.max(w0, h0);
    if(length <= target_length_px){
      return{
        flag: false,
        w: w0,
        h: h0
      };
    }
    //リサイズの計算
    var w1;
    var h1;
    if(w0 >= h0){
      w1 = target_length_px;
      h1 = h0 * target_length_px / w0;
    }else{
      w1 = w0 * target_length_px / h0;
      h1 = target_length_px;
    }
    return {
      flag: true,
      w: parseInt(w1, 10),
      h: parseInt(h1, 10)
    };
  }
  printWidthHeight( width_height_id, flag, w, h) {
    var wh = document.getElementById(width_height_id);
    if(!flag){
      wh.innerHTML = "なし";
      return;
    }
    wh.innerHTML = 'width:' + w + ' height:' + h;
  }

  isMobile() {
    var _ua = (function(u){
      var mobile = {
                0: (u.indexOf("windows") !== -1 && u.indexOf("phone") !== -1)
                || u.indexOf("iphone") !== -1
                || u.indexOf("ipod") !== -1
                || (u.indexOf("android") !== -1 && u.indexOf("mobile") !== -1)
                || (u.indexOf("firefox") !== -1 && u.indexOf("mobile") !== -1)
                || u.indexOf("blackberry") !== -1,
                iPhone: (u.indexOf("iphone") !== -1),
                Android: (u.indexOf("android") !== -1 && u.indexOf("mobile") !== -1)
      };
      var tablet = (u.indexOf("windows") !== -1 && u.indexOf("touch") !== -1)
                || u.indexOf("ipad") !== -1
                || (u.indexOf("android") !== -1 && u.indexOf("mobile") === -1)
                || (u.indexOf("firefox") !== -1 && u.indexOf("tablet") !== -1)
                || u.indexOf("kindle") !== -1
                || u.indexOf("silk") !== -1
                || u.indexOf("playbook") !== -1;
      var pc = !mobile[0] && !tablet;
      return {
        Mobile: mobile,
        Tablet: tablet,
        PC: pc
      };
    })(window.navigator.userAgent.toLowerCase())

    return _ua.Mobile[0]
  }
}

export default FileUploader
