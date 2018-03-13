import React from 'react';
import path from 'path';
import Vec2 from './lib/Vec2';
import Angle from './lib/Angle';

export default class Stamp extends React.Component {
  constructor(props){
    super();

    this.onClick = (e, stamp, index)=>{
      e.stopPropagation();
      this.props.onClick(e, stamp,index)
    }
  }

  //rotate//
  onRotateTouchStart(e, stamp,index){
    e.stopPropagation();
    const stampRect = this.refs.theStamp.getBoundingClientRect();
    const stampCenter = new Vec2(stampRect.x + stampRect.width/2, stampRect.y + stampRect.height/2);
    //基準の大きさを用意 ・・・いつも同じだと思うけど

    this.rotateDragInfo = { 
      stampCenter
    } 
  }

  onRotateTouchMove(e, stamp, index){
    console.log("not dragging");
    if(!this.rotateDragInfo ){
      console.log("not dragging");
      return;
    }

    const mainTouch =  e.touches && e.touches[0];
    const pageX = mainTouch ? mainTouch.pageX : e.pageX;
    const pageY = mainTouch ? mainTouch.pageY : e.pageY;




    console.log("touching");
    e.stopPropagation();

    const draggingPoint =  new Vec2(pageX, pageY);

    //中心から、今の場所へのベクトル
    const moveVec = draggingPoint.getSub(this.rotateDragInfo.stampCenter);


    const angle = new Angle(moveVec.getTheta()); //radian

    angle.add( -Math.PI/2 );

    console.log("moveVec");
    console.log(moveVec);
    console.log("moveVec angle");
    console.log(angle);

    this.props.stamp.transform.rotate = angle.getDeg()
    this.setState({})

  }

  onRotateTouchEnd(e, stamp,index){
    e.stopPropagation();

    console.log("rotate touch end");

    this.rotateDragInfo = null;


    this.props.stampChanged();
  }





  onSizeTouchStart(e, stamp,index){
    e.stopPropagation();
    /*
    const mainTouch =  e.touches && e.touches[0];
    const pageX = mainTouch ? mainTouch.pageX : e.pageX;
    const pageY = mainTouch ? mainTouch.pageY : e.pageY;

    const dragStartPoint = new Vec2(pageX, pageY);
    */

    const stampRect = this.refs.theStamp.getBoundingClientRect();
    const stampCenter = new Vec2(stampRect.x + stampRect.width/2, stampRect.y + stampRect.height/2);

    //基準の大きさを用意 ・・・いつも同じだと思うけど


    //中心から、ドラッグポイントまでの距離
    //スタンプは基本10cm
    const baseSize = this.props.scale_disp_cm * (10/2 * 1.414);

    this.sizeDragInfo = { 
      stampCenter,
      baseSize
    } 
  }

  onSizeTouchMove(e, stamp, index){
    console.log("not dragging");
    if(!this.sizeDragInfo ){
      console.log("not dragging");
      return;
    }

    const mainTouch =  e.touches && e.touches[0];
    const pageX = mainTouch ? mainTouch.pageX : e.pageX;
    const pageY = mainTouch ? mainTouch.pageY : e.pageY;




    console.log("touching");
    e.stopPropagation();

    const draggingPoint =  new Vec2(pageX, pageY);

    //中心から、今の場所へのベクトル
    const moveVec = draggingPoint.getSub(this.sizeDragInfo.stampCenter);


    console.log("moveVec");
    console.log(moveVec);


    console.log("bigRatio");
    const resizeRatio = moveVec.getLength() / this.sizeDragInfo.baseSize;
    const nextRatio =  resizeRatio;

    console.log(resizeRatio );

    this.props.stamp.transform.scale={w:nextRatio , h:nextRatio }
    this.setState({})

  }

  onSizeTouchEnd(e, stamp,index){
    console.log("touch end");

    this.sizeDragInfo = null;

    this.props.stampChanged();

    e.stopPropagation();
  }

  render () {
    const scale_disp_cm   = this.props.scale_disp_cm  ;
    const scale_disp_real = this.props.scale_disp_real;

    const stamp = this.props.stamp;
    const index = this.props.index;

    const x = this.props.x;
    const y = this.props.y;


    return pug`
      .stamp(
        style={ top: y * scale_disp_cm, left:x * scale_disp_cm, 
          width:(stamp.transform.scale.w * scale_disp_cm * 10 +"px"), height:(stamp.transform.scale.h * scale_disp_cm * 10 +"px") ,
          margin:(-stamp.transform.scale.w * scale_disp_cm * 10 /2 +"px"),
          transform: "rotate("+stamp.transform.rotate+"deg) ",
          transformOrigin: "50% 50% 0" }
        ref="theStamp"

        onClick     =this.onClick
        onMouseDown  =${(e)=> {this.props.onDragEnter (e, stamp,index)}}
        onMouseMove  =${(e)=> {this.props.onDrag      (e, stamp,index, scale_disp_cm)}}
        onMouseUp    =${(e)=> {this.props.onDragEnd   (e, stamp,index)}}
        onTouchStart =${(e)=> {this.props.onDragEnter (e, stamp,index)}}
        onTouchMove  =${(e)=> {this.props.onDrag      (e, stamp,index, scale_disp_cm)}}
        onTouchEnd   =${(e)=> {this.props.onDragEnd   (e, stamp,index)}})

        img.stamp__img( src=${path.join("/images/stamps/",(this.props.printResolution?'3000':'600'),stamp.image)})

        if(this.props.selected)
          .stamp__boundBox
            .stamp__sizePoint.--tl(
              onTouchStart =${(e)=> {this.onSizeTouchStart(e, stamp, index)}}
              onTouchMove  =${(e)=> {this.onSizeTouchMove (e, stamp, index)}}
              onTouchEnd   =${(e)=> {this.onSizeTouchEnd  (e, stamp, index)}})
            .stamp__sizePoint.--tr(
              onTouchStart =${(e)=> {this.onSizeTouchStart(e, stamp, index)}}
              onTouchMove  =${(e)=> {this.onSizeTouchMove (e, stamp, index)}}
              onTouchEnd   =${(e)=> {this.onSizeTouchEnd  (e, stamp, index)}})
            .stamp__sizePoint.--bl(
              onTouchStart =${(e)=> {this.onSizeTouchStart(e, stamp, index)}}
              onTouchMove  =${(e)=> {this.onSizeTouchMove (e, stamp, index)}}
              onTouchEnd   =${(e)=> {this.onSizeTouchEnd  (e, stamp, index)}})
            .stamp__sizePoint.--br(
              onTouchStart =${(e)=> {this.onSizeTouchStart(e, stamp, index)}}
              onTouchMove  =${(e)=> {this.onSizeTouchMove (e, stamp, index)}}
              onTouchEnd   =${(e)=> {this.onSizeTouchEnd  (e, stamp, index)}})

            .stamp__rotateBar

            .stamp__rotatePoint(
              onTouchStart =${(e)=> {this.onRotateTouchStart(e, stamp, index)}}
              onTouchMove  =${(e)=> {this.onRotateTouchMove (e, stamp, index)}}
              onTouchEnd   =${(e)=> {this.onRotateTouchEnd  (e, stamp, index)}})
          
          
    `;
  }
}






