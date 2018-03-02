import React from 'react';
import path from 'path';
import Artwork from './Artwork.jsx';

export default class TeePanel extends React.Component {
  constructor(props){
    super();
  }

  render(){
    const bgImg = this.props.bgImg || "tee";
    const noBorder =  this.props.noBorder || false;

    const x =  this.props.x || 0;
    const y =  this.props.y || 0;
    const w =  this.props.w || 0;

    if(this.props.zoom){
      return pug`
        .teePanel
          .teePanel__teeImage(style={top:"-200px", left:"-200px", right:"-200px",bottom:"-200px",
            backgroundImage: "url(/images/"+bgImg+".png)"})
          div(style={position:"absolute", top:"0px", left:"35px"})
            Artwork(artwork=this.props.artwork 
              realWidth="30cm" realHeight="40cm" 
              displayWidth=460 noBorder=noBorder 

              onClick=${this.props.onClick}
              onDragEnter=${this.props.onDragEnter}
              onDrag=${this.props.onDrag}
              onDragEnd=${this.props.onDragEnd} )
      `;
    }
    else{
      return pug`
        .teePanel
          .teePanel__teeImage(style={backgroundImage:"url(/images/"+bgImg+".png)"})
          div(style={position:"absolute", top:(y || 140)+ "px", left:(x || 140)+"px"})
            Artwork(artwork=this.props.artwork 
              selectedStampIndex=this.props.selectedStampIndex
              realWidth="30cm" realHeight="40cm" 
              displayWidth=(w || 260) noBorder=noBorder 

              onClick=${this.props.onClick}
              onDragEnter=${this.props.onDragEnter}
              onDrag=${this.props.onDrag}
              onDragEnd=${this.props.onDragEnd} )
      `;
      
    }
  }
}






