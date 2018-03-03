import React     from 'react';
import {render}  from 'react-dom';
import Topbar    from './Topbar.jsx';
import StampPool from './StampPool.jsx';
import TeePanel  from './TeePanel.jsx';
import ToolBox   from './ToolBox.jsx';
import {stampGroups} from '../models/Stamps.js';

import Vec2 from './lib/Vec2.js';
import Angle from './lib/Angle.js';
import superagent from 'superagent';


export default class ArtworkPage extends React.Component {
  constructor(props){
    super();
    this.state = {
      artwork:props.artwork,
      zoom:false,

      selectedStampIndex:-1,

      logs:["first log", "second log", "hoge"],
      upload:false //trueのときは、サーバーに保存する
    }

    this.teePanelClicked = ()=>{
      this.setState({
        selectedStampIndex:-1,
      });
    }

    this.zoomClicked = ()=>{
      console.log("zoom Clicked");
      this.setState({
        zoom: !this.state.zoom
      });
    };

    this.trashClicked = ()=>{
      console.log("trash Clicked");

      if(this.state.selectedStampIndex == -1){
        return ; //do nothing
      }

      this.state.artwork.stamps.splice(this.state.selectedStampIndex, 1);

      this.setState({
        artwork: this.state.artwork
      });
    };


    this.onStampClick = (e, stamp, index)=>{
      ////いらない・・・？
      this.log("clicked");
    };

    this.onStampDragEnter = (e, stamp, index)=>{
      this.log("start")
      
      const mainTouch =   e.touches[0];
      const pageX = mainTouch ? mainTouch.pageX : e.pageX;
      const pageY = mainTouch ? mainTouch.pageY : e.pageY;
      const dragStartPoint = new Vec2(pageX, pageY);


      this.setState({
        selectedStampIndex:index
      });

      this.dragInfo = {
        dragStartPoint
      };
    }

    this.onStampDrag = (e, stamp, index, artworkState)=>{
      const mainTouch =   e.touches[0];
      const pageX = mainTouch ? mainTouch.pageX : e.pageX;
      const pageY = mainTouch ? mainTouch.pageY : e.pageY;

      
      const scale_cm_disp = 1/artworkState.scale_disp_cm;

      if(!this.dragInfo){

        console.log("dragInfoがありません");
        return ;
      }
      if(this.state.selectedStampIndex == -1){
        return ;
      }

      if(!this.dragInfo.dragStartPoint){
        console.log("drag がスタートしていません");
        return ;
      }

      const draggingPoint = new Vec2( pageX, pageY)

      if(draggingPoint.getLength() == 0){
        console.log("なぜかpageXが0になる現象");
        return ;
      }
      
      const moveVec = draggingPoint.getSub(this.dragInfo.dragStartPoint);
      const actualMoveVec = moveVec.getMul(scale_cm_disp )

      const artwork = this.state.artwork;
      const selectedStamp = artwork.stamps[this.state.selectedStampIndex];

      const curPos = selectedStamp.transform.position;
      const newPos = new Vec2(curPos.x, curPos.y).add(actualMoveVec);

      selectedStamp.transform.position = newPos;
      this.dragInfo = {
        dragStartPoint:draggingPoint,
      };
      this.setState({
        artwork
      });

    }

    this.onStampDragEnd= (e, stamp, index)=>{
      console.log("drag end");

      this.setState({
        //とくになし
        upload:true
      });

      this.dragInfo =  {
        dragStartPoint:null,
      };
    }

  }

  log(str){
    
    this.state.logs.unshift(str);

    this.setState({
      logs: this.state.logs.slice(0,10)
    });

  }

  postArtwork(){
    superagent
      .post("/artworks/" + this.state.artwork._id)
      .send(this.state.artwork)
      .end((err,res)=>{
        if(err){
          return console.log("err");
        }
        console.log("saved");
      });
  }

  componentDidUpdate(){
    if(this.state.upload){
      this.postArtwork();
      this.setState({upload:false});
    }
  }

  handleStampSelected(stamp_image_path){
    const new_stamp = {
      image:stamp_image_path,
      transform:{
        position:{x:10,y:10},
        scale:{w:1,h:1},
        rotate:0
      }
    };
    this.state.artwork.stamps = [...this.state.artwork.stamps, new_stamp];
    this.setState({
      artwork: this.state.artwork,
      upload:true
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
                      input(type="hidden" name="artwork_id" value=${artwork._id})
                      button.moveButton.--next(type="submit") 
                        img(src="/images/button_done.png" alt="DONE")
        .pageLayout__content
          .pageLayout__main
          
                

            .pageLayout__artBoard(onClick=this.teePanelClicked)
              TeePanel(artwork=artwork zoom=this.state.zoom 
                selectedStampIndex=this.state.selectedStampIndex
                onClick=${(e,s,i,a)=>this.onStampClick(e,s,i,a)}
                onDragEnter=${(e,s,i,a)=>this.onStampDragEnter(e,s,i,a)}
                onDrag=${(e,s,i,a)=>this.onStampDrag(e,s,i,a)}
                onDragEnd=${(e,s,i,a)=>this.onStampDragEnd(e,s,i,a)})
            .pageLayout__toolBox
              ToolBox(
                zoomClicked =this.zoomClicked
                trashClicked=this.trashClicked)
          .pageLayout__stampPool
            StampPool(stampGroups=stampGroups
              onStampSelected=${(stamp)=>this.handleStampSelected(stamp)})
    `;

    /*
      .logs(style={position:"relative", zIndex:100, width:"200px"})
        each log,index in this.state.logs
          pre(key=${index}) ${log} 
    */
  }
}



