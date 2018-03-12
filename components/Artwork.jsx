import React from 'react';
import path from 'path';

import Stamp from './Stamp.jsx';

export default class Artwork extends React.Component {

  constructor(props){
    super();

    //とりあえず本物で設定してみる
    //次にレンダーする
    this.state = {
      scale_px_cm:null,
    };
  }

  measureScale(props){
    //描画しようとしたcm
    console.log("------measure-------");

    const realWidth = parseInt(props.realWidth); // 30cm -> 30

    console.log("realWidth");
    console.log(realWidth);

    //描画した結果
    const printArea = this.refs.printArea;

    //描画したpx
    const realWidthPx  = printArea.clientWidth;

    console.log("realWidthPx");
    console.log(realWidthPx);
    //px / cm  ・・・cmを掛けるとpxにしてくれる
    const scale_px_cm =  realWidthPx / realWidth ; //dpi依存値

    console.log("scale_px_cm");
    console.log(scale_px_cm);


    console.log("-------------");

    return scale_px_cm;
  }

  /*
    if(props.displayReal){
      this.setState({
        renderWidth:props.realWidth,
        renderHeight:props.realHeight,
        scale_px_cm,
        scale_disp_real:1,
        scale_disp_cm: 1 * scale_px_cm
      });
      return ;
    }

      renderWidth:props.realWidth,
      renderHeight:props.realHeight,
      scale_px_cm:1,
      scale_disp_real:1,
      scale_disp_cm:1

  */

  componentDidMount(){
    //暫定のcm描画から、this.state.scale_px_cmがわかる
    const scale_px_cm = this.measureScale(this.props);


    //これによって再描画する。
    this.setState({ 
      scale_px_cm //これだけは、かわらないもの。
    });
   
  }



  render () {
    //一度cmでレンダリングしてみてから、pxを測り、表示したい大きさに合わせて縮小表示する。
    //これが実行されたあとに、レンダリング前に、componentDidMountが呼ばれ、changeSizeが呼ばれる。
    //これにより、scaple_px_cmがわかるのが大事


    const noBorder = this.props.noBorder || false;

    let scale_px_cm     ;
                          
    let realWidth       ;
    let realHeight      ;
                          
    let realWidthPx     ;
    let realHeightPx    ;
                          
    let displayWidth    ;
    let scale_disp_real ;
                          
                          
    let scale_disp_cm   ;
                          
    let renderWidth     ;
    let renderHeight    ;

    if(this.state.scale_px_cm){
      console.log("render with scale_px_cm");

      scale_px_cm     = this.state.scale_px_cm;

      realWidth       = parseInt(this.props.realWidth);
      realHeight      = parseInt(this.props.realHeight);

      realWidthPx     = scale_px_cm * realWidth;
      realHeightPx    = scale_px_cm * realHeight;

      displayWidth    = this.props.displayWidth;
      scale_disp_real = displayWidth / realWidthPx; // ( 表示したい/本当)


      scale_disp_cm   = scale_disp_real * scale_px_cm;

      renderWidth     = (scale_disp_cm  * realWidth )+ "px";
      renderHeight    = (scale_disp_cm  * realHeight)+ "px";

      console.log("scale_px_cm");
      console.log(scale_px_cm);
      console.log("scale_disp_real");
      console.log(scale_disp_real);
      console.log("scale_disp_cm");
      console.log(scale_disp_cm);

      console.log("renderWidth");
      console.log(renderWidth);
    }
    else{
      console.log("render with cm");
      //scaleがまだないのであれば、馬鹿正直にcmで描画してみる。

      renderWidth     =  this.props.realWidth  ;
      renderHeight    =  this.props.realHeight ;

      console.log("renderWidth");
      console.log(renderWidth);

      scale_disp_cm   = 1; //わかんないけどね
      scale_disp_real = 1; //わかんないけど、stampでエラーが出なければおk

    }
    
    return pug`
      .artwork(onTouchMove=${(e)=>e.preventDefault()})
        if !noBorder
          .artwork__printBorder
        .artwork__printArea(style={
          width: renderWidth , height: renderHeight }
          ref="printArea")
          .artwork__inner
            each stamp,index in this.props.artwork.stamps
              Stamp(key=${stamp.image}
                scale_disp_cm=${scale_disp_cm}
                scale_disp_real=${scale_disp_real}
                x=${stamp.transform.position.x}
                y=${stamp.transform.position.y}
                stamp=${stamp} index=${index}
                artworkState = ${this.state}
                selected=${this.props.selectedStampIndex == index }
                stampChanged=this.props.stampChanged

                onClick     = ${this.props.onClick    }
                onDragEnter = ${this.props.onDragEnter}
                onDrag      = ${this.props.onDrag     }
                onDragEnd   = ${this.props.onDragEnd  } )

    `;
  }
}






