import React from 'react';
import path from 'path';

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
        scale_disp_cm:1
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

    console.log(scale_disp_cm)

    return pug`
      .artwork(onTouchMove=${(e)=>e.preventDefault()})
        if !noBorder
          .artwork__printBorder
        .artwork__printArea(style={
          width: this.state.renderWidth , height: this.state.renderHeight }
          ref="printArea")
          .artwork__inner
            each stamp,index in this.props.artwork.stamps
              .stamp(style={
                top: stamp.transform.position.y * scale_disp_cm  ,
                left:stamp.transform.position.x * scale_disp_cm  ,
                transform:"scale("+scale_disp_real+","+scale_disp_real+")"} 

                onClick=${((e)=>this.props.onClick(e, stamp,index, this.state))}
                onDragEnter=${((e)=>this.props.onDragEnter(e, stamp,index, this.state ))}
                onDrag=${((e)=>this.props.onDrag(e, stamp,index, this.state ))}
                onDragEnd=${((e)=>this.props.onDragEnd(e, stamp,index, this.state))}

                key=${index})

                img.stump__img(src=${path.join("/images/stamps/600/",stamp.image)})
    `;
  }
}






