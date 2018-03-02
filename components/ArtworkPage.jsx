import React     from 'react';
import {render}  from 'react-dom';
import Topbar    from './Topbar.jsx';
import StampPool from './StampPool.jsx';
import TeePanel  from './TeePanel.jsx';
import ToolBox   from './ToolBox.jsx';
import {stampGroups} from '../models/Stamps.js';
import {StampPrototype} from '../models/Artwork.js';

import superagent from 'superagent';


export default class ArtworkPage extends React.Component {
  constructor(props){
    super();
    this.state = {
      artwork:props.artwork,
      zoom:false
    }

    this.zoomClicked = ()=>{
      console.log("zoom Clicked");
      this.setState({
        zoom: !this.state.zoom
      });
    };
  }

  postArtwork(){
    console.log("this.state.artwork");
    console.log(this.state.artwork);
    superagent
      .post("/artworks/" + this.state.artwork.id)
      .send(this.state.artwork)
      .end((err,res)=>{
        console.log("err");
        console.log(err);

        console.log("res.body.received");
        console.log(res.body.received);

      });
        
  }

  componentDidUpdate(){
    this.postArtwork();
  }

  handleStampSelected(stamp_image_path){
    const new_stamp = Object.assign({},StampPrototype,{
      image:stamp_image_path
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
              TeePanel(artwork=artwork zoom=this.state.zoom)
            .pageLayout__toolBox
              ToolBox(zoomClicked=this.zoomClicked)
          .pageLayout__stampPool
            StampPool(stampGroups=stampGroups onStampSelected=${(stamp)=>this.handleStampSelected(stamp)})
    `;
  }
}



