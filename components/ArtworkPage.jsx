import React     from 'react';
import {render}  from 'react-dom';
import Topbar    from './Topbar.jsx';
import StampPool from './StampPool.jsx';
import TeePanel  from './TeePanel.jsx';
import ToolBox   from './ToolBox.jsx';
import {stampGroups} from '../models/Stamps.js';
import {StampPrototype} from '../models/Artwork.js';

import Vec2 from './lib/Vec2.js';
import Angle from './lib/Angle.js';
import superagent from 'superagent';


export default class ArtworkPage extends React.Component {
  constructor(props){
    super();
    this.state = {
      artwork:props.artwork,
      zoom:false,

      selectedStampIndex:-1
    }

    this.zoomClicked = ()=>{
      console.log("zoom Clicked");
      this.setState({
        zoom: !this.state.zoom
      });
    };

    this.onStampClick = (e, stamp, index)=>{
    };

    this.onStampDragEnter = (e, stamp, index)=>{
      const dragStartPoint = new Vec2(e.pageX, e.pageY);

      this.dragInfo = {
        selectedStampIndex: index,
        dragStartPoint
      };
    }

    this.onStampDrag = (e, stamp, index, artworkState)=>{
      
      const scale_cm_disp = 1/artworkState.scale_disp_cm;

      if(!this.dragInfo){

        console.log("dragInfoがありません");
        return ;
      }
      if(this.dragInfo.selectedStampIndex == -1){
        return ;
      }

      if(!this.dragInfo.dragStartPoint){
        console.log("drag がスタートしていません");
        return ;
      }

        


      const draggingPoint = new Vec2( e.pageX, e.pageY)

      if(draggingPoint.getLength() == 0){
        console.log("なぜかpageXが0になる現象");
        return ;
      }



      
      const moveVec = draggingPoint.getSub(this.dragInfo.dragStartPoint);
      const actualMoveVec = moveVec.getMul(scale_cm_disp )

      console.log(this.dragInfo.selectedStampIndex);
      const artwork = this.state.artwork;
      const selectedStamp = artwork.stamps[this.dragInfo.selectedStampIndex];


      const curPos = selectedStamp.transform.position;

      const newPos = new Vec2(curPos.x, curPos.y).add(actualMoveVec);

      selectedStamp.transform.position = newPos;
      
      this.dragInfo = Object.assign(this.dragInfo, {
        dragStartPoint:draggingPoint,
      });
    }

    this.onStampDragEnd= (e, stamp, index)=>{
      console.log("drag end");
      this.setState({

      });

      this.dragInfo = Object.assign(this.dragInfo, {
        dragStartPoint:null,
        selectedStampIndex: -1,
      });
    }

  }

  postArtwork(){
    superagent
      .post("/artworks/" + this.state.artwork.id)
      .send(this.state.artwork)
      .end((err,res)=>{
        if(err){
          return console.log("err");
        }
      });
  }

  componentDidUpdate(){
    //this.postArtwork();
  }

  handleStampSelected(stamp_image_path){
    const new_stamp = Object.assign({},StampPrototype,{
      image:stamp_image_path,
      transform:{
        position:{x:10,y:10}
      }
    });
    this.state.artwork.stamps = [...this.state.artwork.stamps, new_stamp];
    this.setState({
      artwork: this.state.artwork
    });
  }

  render () {
    const artwork = window.data.artwork;
    return pug`
      .pageLayout
        .pageLayout__topbar
          Topbar
            table.n.topButtons
              tbody
                tr
                  td.topButtons__cell
                    a.button.moveButton.--back(href="/") 
                      img(src="/images/button_back.png" alt="BACK")
                  td.topButtons__cell
                    form(method="POST" action="/orders" style={display:"inline-block"})
                      input(type="hidden" name="artwork_id" value=${artwork.id})
                      button.moveButton.--next(type="submit") 
                        img(src="/images/button_done.png" alt="DONE")
        .pageLayout__content
          .pageLayout__main
            .pageLayout__artBoard
              TeePanel(artwork=artwork zoom=this.state.zoom 
                onClick=${(e,s,i,a)=>this.onStampClick(e,s,i,a)}
                onDragEnter=${(e,s,i,a)=>this.onStampDragEnter(e,s,i,a)}
                onDrag=${(e,s,i,a)=>this.onStampDrag(e,s,i,a)}
                onDragEnd=${(e,s,i,a)=>this.onStampDragEnd(e,s,i,a)})
            .pageLayout__toolBox
              ToolBox(zoomClicked=this.zoomClicked)
          .pageLayout__stampPool
            StampPool(stampGroups=stampGroups
              onStampSelected=${(stamp)=>this.handleStampSelected(stamp)})
    `;
  }
}



