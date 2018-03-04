import React from 'react';
import path from 'path';

import Stamp from './Stamp.jsx';

export default class Artwork extends React.Component {

  constructor(props){
    super();
    this.state = {
      renderWidth:props.realWidth,
      renderHeight:props.realHeight,
      scale_px_cm:1,
      scale_disp_real:1,
      scale_disp_cm:1
    };
  }

  changeSize(props){
    const realWidth = parseInt(props.realWidth);
    const realHeight = parseInt(props.realHeight);
    const printArea = this.refs.printArea;
    const realWidthPx  = printArea.clientWidth;
    const realHeightPx = printArea.clientHeight;
    const scale_px_cm =  realWidthPx / realWidth ; //dpi依存値

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

    const displayWidth = props.displayWidth;
    const scale_disp_real = displayWidth / realWidthPx; // ( 表示したい/本当)
    const renderWidth  = (scale_disp_real * scale_px_cm * realWidth )+ "px";
    const renderHeight = (scale_disp_real * scale_px_cm * realHeight)+ "px";

    this.setState({
      renderWidth,
      renderHeight,
      scale_px_cm,
      scale_disp_real,
      scale_disp_cm:scale_disp_real * scale_px_cm
    });
  }

  componentDidMount(){
    this.changeSize(this.props)
  }




  render () {
    //一度cmでレンダリングしてみてから、pxを測り、表示したい大きさに合わせて縮小表示する。
    const noBorder = this.props.noBorder || false;

    const scale_disp_real = this.state.scale_disp_real;
    const scale_px_cm     = this.state.scale_px_cm;
    const scale_disp_cm   = this.state.scale_disp_cm;


    return pug`
      .artwork(onTouchMove=${(e)=>e.preventDefault()})
        if !noBorder
          .artwork__printBorder
        .artwork__printArea(style={
          width: this.state.renderWidth , height: this.state.renderHeight }
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

                onClick     = ${this.props.onClick    }
                onDragEnter = ${this.props.onDragEnter}
                onDrag      = ${this.props.onDrag     }
                onDragEnd   = ${this.props.onDragEnd  } )

    `;
  }
}






