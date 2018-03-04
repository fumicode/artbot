import React from 'react';
import path  from 'path';

export default class LayerPanel extends React.Component {
  constructor(props){
    super();
  }
  render () {
    return pug`
      .layerPanel
        ul
          each stamp,index in this.props.artwork.stamps.slice().map((s,i)=>{s.index=i;return s}).reverse()
            li.layerPanel__layer(key=stamp.image 
              className=${this.props.selectedStampIndex == stamp.index ? '--selected': ''}
              onClick=${ (e)=>this.props.onStampSelected(e, stamp, stamp.index)})
              img.layerPanel__stamp(src=${path.join("/images/stamps/600/", stamp.image)})

          li.layerPanel__layer
            img.layerPanel__stamp(src="/images/tee.png")
    `;
  }
}








