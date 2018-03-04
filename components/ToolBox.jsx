import React from 'react';

export default class TeePanel extends React.Component {
  constructor(props){
    super();
  }



  render () {
    return pug`
      .toolBox
        ul.toolBox__list
          li.toolBox__tool
            button.toolBox__button#tool_trash(onClick=this.props.trashClicked)
              img(src="/images/icon_trash.png")
          li.toolBox__tool
            button.toolBox__button#tool_layer_up(onClick=this.props.layerUpClicked)
              img(src="/images/icon_up.png")
          li.toolBox__tool
            button.toolBox__button#tool_layer_down(onClick=this.props.layerDownClicked)
              img(src="/images/icon_down.png")
          li.toolBox__margin
          li.toolBox__tool
            button.toolBox__button#tool_zoom(onClick=this.props.zoomClicked)
              img(src="/images/icon_zoom.png")
    `;
  }
}








