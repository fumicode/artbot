import React from 'react';
import path from 'path';

export default class Stamp extends React.Component {
  constructor(props){
    super();

  }


  render () {
    const scale_disp_cm   = this.props.scale_disp_cm  ;
    const scale_disp_real = this.props.scale_disp_real;

    const stamp = this.props.stamp;
    const index = this.props.index;

    const x = this.props.x;
    const y = this.props.y;

    const artworkState = this.props.artworkState;

    return pug`
      .stamp(style={ top: y * scale_disp_cm, left:x * scale_disp_cm, 
        width:(scale_disp_cm * 10 +"px"), height:(scale_disp_cm * 10 +"px") }
        onClick     =${((e)=>this.props.onClick     (e, stamp,index, artworkState))}
        onDragEnter =${((e)=>this.props.onDragEnter (e, stamp,index, artworkState))}
        onDrag      =${((e)=>this.props.onDrag      (e, stamp,index, artworkState))}
        onDragEnd   =${((e)=>this.props.onDragEnd   (e, stamp,index, artworkState))}

        onTouchStart=${((e)=>this.props.onDragEnter (e, stamp,index, artworkState))}
        onTouchMove =${((e)=>this.props.onDrag      (e, stamp,index, artworkState))}
        onTouchEnd  =${((e)=>this.props.onDragEnd   (e, stamp,index, artworkState))} )

        img.stamp__img(
          style={ width:(scale_disp_cm * 10 +"px"), height:(scale_disp_cm * 10 +"px") } 
          src=${path.join("/images/stamps/600/",stamp.image)})

        if(this.props.selected)
          .stamp__boundBox
            .stamp__sizePoint.--tl
            .stamp__sizePoint.--tr
            .stamp__sizePoint.--bl
            .stamp__sizePoint.--br

            .stamp__rotateBar
            .stamp__rotatePoint
          
          
    `;
  }
}






